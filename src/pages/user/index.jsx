import React from "react";
import MetaTags from "react-meta-tags";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
} from "reactstrap";
import BreadCrumb from "../../components/BreadCrumb";

import { Grid, _ } from "gridjs-react";
import { useEffect } from "react";
import {
  Get as FetchUser,
  Update as UpdateUser,
  Delete as DeleteUser,
  Create as CreateUser,
} from "../../services/user.service";
import { useState } from "react";
import ModalDelete from "./delete";
import ModalUpsert from "./upsert";

const UserPage = () => {
  const [tog_upsert, settog_upsert] = useState(false);
  const [tog_delete, settog_delete] = useState(false);

  const [dataEdit, setDataEdit] = useState({});
  const [dataDelete, setDataDelete] = useState({});

  const [users, setUsers] = useState([]);
  const [userDataGrid, setUserDataGrid] = useState([]);
  const columns = [
    "Id",
    "Tên",
    "Họ",
    "Email",
    "Giới Tính",
    "Điện thoại",
    "Quyền",
    "Trực tuyến",
    {
      name: "Điều khiển",
      width: "200px",
      formatter: (cell, row) => {
        return _(
          <div className="d-flex">
            <button
              className="btn btn-sm w-xs btn-primary edit-item-btn mx-2"
              data-bs-toggle="modal"
              data-bs-target="#showModal"
              onClick={() => onEdit(row.cells[0].data)}
            >
              Sửa
            </button>
            <button
              className="btn btn-sm w-xs btn-danger remove-item-btn"
              data-bs-toggle="modal"
              data-bs-target="#deleteRecordModal"
              onClick={() => onDelete(row.cells[0].data)}
            >
              Xóa
            </button>
          </div>
        );
      },
    },
  ];

  const onEdit = (id) => {
    const user = users.find((x) => x.id === id);
    setDataEdit(user);
    settog_upsert(!tog_upsert);
  };

  const onDelete = (id) => {
    const user = users.find((x) => x.id === id);
    setDataDelete(user);
    settog_delete(!tog_delete);
  };

  function ontog_upsert() {
    settog_upsert(!tog_upsert);
  }

  function ontog_upsert_delete() {
    setDataEdit({});
    settog_upsert(!tog_upsert);
  }

  function ontog_delete() {
    settog_delete(!tog_delete);
  }

  function getGroups(idGroups) {
    const permArray = JSON.parse(idGroups);
    const permMapping = {
      1: "Admin",
      2: "Staff",
      3: "User",
    };
    const permString = permArray.map((id) => permMapping[id]).join(", ");
    return permString;
  }

  function fetchUser() {
    FetchUser().then((res) => {
      const dataGrid = res.map((u, index) => {
        return [
          u.id,
          u.firstName || "Null",
          u.lastName || "Null",
          u.email,
          u.gender ? "Nam" : "Nữ",
          u.mobile || "Null",
          getGroups(u.groupIds),
          u.isOnline || "Null",
        ];
      });
      setUsers(res);
      setUserDataGrid(dataGrid);
    });
  }

  function handleOnUpsert(data, isUpdate) {
    if (isUpdate) {
      UpdateUser(data).then(() => {
        fetchUser();
      });
    } else {
      CreateUser(data).then(() => {
        fetchUser();
      });
      ontog_upsert();
    }
  }

  function handleOnDelete(id) {
    if (id) {
      DeleteUser({ id }).then((res) => {
        fetchUser();
      });
    }
    ontog_delete();
  }

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Social Diverse | Admin</title>
        </MetaTags>
        <Container fluid>
          <BreadCrumb title="Quản lý người dùng" pageTitle="" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Quản lý người dùng</h4>
                </CardHeader>

                <CardBody>
                  <Row className="g-4 mb-3">
                    <Col className="col-sm-auto">
                      <div>
                        <Button
                          color="success"
                          onClick={() => ontog_upsert_delete()}
                        >
                          <i className="ri-add-line align-bottom me-1"></i>Thêm
                          mới
                        </Button>
                      </div>
                    </Col>
                  </Row>
                  <div id="table-card" className="table-card">
                    <Grid
                      data={userDataGrid}
                      columns={columns}
                      sort={true}
                      search={true}
                      pagination={{ enabled: true, limit: 10 }}
                    />
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <ModalUpsert
            data={dataEdit}
            settog_upsert={ontog_upsert}
            is_show={tog_upsert}
            handleOnUpsert={handleOnUpsert}
            setDataEdit={setDataEdit}
          />
          <ModalDelete
            data={dataDelete}
            settog_delete={ontog_delete}
            is_show={tog_delete}
            handleOnDelete={handleOnDelete}
          />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UserPage;
