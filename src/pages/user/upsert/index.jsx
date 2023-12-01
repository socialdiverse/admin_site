import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  Label,
  Input,
  Row,
  Col,
  FormGroup,
} from "reactstrap";
import "react-dual-listbox/lib/react-dual-listbox.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import ReactDatePicker from "../../../components/DatePicker";
import { FaCalendarAlt } from "react-icons/fa";
import { Get as FetchLocation } from "../../../services/location.service";
import { constSelector } from "recoil";

const ModalUpsert = ({ data, is_show, settog_upsert, handleOnCreate }) => {
  const [addressData, setAddressData] = useState();

  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState();
  const [provinceId, setProvinceId] = useState();
  const [districtId, setDistrictId] = useState();
  const [wardId, setWardId] = useState();

  const [selectedDate, setDate] = useState(new Date());

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      title: data.title,
      description: data.description,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Trường này không được để trống !"),
    }),
    onSubmit: (values) => {
      handleOnCreate(values);
    },
  });

  const changeProvince = (event) => {
    setProvinceId(event.target.value);

    var newDistricts = addressData.address.districts.filter(
      (district) => district.provinceId == event.target.value
    );
    setDistricts(newDistricts);
  };

  const changeDistrict = (event) => {
    setDistrictId(event.target.value);
    setWards(
      addressData.address.wards.filter(
        (d) => d.districtId == event.target.value
      )
    );
  };

  const changeWard = (event) => {
    setWardId(event.target.value);
  };

  useEffect(() => {
    FetchLocation().then((res) => {
      setAddressData(res);
      setProvinces(res.address.provinces);
      setDistricts(res.address.districts);
      setWards(res.address.wards);
    });
  }, []);

  return (
    <Modal
      isOpen={is_show}
      toggle={() => {
        settog_upsert();
      }}
      size="lg"
    >
      <ModalHeader
        className="modal-title"
        id="myModalLabel"
        toggle={() => {
          settog_upsert();
        }}
      >
        {data.id ? "Sửa thông tin người dùng" : "Thêm người dùng"}
      </ModalHeader>
      <ModalBody>
        <Form>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="email" className="mx-2">
                  Avatar
                </Label>
                <div className="d-flex">
                  <Input
                    id="email"
                    name="email"
                    placeholder="Email"
                    type="file"
                  />
                  <Button>Upload</Button>
                </div>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="email" className="mx-2">
                  Background Image
                </Label>
                <div className="d-flex">
                  <Input
                    id="email"
                    name="email"
                    placeholder="Email"
                    type="file"
                    className="mr-2"
                  />
                  <Button>Upload</Button>
                </div>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup floating>
                <Input
                  id="email"
                  name="email"
                  placeholder="Email"
                  type="email"
                />
                <Label for="email">Email</Label>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup floating>
                <Input
                  id="mobile"
                  name="mobile"
                  placeholder="mobile"
                  type="mobile"
                />
                <Label for="mobile">Mobile</Label>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup floating>
                <Input
                  id="password"
                  name="password"
                  placeholder="Password"
                  type="password"
                />
                <Label for="password">Password</Label>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup floating>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  type="password"
                />
                <Label for="confirmPassword">Confirm Password</Label>
              </FormGroup>
            </Col>
          </Row>
          <FormGroup floating>
            <Input id="bio" name="bio" placeholder="Bio" type="text" />
            <Label for="bio">Bio</Label>
          </FormGroup>
          <Row>
            <Col md={6}>
              <div className="d-flex align-items-center">
                <ReactDatePicker
                  setStartDate={setDate}
                  startDate={selectedDate}
                />
                <div className="p-1">
                  <span className="input-group-text">
                    <FaCalendarAlt />
                  </span>
                </div>
              </div>
            </Col>
            <Col sm={4}>
              <FormGroup check inline className="mt-2">
                <Input name="radio2" type="radio" /> <Label check>Nam</Label>
              </FormGroup>
              <FormGroup check inline className="mt-2">
                <Input name="radio1" type="radio" /> <Label check>Nữ</Label>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup check className="mt-2 mr-2">
                <Input id="exampleCheckbox" name="checkbox" type="checkbox" />
                <Label check for="exampleCheckbox">
                  Độc thân
                </Label>
              </FormGroup>
            </Col>
          </Row>

          {addressData && (
            <Row className="mt-2">
              <Col md={3}>
                <Input className="mb-3" type="select" onChange={changeProvince}>
                  <option>Tỉnh, Thành phố</option>
                  {provinces &&
                    provinces.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.title}
                      </option>
                    ))}
                </Input>
              </Col>
              <Col md={3}>
                <Input className="mb-3" type="select" onChange={changeDistrict}>
                  <option>Quận, Huyện</option>
                  {districts &&
                    districts.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.title}
                      </option>
                    ))}
                </Input>
              </Col>
              <Col md={3}>
                <Input className="mb-3" type="select" onChange={changeWard}>
                  <option>Phường, Xã</option>

                  {wards &&
                    wards.map((w) => (
                      <option key={w.id} value={w.id}>
                        {w.title}
                      </option>
                    ))}
                </Input>
              </Col>
              <Col sm={3}>
                <FormGroup check inline className="mt-2">
                  <Input name="radio2" type="radio" />{" "}
                  <Label check>Active</Label>
                </FormGroup>
                <FormGroup check inline className="mt-2">
                  <Input name="radio2" type="radio" />{" "}
                  <Label check>Inactive</Label>
                </FormGroup>
              </Col>
            </Row>
          )}
        </Form>
        <div className="d-flex justify-content-center">
          <Button
            color="light"
            className="mx-4 px-4 py-2"
            type="button"
            onClick={() => settog_delete()}
          >
            Đóng
          </Button>
          <Button color="primary" className="mx-4 px-4 py-2" type="submit">
            Đồng ý
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ModalUpsert;
