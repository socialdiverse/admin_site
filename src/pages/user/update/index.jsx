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

const ModalUpdate = ({ data, is_show, settog_update, handleOnUpdate }) => {
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
      handleOnUpdate(values);
    },
  });

  return (
    <Modal
      id="myModal"
      isOpen={is_show}
      toggle={() => {
        settog_update();
      }}
    >
      <ModalHeader
        className="modal-title"
        id="myModalLabel"
        toggle={() => {
          settog_update();
        }}
      >
        Thêm vai trò
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
          <div className="mb-3">
            <Label htmlFor="title" className="form-label">
              Tên người dùng <span className="text-danger">*</span>
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
          <div className="">
            <Button color="light" type="button" onClick={() => settog_update()}>
              Đóng
            </Button>
            <Button color="primary" className="mx-2" type="submit">
              Lưu lại
            </Button>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default ModalUpdate;
