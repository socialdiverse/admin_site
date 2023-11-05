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
import BreadCrumb from "../../components/common/BreadCrumb";

import { Grid, _ } from "gridjs-react";
import { useEffect } from "react";
import {
  Get as FetchUser,
  Update as UpdateUser,
  Create as CreateUser,
} from "../../services/user.service";
import { useState } from "react";
import ModalUpdate from "./update";

const UserPage = () => {
  const [tog_update, settog_update] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  const [users, setUsers] = useState([]);
  const [userDataGrid, setUserDataGrid] = useState([]);
  const columns = [
    "Id",
    "Name",
    "Email",
    {
      name: "",
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
    settog_update(!tog_update);
  };

  const onDelete = (id) => {
    alert(id);
  };

  function ontog_update() {
    settog_update(!tog_update);
  }

  function fetchUser() {
    FetchUser().then((res) => {
      const dataGrid = res.map((u, index) => {
        return [index + 1, u.firstName + " " + u.lastName, u.email];
      });
      setUsers(res);
      setUserDataGrid(dataGrid);
    });
  }

  function handleOnUpdate(dataUpdate) {
    if (dataUpdate.id) {
      UpdateUser(dataUpdate).then((res) => {
        setUsers([...users, res]);
      });
    } else {
      CreateUser(dataUpdate).then((res) => {
        const newUsers = users.map((u) => {
          if (u.id === res.id) {
            return res;
          }
          return u;
        });
        setUsers(newUsers);
      });
    }
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
                        <Button color="success" onClick={() => ontog_update()}>
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
          <ModalUpdate
            data={dataEdit}
            settog_update={ontog_update}
            is_show={tog_update}
            handleOnUpdate={handleOnUpdate}
          />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UserPage;
