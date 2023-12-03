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
import { PostFile } from "../../../services/file.service";
const ModalUpsert = ({ data, settog_upsert, is_show, handleOnUpsert }) => {
  const [permOptions, setPermOptions] = useState(
    data.groupIds ? JSON.parse(data.groupIds) : []
  );
  const [addressData, setAddressData] = useState();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState();

  const [avatarFile, setAvatarFile] = useState();
  const [bgFile, setBgFile] = useState();

  const convertDobIntToDate = (dateOfBirth) => {
    if (dateOfBirth) {
      let dateString = dateOfBirth.toString();

      let day = dateString.substr(0, 2);
      let month = dateString.substr(2, 2);
      let year = dateString.substr(4, 4);

      let dateObject = new Date(`${year}-${month}-${day}`);
      return dateObject;
    }
  };

  const convertDobDateToInt = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formattedInteger = day * 1000000 + month * 10000 + year;

    return formattedInteger;
  };

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      email: data.email,
      mobile: data.mobile,
      firstName: data.firstName,
      lastName: data.lastName,
      password: "",
      bio: data.bio || "",
      confirmPassword: "",
      gender: data.gender || false,
      relationship: data.relationship || false,
      status: data.status || false,
      dob: convertDobIntToDate(data.dob),
      provinceId: data.provinceId,
      districtId: data.districtId,
      wardId: data.wardId,
      avatar: data.avatar,
      background: data.background,
      groupIds: permOptions,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Trường này không được để trống !")
        .matches(
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
          "Please enter a valid email address"
        ),
      mobile: Yup.string().required("Trường này không được để trống !"),
      firstName: Yup.string()
        .required("Trường này không được để trống !")
        .min(4, "Must be 4 characters or more"),
      lastName: Yup.string()
        .required("Trường này không được để trống !")
        .min(4, "Must be 4 characters or more"),
      bio: Yup.string()
        .required("Trường này không được để trống !")
        .min(10, "Must be 10 characters or more"),
      password: Yup.string()
        .required("Trường này không được để trống !")
        .min(6, "Must be 6 characters or more"),
      confirmPassword: Yup.string()
        .required("Trường này không được để trống !")
        .oneOf([Yup.ref("password"), null], "Password must match"),
      gender: Yup.boolean(),
      // relationship: Yup.boolean().required("Trường này không được để trống !"),
      // status: Yup.boolean().required("Trường này không được để trống !"),
      // dob: Yup.date().required("Trường này không được để trống !"),
      // provinceId: Yup.number().required("Vui lòng chọn tỉnh/thành phố"),
      // districtId: Yup.number().required("Vui lòng chọn quận/huyện"),
      // wardId: Yup.number().required("Vui lòng chọn phường/xã"),
      // avatar: Yup.string(),
      // background: Yup.string(),
      groupIds: Yup.array(),
    }),
    onSubmit: (values) => {
      console.log(data.id);

      handleOnUpsert(
        {
          email: values.email,
          mobile: values.mobile,
          firstName: values.firstName,
          lastName: values.lastName,
          password: values.password,
          bio: values.bio,
          gender: values.gender ? true : false,
          relationship: values.relationship,
          status: values.status,
          dob: convertDobDateToInt(values.dob),
          provinceId: values.provinceId,
          districtId: values.districtId,
          wardId: values.wardId,
          avatar: values.avatar,
          background: values.background,
          groupIds: `[${values.groupIds.join(" , ")}]`,
        },
        data.id ? true : false
      );
    },
  });

  const uploadImage = (isAvatar) => {
    if (isAvatar) {
      PostFile(avatarFile).then((res) => {
        validation.setFieldValue("avatar", res);
      });
    } else {
      PostFile(bgFile).then((res) => {
        validation.setFieldValue("background", res);
      });
    }
  };

  const handleAvatarChange = (e) => {
    setAvatarFile(e.target.files[0]);
  };

  const handleBgChange = (e) => {
    setBgFile(e.target.files[0]);
  };

  const changeProvince = (event) => {
    validation.setFieldValue("provinceId", parseInt(event.target.value));

    setDistricts(
      addressData.address.districts.filter(
        (district) => district.provinceId == event.target.value
      )
    );
  };

  const changeDistrict = (event) => {
    validation.setFieldValue("districtId", parseInt(event.target.value));
    setWards(
      addressData.address.wards.filter(
        (d) => d.districtId == event.target.value
      )
    );
  };

  const changeWard = (event) => {
    validation.setFieldValue("wardId", parseInt(event.target.value));
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
      id="myModal"
      isOpen={is_show}
      toggle={() => {
        settog_upsert();
        validation.resetForm();
      }}
      size="lg"
    >
      <ModalHeader
        className="modal-title"
        id="myModalLabel"
        toggle={() => {
          settog_upsert();
          validation.resetForm();
        }}
      >
        {data.id ? "Update thông tin người dùng" : "Thêm người dùng"}
      </ModalHeader>
      <ModalBody>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
          action="#"
        >
          <Row>
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
                  onChange={handleAvatarChange}
                />
                <Button onClick={() => uploadImage(true)}>Upload</Button>
              </div>
              {validation.values.avatar && (
                <Label for="avatar1" className="mx-2 d-block">
                  {validation.values.avatar.length > 40
                    ? `${validation.values.avatar.slice(0, 40)}...`
                    : validation.values.avatar}
                </Label>
              )}
            </Col>
            <Col md={6}>
              <Label for="background" className="mx-2">
                Background
              </Label>
              <div className="d-flex">
                <Input
                  id="background"
                  name="background"
                  placeholder="Background"
                  type="file"
                  onChange={handleBgChange}
                />
                <Button onClick={() => uploadImage(false)}>Upload</Button>
              </div>
              {validation.values.background && (
                <Label for="bg1" className="mx-2">
                  {validation.values.background.length > 40
                    ? `${validation.values.background.slice(0, 40)}...`
                    : validation.values.background}
                </Label>
              )}
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={6}>
              <FormGroup floating>
                <Input
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
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.mobile || ""}
                  invalid={
                    validation.touched.mobile && validation.errors.mobile
                      ? true
                      : false
                  }
                />
                <Label for="mobile">Mobile</Label>
                {validation.touched.mobile && validation.errors.mobile ? (
                  <FormFeedback type="invalid">
                    {validation.errors.mobile}
                  </FormFeedback>
                ) : null}
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup floating>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="firstName"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.firstName || ""}
                  invalid={
                    validation.touched.firstName && validation.errors.firstName
                      ? true
                      : false
                  }
                />
                <Label for="email">First Name</Label>
                {validation.touched.firstName && validation.errors.firstName ? (
                  <FormFeedback type="invalid">
                    {validation.errors.firstName}
                  </FormFeedback>
                ) : null}
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup floating>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="lastName"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.lastName || ""}
                  invalid={
                    validation.touched.lastName && validation.errors.lastName
                      ? true
                      : false
                  }
                />
                <Label for="lastName">Last Name</Label>
                {validation.touched.lastName && validation.errors.lastName ? (
                  <FormFeedback type="invalid">
                    {validation.errors.lastName}
                  </FormFeedback>
                ) : null}
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
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.password || ""}
                  invalid={
                    validation.touched.password && validation.errors.password
                      ? true
                      : false
                  }
                />
                <Label for="password">Password</Label>
                {validation.touched.password && validation.errors.password ? (
                  <FormFeedback type="invalid">
                    {validation.errors.password}
                  </FormFeedback>
                ) : null}
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup floating>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  type="password"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.confirmPassword || ""}
                  invalid={
                    validation.touched.confirmPassword &&
                    validation.errors.confirmPassword
                      ? true
                      : false
                  }
                />
                <Label for="confirmPassword">Confirm Password</Label>
                {validation.touched.confirmPassword &&
                validation.errors.confirmPassword ? (
                  <FormFeedback type="invalid">
                    {validation.errors.confirmPassword}
                  </FormFeedback>
                ) : null}
              </FormGroup>
            </Col>
          </Row>
          <FormGroup floating>
            <Input
              id="bio"
              name="bio"
              placeholder="Bio"
              type="text"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.bio || ""}
              invalid={
                validation.touched.bio && validation.errors.bio ? true : false
              }
            />
            <Label for="bio">Bio</Label>
            {validation.touched.bio && validation.errors.bio ? (
              <FormFeedback type="invalid">
                {validation.errors.bio}
              </FormFeedback>
            ) : null}
          </FormGroup>
          <Row>
            <Col md={6}>
              <div id="dob" className="d-flex align-items-center">
                <ReactDatePicker formik={validation} />
                <div className="p-1">
                  <label className="input-group-text">
                    <FaCalendarAlt />
                  </label>
                </div>
                {validation.touched.dob && validation.errors.dob ? (
                  <FormFeedback type="invalid">
                    {validation.errors.dob}
                  </FormFeedback>
                ) : null}
              </div>
            </Col>
            <Col sm={3}>
              <FormGroup check inline className="mt-2">
                <Input
                  name="radio2"
                  type="radio"
                  value={validation.values.gender}
                  checked={validation.values.gender === true}
                  onChange={() => validation.setFieldValue("gender", true)}
                />
                <Label check>Nam</Label>
              </FormGroup>
              <FormGroup check inline className="mt-2">
                <Input
                  name="radio2"
                  type="radio"
                  value={validation.values.gender}
                  checked={validation.values.gender === false}
                  onChange={() => validation.setFieldValue("gender", false)}
                />
                <Label check>Nữ</Label>
                {validation.touched.gender && validation.errors.gender ? (
                  <FormFeedback type="invalid">
                    {validation.errors.gender}
                  </FormFeedback>
                ) : null}
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup check className="mt-2 mr-2">
                <Input
                  id="relationship"
                  name="relationship"
                  type="checkbox"
                  checked={validation.values.relationship}
                  onChange={validation.handleChange}
                />
                <Label check for="relationship">
                  Trong mối quan hệ
                </Label>
              </FormGroup>
            </Col>
          </Row>
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
                <Input
                  name="radio3"
                  type="radio"
                  value={validation.values.status}
                  checked={validation.values.status === 1}
                  onChange={() => validation.setFieldValue("status", 1)}
                />
                <Label check>Active</Label>
              </FormGroup>
              <FormGroup check inline className="mt-2">
                <Input
                  name="radio3"
                  type="radio"
                  value={validation.values.status}
                  checked={validation.values.status === 0}
                  onChange={() => validation.setFieldValue("status", 0)}
                />
                <Label check>Inactive</Label>
              </FormGroup>
            </Col>
          </Row>
          <Row className="mt-2 ">
            <Col sm={12} className="d-flex justify-content-center mb-4">
              <FormGroup check inline className="mt-2">
                <Input
                  name="groupIds"
                  type="checkbox"
                  onChange={validation.handleChange}
                  value={1}
                />
                <Label check>Admin</Label>
              </FormGroup>
              <FormGroup check inline className="mt-2">
                <Input
                  name="groupIds"
                  type="checkbox"
                  onChange={validation.handleChange}
                  value={2}
                />
                <Label check>Staff</Label>
              </FormGroup>
              <FormGroup check inline className="mt-2">
                <Input
                  name="groupIds"
                  type="checkbox"
                  onChange={validation.handleChange}
                  value={3}
                />
                <Label check>User</Label>
              </FormGroup>
            </Col>
          </Row>

          <div className="d-flex justify-content-center">
            <Button
              color="light"
              className="mx-4 px-4 py-2"
              type="button"
              onClick={() => {
                settog_upsert();
                validation.resetForm();
              }}
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
