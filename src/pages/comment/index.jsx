import React, { useState, useEffect } from "react";
import MetaTags from "react-meta-tags";
import { Card, CardBody, CardHeader, Col, Container, Row, Button } from "reactstrap";
import BreadCrumb from "../../components/BreadCrumb";

import { Grid, _ } from "gridjs-react";
import {
  Get as FetchComment,
  Update as UpdateComment,
  Delete as DeleteComment,
  Create as CreateComment
} from "../../services/comment.service"
import ModalUpsert from "./upsert";
import ModalDelete from "./delete";

const CommentPage = () => {
  const [tog_upsert, settog_upsert] = useState(false);
  const [tog_delete, settog_delete] = useState(false);

  const [postDataGrid, setPostDataGrid] = useState([]);

  const [dataEdit, setDataEdit] = useState({});
  const [dataDelete, setDataDelete] = useState({});

  const [posts, setPosts] = useState([]);
  const columns = [
    "ID",
    "ID người đăng",
    "Loại bình luận",
    "Nội dung",
    "Hình ảnh",
    "Ngày tạo",
    "Ngày cập nhật cuối",
    {
      name: "Điều khiển",
      width: "200px",
      formatter: (cell, row) => {
        return _(
          <div className="d-flex">
            <button className="btn btn-sm w-xs btn-primary edit-item-btn mx-2"
              data-bs-toggle="modal"
              data-bs-target="#showModal"
              onClick={() => onEdit(row.cells[0].data)}>
              Sửa
            </button>
            <button className="btn btn-sm w-xs btn-danger remove-item-btn"
              data-bs-toggle="modal"
              data-bs-target="#deleteRecordModal"
              onClick={() => onDelete(row.cells[0].data)}>
              Xóa
            </button>
          </div>
        )
      }
    }
  ]

  const onEdit = (id) => {
    const post = posts.find(p => p.id === id);
    setDataEdit(post);
    settog_upsert(!tog_upsert);
  }

  const onDelete = (id) => {
    const post = posts.find(p => p.id === id);
    setDataDelete(post);
    settog_delete(!tog_delete);
  }

  function ontog_upsert() {
    settog_upsert(!tog_upsert);
  }

  function ontog_delete() {
    settog_delete(!tog_delete);
  }

  function ontog_upsert_delete() {
    setDataEdit({});
    settog_upsert(!tog_upsert);
  }

  function fetchComment() {
    FetchComment().then(res => {
      const dataGrid = res.map((p, index) => {
        console.log(p)
        return [
          p.id,
          p.userId,
          p.type,
          p.content || "Null",
          p.images || "Null",
          p.createdAt || "Null",
          p.updatedAt || "Null",
        ]
      });
      setPosts(res);
      setPostDataGrid(dataGrid);
    })
  }

  function handleOnUpsert(data, isUpdate) {
    if (isUpdate) {
      UpdateComment(data, data.id).then(() => {
        fetchComment();
      });
      ontog_upsert();
    }
    else {
      CreateComment(data).then(() => {
        fetchComment();
      });
      ontog_upsert();
    }
  }

  function handleOnDelete(id) {
    if (id) {
      DeleteComment({ id }).then(() => {
        fetchComment();
      }).catch(err => {
        console.log(err)
      });
    }
    ontog_delete();
  }

  useEffect(() => {
    fetchComment();
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Social Diverse | Admin</title>
        </MetaTags>
        <Container fluid>
          <BreadCrumb title="Quản lý bình luận" pageTitle="" />
          <Row>
            <Col lg={12}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Quản lý bình luận</h4>
                </CardHeader>

                <CardBody>
                  <Row className="g-4 mb-3">
                    <Col className="col-sm-auto">
                      <div>
                        <Button color="success" onClick={() => ontog_upsert_delete()}>
                          <i className="ri-add-line align-bottom me-1"></i>Thêm
                          mới
                        </Button>
                      </div>
                    </Col>
                  </Row>

                  <div id="table-card" className="table-card">
                    <Grid
                      data={postDataGrid}
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

export default CommentPage;
