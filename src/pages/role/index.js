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
import BreadCrumb from "../../components/common/BreadCrumb";
import DualListBox from "react-dual-listbox";
import ModalUpdate from "./update";
import { useEffect } from "react";
import { Get as FetchRole } from "../../services/role.service";
import { Get as FetchPerm } from "../../services/permission.service";

import "react-dual-listbox/lib/react-dual-listbox.css";
import { ROLE_DEFAULT } from "../../helpers/constants/global.variable";

const RolePage = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [permSelected, setPermSelected] = useState([""]);
  const [modal_create, setmodal_create] = useState(false);
  const [dataUpdate, setDataUpdate] = useState({});
  const [roles, setRoles] = useState([]);
  const [perms, setPerms] = useState([]);

  function tog_create() {
    setmodal_create(!modal_create);
  }
  
  function tog_update(id) {
    if (id) {
      const role = roles.find((x) => x.id === id);
      setDataUpdate(role);
    }
    setmodal_create(!modal_create);
  }

  function handleSelectRole(selectedRole) {
    const role = roles.find((x) => x.id === selectedRole.value);
    const perms = role.permissions.map((x) => x.id);
    setPermSelected(perms);
    setSelectedRole(selectedRole);
  }

  function fetchRole() {
    FetchRole().then((res) => {
      setRoles(res.result);
    });
  }
  function fetchPerm() {
    FetchPerm().then((res) => {
      setPerms(res.result);
    });
  }

  function onCreateRole(value) {
    // eslint-disable-next-line no-debugger
    debugger;
  }

  useEffect(() => {
    fetchRole();
    fetchPerm();
  }, []);

  useEffect(() => {
    setSelectedRole({ value: roles[0]?.id, label: roles[0]?.title });
    const perms = roles[0]?.permissions.map((x) => x.id);
    setPermSelected(perms);
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
                        <Button color="success" onClick={() => tog_create()}>
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
                                      onClick={() => tog_update(item.id)}
                                    >
                                      Sửa
                                    </button>
                                    <button className="btn btn-sm w-xs btn-danger">
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
              <Card>
                <CardHeader>
                  <h4 className="card-title mb-0">Phân quyền vai trò</h4>
                </CardHeader>
                <CardBody>
                  <Col lg={8}>
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
                          return { value: p.id, label: p.title };
                        })}
                        selected={permSelected}
                        onChange={(value) => setPermSelected(value)}
                      />
                    )}
                  </Col>
                  <br />
                  <Button color="success">Lưu lại </Button>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <ModalUpdate
            isShow={modal_create}
            tog_create={tog_create}
            handleOnCreate={onCreateRole}
            data={dataUpdate}
          />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default RolePage;
