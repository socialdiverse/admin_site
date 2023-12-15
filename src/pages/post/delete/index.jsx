import { Button, Modal, ModalBody, ModalHeader, Form, Label } from "reactstrap";
import "react-dual-listbox/lib/react-dual-listbox.css";

const ModalDelete = ({ data, is_show, settog_delete, handleOnDelete }) => {
  function onSubmit() {
    handleOnDelete(data.id);
  }

  return (
    <Modal
      id="myModal"
      isOpen={is_show}
      toggle={() => {
        settog_delete();
      }}>
      <ModalHeader
        className="modal-title"
        id="myModalLabel"
        toggle={() => {
          settog_delete();
        }}>
        Xóa bài viết
      </ModalHeader>
      <ModalBody>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
            return false;
          }}
        >
          <div className="mb-3">
            <Label htmlFor="title" className="form-label">
              Bạn có chắc là xóa bài viết này không ?
            </Label>
          </div>

          <div>
            <Button color="light" type="button" onClick={() => settog_delete()}>
              Đóng
            </Button>
            <Button color="primary" className="mx-2" type="submit">
              Đồng ý
            </Button>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default ModalDelete