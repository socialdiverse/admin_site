import React, { useEffect, useState } from "react";
import MetaTags from "react-meta-tags";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import BreadCrumb from "../../components/BreadCrumb";
import {
  Get as FetchGroup,
  Update as UpdateGroup,
  Delete as DeleteGroup,
} from "../../services/group.service";
import { Grid, _ } from "gridjs-react";
import ModalUpdate from "./update";
import ModalDelete from "./delete";

const GroupPage = () => {
  const [tog_update, settog_update] = useState(false);
  const [tog_delete, settog_delete] = useState(false);

  const [dataEdit, setDataEdit] = useState({});
  const [dataDelete, setDataDelete] = useState({});
  const [groups, setGroups] = useState([]);
  const [groupDataGrid, setGroupDataGrid] = useState([]);

  const onEdit = (id) => {
    const group = groups.find((x) => x.id === id);
    setDataEdit(group);
    settog_update(!tog_update);
  };

  const onDelete = (id) => {
    const group = groups.find((x) => x.id === id);
    setDataDelete(group);
    settog_delete(!tog_delete);
  };

  function ontog_update() {
    settog_update(!tog_update);
  }

  function ontog_update_delete() {
    setDataEdit({});
    settog_update(!tog_update);
  }

  function ontog_delete() {
    settog_delete(!tog_delete);
  }

  const columns = [
    "Id",
    "Tên",
    "Slug",
    "Thẻ tiêu đề",
    "Tiêu đề",
    "Trạng thái",
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

  function fetchGroup() {
    FetchGroup().then((res) => {
      const dataGrid = res.map((u, index) => {
        return [
          u.id,
          u.name || "Null",
          u.slug || "Null",
          u.metaTitle || "Null",
          u.title || "Null",
          u.status === 2 ? "Active" : "Inactive",
        ];
      });
      setGroups(res);
      setGroupDataGrid(dataGrid);
    });
  }
  function handleOnUpdate(data) {
    UpdateGroup(data).then(() => {
      fetchGroup();
    });
  }

  function handleOnDelete(id) {
    if (id) {
      DeleteGroup({ id }).then((res) => {
        fetchGroup();
      });
    }
    ontog_delete();
  }

  useEffect(() => {
    fetchGroup();
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Social Diverse | Admin</title>
        </MetaTags>
        <Container fluid>
          <BreadCrumb title="Quản lý nhóm" pageTitle="" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Quản lý nhóm</h4>
                </CardHeader>

                <CardBody>
                  <div id="table-card" className="table-card">
                    <Grid
                      data={groupDataGrid}
                      columns={columns}
                      sort={true}
                      search={true}
                      pagination={{ enabled: true, limit: 5 }}
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
            setDataEdit={setDataEdit}
          />
          <ModalDelete
            data={dataDelete}
            settog_delete={ontog_delete}
            is_show={tog_delete}
            handleOnDelete={handleOnDelete}
            setDataEdit={setDataEdit}
          />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default GroupPage;
