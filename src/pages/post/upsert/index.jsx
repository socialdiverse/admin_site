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
      images: data.images || ["string"]
    },
    validationSchema: Yup.object({
      userId: Yup.number().required("Trường này không được để trống !"),
      content: Yup.string().required("Trường này không được để trống !").min(3, "Must be 3 characters or more"),
      images: Yup.array().of(Yup.string())
    }),
    onSubmit: (values) => {
      handleOnUpsert({
        id: data.id,
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
              {data.id && <Col md={2}>
                <FormGroup floating>
                  <Input
                    name="postId"
                    type="number"
                    value={data.id || ""}
                    disabled />

                  <Label for="postId">ID</Label>
                </FormGroup>
              </Col>}
              <Col md={4}>
                <FormGroup floating>
                  <Input
                    name="userId"
                    type="number"
                    placeholder="0"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.userId || ""}
                    invalid={
                      validation.touched.userId && validation.errors.userId ? true : false
                    } />

                  <Label for="userId">ID người đăng</Label>
                  {validation.touched.userId && validation.errors.userId ? (
                    <FormFeedback type="invalid">
                      {validation.errors.userId}
                    </FormFeedback>
                  ) : null}
                </FormGroup>
              </Col>
            </Row>

            <FormGroup floating>
              <Input
                id="content"
                name="content"
                className="form-control"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.content || ""}
                invalid={
                  validation.touched.content && validation.errors.content ? true : false
                }
                placeholder="Nội dung bài viết"
              />

              <Label for="content">Nội dung bài viết</Label>
              {validation.touched.content && validation.errors.content ? (
                <FormFeedback type="invalid">
                  {validation.errors.content}
                </FormFeedback>
              ) : null}
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
