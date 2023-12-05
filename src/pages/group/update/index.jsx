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

const ModalUpdate = ({ data, settog_update, is_show, handleOnUpdate }) => {
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: data.name,
      title: data.title,
      metaTitle: data.metaTitle,
      summary: data.summary,
      status: data.status,
      profile: data.profile,
      content: data.content,
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Trường này không được để trống !")
        .min(4, "Must be 4 characters or more"),
      title: Yup.string()
        .required("Trường này không được để trống !")
        .min(4, "Must be 4 characters or more"),
      metaTitle: Yup.string()
        .required("Trường này không được để trống !")
        .min(4, "Must be 4 characters or more"),
      summary: Yup.string()
        .required("Trường này không được để trống !")
        .min(4, "Must be 4 characters or more"),
      status: Yup.number().required("Trường này không được để trống !"),
      profile: Yup.string()
        .required("Trường này không được để trống !")
        .min(6, "Must be 6 characters or more"),
      content: Yup.string()
        .required("Trường này không được để trống !")
        .min(6, "Must be 6 characters or more"),
    }),
    onSubmit: (values) => {
      handleOnUpdate({
        id: data.id,
        name: values.name,
        title: values.title,
        metaTitle: values.metaTitle,
        summary: values.summary,
        status: values.status,
        profile: values.profile,
        content: values.content,
      });
    },
  });

  return (
    <Modal
      id="myModal"
      isOpen={is_show}
      toggle={() => {
        settog_update();
        validation.resetForm();
      }}
      size="lg"
    >
      <ModalHeader
        className="modal-title"
        id="myModalLabel"
        toggle={() => {
          settog_update();
          validation.resetForm();
        }}
      >
        Update thông tin nhóm
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
          <Row className="mt-4">
            <Col md={4}>
              <FormGroup floating>
                <Input
                  name="name"
                  placeholder="Group Name"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.name || ""}
                  invalid={
                    validation.touched.name && validation.errors.name
                      ? true
                      : false
                  }
                />
                <Label for="name">Tên nhóm</Label>
                {validation.touched.name && validation.errors.name ? (
                  <FormFeedback type="invalid">
                    {validation.errors.name}
                  </FormFeedback>
                ) : null}
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup floating>
                <Input
                  id="title"
                  name="title"
                  placeholder="title"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.title || ""}
                  invalid={
                    validation.touched.title && validation.errors.title
                      ? true
                      : false
                  }
                />
                <Label for="mobile">Tiêu đề</Label>
                {validation.touched.title && validation.errors.title ? (
                  <FormFeedback type="invalid">
                    {validation.errors.title}
                  </FormFeedback>
                ) : null}
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup floating>
                <Input
                  id="meta_title"
                  name="meta_title"
                  placeholder="Thẻ tiêu đề"
                  type="text"
                  onChange={validation.handleChange}
                  onBlur={validation.handleBlur}
                  value={validation.values.metaTitle || ""}
                  invalid={
                    validation.touched.metaTitle && validation.errors.metaTitle
                      ? true
                      : false
                  }
                />
                <Label for="mobile">Thẻ tiêu đề</Label>
                {validation.touched.metaTitle && validation.errors.metaTitle ? (
                  <FormFeedback type="invalid">
                    {validation.errors.metaTitle}
                  </FormFeedback>
                ) : null}
              </FormGroup>
            </Col>
          </Row>
          <FormGroup floating>
            <Input
              id="summary"
              name="summary"
              placeholder="summary"
              type="summary"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.summary || ""}
              invalid={
                validation.touched.summary && validation.errors.summary
                  ? true
                  : false
              }
            />
            <Label for="summary">Bản tóm gọn</Label>
            {validation.touched.summary && validation.errors.summary ? (
              <FormFeedback type="invalid">
                {validation.errors.summary}
              </FormFeedback>
            ) : null}
          </FormGroup>
          <FormGroup floating>
            <Input
              id="profile"
              name="profile"
              placeholder="profile"
              type="text"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.profile || ""}
              invalid={
                validation.touched.profile && validation.errors.profile
                  ? true
                  : false
              }
            />
            <Label for="bio">Hồ sơ</Label>
            {validation.touched.profile && validation.errors.profile ? (
              <FormFeedback type="invalid">
                {validation.errors.profile}
              </FormFeedback>
            ) : null}
          </FormGroup>
          <FormGroup floating>
            <Input
              id="content"
              name="content"
              placeholder="Content"
              type="text"
              onChange={validation.handleChange}
              onBlur={validation.handleBlur}
              value={validation.values.content || ""}
              invalid={
                validation.touched.content && validation.errors.content
                  ? true
                  : false
              }
            />
            <Label for="content">Nội dung</Label>
            {validation.touched.content && validation.errors.content ? (
              <FormFeedback type="invalid">
                {validation.errors.content}
              </FormFeedback>
            ) : null}
          </FormGroup>
          <Col sm={12} className="d-flex justify-content-center mb-4">
            <FormGroup check inline className="mt-2">
              <Input
                name="radio3"
                type="radio"
                value={validation.values.status}
                checked={validation.values.status === 2}
                onChange={() => validation.setFieldValue("status", 2)}
              />
              <Label check>Kích hoạt</Label>
            </FormGroup>
            <FormGroup check inline className="mt-2">
              <Input
                name="radio3"
                type="radio"
                value={validation.values.status}
                checked={validation.values.status === 1}
                onChange={() => validation.setFieldValue("status", 1)}
              />
              <Label check>Chưa kích hoạt</Label>
              {validation.touched.status && validation.errors.status ? (
                <FormFeedback type="invalid">
                  {validation.errors.status}
                </FormFeedback>
              ) : null}
            </FormGroup>
          </Col>
          <div className="d-flex justify-content-center">
            <Button
              color="light"
              className="mx-4 px-4 py-2"
              type="button"
              onClick={() => {
                settog_update();
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

export default ModalUpdate;
