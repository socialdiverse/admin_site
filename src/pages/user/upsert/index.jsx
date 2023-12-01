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
  FormFeedback,
} from "reactstrap";
import "react-dual-listbox/lib/react-dual-listbox.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import ReactDatePicker from "../../../components/DatePicker";
import { FaCalendarAlt } from "react-icons/fa";
import { Get as FetchLocation } from "../../../services/location.service";

const ModalUpsert = ({ data, is_show, settog_upsert, handleOnCreate }) => {
  const [formData, setFormData] = useState(data);
  const [addressData, setAddressData] = useState();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState();

  const [provinceId, setProvinceId] = useState();
  const [districtId, setDistrictId] = useState();
  const [wardId, setWardId] = useState();

  const [selectedDate, setDate] = useState(new Date());

  const validation = useFormik({
    initialValues: {
      email: "",
      // firstName: "",
      // lastName: "",
      // mobile: "",
      // password: "",
      // groupIds: [],
      // gender: "",
      // relationships: "",
      // dob: new Date(),
      // confirmedPassword: "",
      // avatar: "",
      // background: "",
      // status: "",
      // provinceId: "",
      // districtId: "",
      // wardId: "",
    },
    validationSchema: Yup.object({
      // firstName: Yup.string()
      //   .required("Required")
      //   .min(4, "Must be 4 characters or more"),
      // lastName: Yup.string()
      //   .required("Required")
      //   .min(4, "Must be 4 characters or more"),
      email: Yup.string()
        .required("Required")
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Please enter a valid email address"
        ),
      // password: Yup.string()
      //   .required("Required")
      //   .matches(
      //     /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{7,19}$/,
      //     "Password must be 7-19 characters and contain at least one letter, one number and a special character"
      //   ),
      // confirmedPassword: Yup.string()
      //   .required("Required")
      //   .oneOf([Yup.ref("password"), null], "Password must match"),
      // mobile: Yup.string()
      //   .required("Required")
      //   .matches(
      //     /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
      //     "Must be a valid phone number"
      //   ),
    }),
    onSubmit: (values) => {
      console.log("aaaaaaaaaaaaaaa");
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
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit;
            return false;
          }}
        >
          {/* <Row>
            <Col md={6}>
              <Label for="avatar" className="mx-2">
                Avatar
              </Label>
              <div className="d-flex">
                <Input
                  id="avatar"
                  name="avatar"
                  placeholder="Avatar"
                  type="file"
                />
                <Button>Upload</Button>
              </div>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="bg_image" className="mx-2">
                  Background Image
                </Label>
                <div className="d-flex">
                  <Input
                    id="bg_image"
                    name="bg_image"
                    type="file"
                    className="mr-2"
                  />
                  <Button>Upload</Button>
                </div>
              </FormGroup>
            </Col>
          </Row> */}
          <Row>
            <Col md={6}>
              <FormGroup floating>
                <Input
                  id="email"
                  name="email"
                  placeholder="Email"
                  type="email"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.email || ""}
                  invalid={
                    validation.touched.email && validation.errors.email
                      ? true
                      : false
                  }
                />
                <Label for="email">Email</Label>
                {validation.touched.email && validation.errors.email ? (
                  <FormFeedback type="invalid">
                    {validation.errors.email}
                  </FormFeedback>
                ) : null}
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
          {/* <Row>
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
                <Input name="radio2" type="radio" /> <Label check>Nữ</Label>
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
                  <Input name="radio3" type="radio" />
                  <Label check>Active</Label>
                </FormGroup>
                <FormGroup check inline className="mt-2">
                  <Input name="radio3" type="radio" />
                  <Label check>Inactive</Label>
                </FormGroup>
              </Col>
            </Row>
          )} */}
          <div className="d-flex justify-content-center">
            <Button
              color="light"
              className="mx-4 px-4 py-2"
              type="button"
              onClick={() => settog_delete()}
            >
              Đóng
            </Button>
            <Button type="submit" color="primary" className="mx-4 px-4 py-2">
              Đồng ý
            </Button>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default ModalUpsert;
