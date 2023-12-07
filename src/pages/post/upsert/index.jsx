import React from 'react'
import * as Yup from "yup";
import { useFormik } from 'formik';
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

import { PostFile } from '../../../services/file.service';

const ModalUpsert = ({ data, settog_upsert, is_show, handleOnUpsert }) => {

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      userId: data.userId,
      content: data.content,
      images: data.images,
    },
    validationSchema: Yup.object({
      userId: Yup.number().required("Trường này không được để trống !"),
      content: Yup.string().required("Trường này không được để trống !").min(3, "Must be 3 characters or more"),
      images: Yup.string()
    }),
    onSubmit: (values) => {
      console.log(data.id);

      handleOnUpsert({
        userId: values.userId,
        content: values.content,
        images: values.images
      },
        data.id ? true : false
      );
    }
  })

  return (
    <div>
      <Modal id="myModal"
        isOpen={is_show}
        toggle={() => {
          settog_upsert();
          validation.resetForm();
        }}
        size="lg">
        <ModalHeader className="modal-title"
          id="myModalLabel"
          toggle={() => {
            settog_upsert();
            validation.resetForm();
          }}>
          {data.id ? "Cập nhật bài viết" : "Thêm bài viết"}
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={e => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
            action="#"
          >
            <Row className="mt-4">
              <Col md={6}>
                <Label for="userId">ID người đăng</Label>
                <FormGroup floating>
                  <Input name="userId" type="number" placeholder="0" onChange={validation.handleChange} onBlur={validation.handleBlur} value={validation.values.userId || ""} invalid={
                    validation.touched.userId && validation.errors.userId ? true : false
                  }>

                    {validation.touched.userId && validation.errors.userId ? (
                      <FormFeedback type="invalid">
                        {validation.errors.userId}
                      </FormFeedback>
                    ) : null}
                  </Input>
                </FormGroup>
              </Col>
            </Row>

            <Label for="content">Nội dung bài viết</Label>
            <FormGroup floating>
              <textarea
                id="content"
                name="content"
                placeholder="Nội dung bài viết"
                type="text"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.content || ""}
                invalid={
                  validation.touched.content && validation.errors.content ? true : false
                }
              >
                {validation.touched.content && validation.errors.content ? (
                  <FormFeedback type="invalid">
                    {validation.errors.content}
                  </FormFeedback>
                ) : null}
              </textarea>
            </FormGroup>


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
    </div>
  )
}

export default ModalUpsert