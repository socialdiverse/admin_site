import React, { useState } from "react";
import MetaTags from "react-meta-tags";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Table,
} from "reactstrap";
import Select from "react-select";
import BreadCrumb from "../../components/BreadCrumb";
import DualListBox from "react-dual-listbox";
import { useEffect } from "react";
import { Get as FetchPerm } from "../../services/permission.service";
import {
  Get as FetchRole,
  Update as UpdateRole,
  Delete as DeleteRole,
  Create as CreateRole,
  UpdateRolePerms,
} from "../../services/role.service";
import "react-dual-listbox/lib/react-dual-listbox.css";
import { ROLE_DEFAULT } from "../../helpers/constants/global.variable";
import ModalUpsert from "./upsert";
import ModalDelete from "./delete";

const RolePage = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [permSelected, setPermSelected] = useState([]);

  const [dataEdit, setDataEdit] = useState({});
  const [dataDelete, setDataDelete] = useState({});

  const [roles, setRoles] = useState([]);
  const [perms, setPerms] = useState([]);
  const [tog_upsert, settog_upsert] = useState(false);
  const [tog_delete, settog_delete] = useState(false);

  const onEdit = (id) => {
    const role = roles.find((x) => x.id === id);
    setDataEdit(role);
    settog_upsert(!tog_upsert);
  };

  const onDelete = (id) => {
    const role = roles.find((x) => x.id === id);
    setDataDelete(role);
    settog_delete(!tog_delete);
  };

  const ontog_upsert = () => {
    settog_upsert(!tog_upsert);
  };

  const ontog_upsert_open = () => {
    setDataEdit({});
    settog_upsert(!tog_upsert);
  };

  const ontog_delete = () => {
    settog_delete(!tog_delete);
  };

  const handleSelectRole = (selectedRole) => {
    const role = roles.find((x) => x.id === selectedRole.value);
    setSelectedRole({ value: role.id, label: role.title, perms: role.perms });
    setPermSelected(role.perms.map((p) => p.title));
  };

  const fetchRole = () => {
    FetchRole().then((res) => {
      setRoles(res);
    });
  };
  const fetchPerm = () => {
    FetchPerm().then((res) => {
      const perms = res.filter((p) => p.profileTypes !== "[]");
      setPerms(perms);
    });
  };

  const handleOnDelete = (id) => {
    if (id) {
      DeleteRole({ id }).then((res) => {
        fetchRole();
      });
    }
    ontog_delete();
  };

  const handleOnUpsert = (data, isUpdate) => {
    if (isUpdate) {
      UpdateRole(data).then(() => {
        fetchRole();
      });
    } else {
      CreateRole(data).then(() => {
        fetchRole();
      });
      ontog_upsert();
    }
  };

  const submitNewPerm = async () => {
    const ids = perms
      .filter((item) => permSelected.includes(item.title))
      .map((item) => item.id);
    try {
      await UpdateRolePerms({ roleId: selectedRole.value, permIds: ids });
    } catch (error) {}
  };

  useEffect(() => {
    fetchRole();
    fetchPerm();
  }, []);

  useEffect(() => {
    setSelectedRole({ value: roles[0]?.id, label: roles[0]?.title });
    const perms = roles[0]?.perms;
    if (roles.length > 1) {
      setPermSelected(perms.map((p) => p.title));
    }
  }, [roles]);

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Social Diverse | Admin</title>
        </MetaTags>
        <Container fluid>
          <BreadCrumb title="Quản lý phân quyền" pageTitle="" />
          <Row>
            <Col lg={10}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Quản lý phân quyền</h4>
                </CardHeader>
                <CardBody>
                  <Row className="g-4 mb-3">
                    <Col className="col-sm-auto">
                      <div>
                        <Button
                          color="success"
                          onClick={() => ontog_upsert_open()}
                        >
                          <i className="ri-add-line align-bottom me-1"></i>Thêm
                          mới
                        </Button>
                      </div>
                    </Col>
                  </Row>
                  <div className="table-responsive">
                    <Table className="table-hover align-middle table-nowrap mb-0">
                      <thead>
                        <tr>
                          <th scope="col">Stt</th>
                          <th scope="col">Vai trò</th>
                          <th scope="col">Mô tả</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {roles.map((item, i) => {
                          return (
                            <tr key={i}>
                              <td>{i + 1}</td>
                              <td>{item.title}</td>
                              <td>{item.description}</td>
                              <td>
                                {!ROLE_DEFAULT.includes(item.id) && (
                                  <div className="d-flex gap-2">
                                    <button
                                      className="btn btn-sm w-xs btn-primary"
                                      onClick={() => onEdit(item.id)}
                                    >
                                      Sửa
                                    </button>
                                    <button
                                      className="btn btn-sm w-xs btn-danger"
                                      onClick={() => onDelete(item.id)}
                                    >
                                      Xóa
                                    </button>
                                  </div>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg={10}>
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Phân quyền vai trò</h4>
                </CardHeader>
                <CardBody>
                  <Col className="col-sm-auto">
                    <Select
                      value={selectedRole}
                      onChange={(item) => {
                        handleSelectRole(item);
                      }}
                      options={roles.map((role) => {
                        return { value: role.id, label: role.title };
                      })}
                    />
                    <br />
                    {perms && (
                      <DualListBox
                        options={perms.map((p) => {
                          return { value: p.title, label: p.title };
                        })}
                        selected={permSelected}
                        onChange={(value) => {
                          setPermSelected(value);
                        }}
                      />
                    )}
                  </Col>
                  <br />
                  <Button onClick={submitNewPerm} color="success">
                    Lưu lại
                  </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <ModalUpsert
            data={dataEdit}
            ontog_upsert={ontog_upsert}
            is_show={tog_upsert}
            handleOnUpsert={handleOnUpsert}
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

export default RolePage;
