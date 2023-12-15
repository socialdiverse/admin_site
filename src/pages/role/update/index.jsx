import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import "react-dual-listbox/lib/react-dual-listbox.css";
import { useFormik } from "formik";
import * as Yup from "yup";

const ModalUpdate = ({ data, isShow, tog_create, handleOnCreate }) => {
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

  return (
    <Modal
      id="myModal"
      isOpen={isShow}
      toggle={() => {
        tog_create();
      }}
    >
      <ModalHeader
        className="modal-title"
        id="myModalLabel"
        toggle={() => {
          tog_create();
        }}
      >
        Thêm vai trò
      </ModalHeader>
      <ModalBody>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
          action="#"
        >
          <div className="mb-3">
            <Label htmlFor="title" className="form-label">
              Tên vai trò <span className="text-danger">*</span>
            </Label>
            <Input
              name="title"
              className="form-control"
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
            {validation.touched.title && validation.errors.title ? (
              <FormFeedback type="invalid">
                {validation.errors.title}
              </FormFeedback>
            ) : null}
          </div>

          <div className="mb-3">
            <Label className="form-label" htmlFor="description-textarea">
              Mô tả
            </Label>
            <div className="position-relative mb-3">
              <textarea
                name="description"
                onChange={validation.handleChange}
                value={validation.values.description || ""}
                type="text"
                id="description-textarea"
                className="form-control pe-5"
              ></textarea>
            </div>
          </div>
          <div>
            <Button color="light" type="button" onClick={() => tog_create()}>
              Đóng
            </Button>
            <Button color="primary" className="mx-2" type="submit">
              Lưu lại
            </Button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default ModalUpdate;
