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
import { Create } from "../../../services/user.service";

const ModalUpsert = ({ data, is_show, settog_upsert, handleOnCreate }) => {
  const [addressData, setAddressData] = useState();
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState();

  const [avatarFile, setAvatarFile] = useState();
  const [bgFile, setBgFile] = useState();

  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [groupIds, setGroupIds] = useState("");
  const [mobile, setMobile] = useState("");
  const [gender, setGender] = useState(false); //
  const [relationship, setRelationship] = useState(false);
  const [bio, setBio] = useState("");
  const [status, setStatus] = useState(false);

  const [bgLink, setBgLink] = useState();
  const [avatarLink, setAvatarLink] = useState();
  const [provinceId, setProvinceId] = useState();
  const [districtId, setDistrictId] = useState();
  const [wardId, setWardId] = useState();
  const [selectedDate, setDate] = useState(new Date());

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

  const uploadImage = (isAvatar) => {
    if (isAvatar) {
      PostFile(avatarFile).then((res) => {
        setAvatarLink(res);
      });
    }
    PostFile(bgFile).then((res) => {
      setBgLink(res);
    });
  };

  const handleAvatarChange = (e) => {
    setAvatarFile(e.target.files[0]);
  };

  const handleBgChange = (e) => {
    setBgFile(e.target.files[0]);
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
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            submitData();
            return false;
          }}
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
              {avatarLink && (
                <Label for="avatar1" className="mx-2 d-block">
                  {avatarLink.length > 40
                    ? `${avatarLink.slice(0, 40)}...`
                    : avatarLink}
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
                <Button onClick={uploadImage}>Upload</Button>
              </div>
              {bgLink && (
                <Label for="bg1" className="mx-2">
                  {bgLink.length > 40 ? `${bgLink.slice(0, 40)}...` : bgLink}
                </Label>
              )}
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={6}>
              <FormGroup floating>
                <Input
                  id="email"
                  name="email"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
                <Label for="mobile">Mobile</Label>
              </FormGroup>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={6}>
              <FormGroup floating>
                <Input
                  id="firstName"
                  name="firstName"
                  placeholder="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <Label for="email">First Name</Label>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup floating>
                <Input
                  id="lastName"
                  name="lastName"
                  placeholder="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <Label for="lastName">Last Name</Label>
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
            <Input
              id="bio"
              name="bio"
              placeholder="Bio"
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
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
                <Input
                  name="radio2"
                  type="radio"
                  checked={gender === true}
                  onChange={() => setGender(true)}
                />
                <Label check>Nam</Label>
              </FormGroup>
              <FormGroup check inline className="mt-2">
                <Input
                  name="radio2"
                  type="radio"
                  checked={gender === false}
                  onChange={() => setGender(false)}
                />
                <Label check>Nữ</Label>
              </FormGroup>
            </Col>
            <Col md={2}>
              <FormGroup check className="mt-2 mr-2">
                <Input id="exampleCheckbox" name="checkbox" type="checkbox" />
                <Label
                  check
                  for="exampleCheckbox"
                  checked={relationship === false}
                  onChange={() => setRelationship(!relationship)}
                >
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
                  <Input
                    name="radio3"
                    type="radio"
                    checked={status === true}
                    onChange={() => setStatus(true)}
                  />
                  <Label check>Active</Label>
                </FormGroup>
                <FormGroup check inline className="mt-2">
                  <Input
                    name="radio3"
                    type="radio"
                    checked={status === false}
                    onChange={() => setStatus(false)}
                  />
                  <Label check>Inactive</Label>
                </FormGroup>
              </Col>
            </Row>
          )}
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
