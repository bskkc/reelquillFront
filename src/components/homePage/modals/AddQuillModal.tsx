import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import uiActions from "../../../actions/uiActions";
import ButtonView from "../../common/ButtonView";
import TextFieldView from "../../common/TextFieldView";
import uiConstantsTR from "../../../constants/uiConstantsTR";
import { QuillController } from "../../../controllers/QuillController";
import { AddQuillRequest } from "../../../models/addQuillRequest";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AddQuillModal: React.FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: any) => state.ui.isAddQuillModalOpen);
  const userInfo = useSelector((state: any) => state.userInfo);
  const [addedQuill, setAddedQuill] = React.useState<string>("");

  useEffect(() => {
    setAddedQuill("")
  }, []);

  const handleClose = () => {
    dispatch(uiActions.addQuillModalStatusChanged(false));
  };

  const onChangeQuill = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddedQuill(e.target.value);
  }

  const handleAdd = () => {
    const userId = userInfo.data.id;
    const username = userInfo.data.username;
    const newQuillRequest: AddQuillRequest = {
      userId: userId,
      username: username,
      quill: addedQuill,
    };
    QuillController.addNewQuill(newQuillRequest, dispatch);
  }

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <TextFieldView
            fullWidth={true}
            label={uiConstantsTR.HOME_PAGE.QUILL_LABEL}
            value={addedQuill}
            onChange={(e) => onChangeQuill(e)}
          />
          <div className="add-quill-buttons">
            <ButtonView label="Vazgeç" onClickCallback={handleClose} />
            <ButtonView label="Ekle" onClickCallback={handleAdd} />
          </div>
        </Box>
      </Modal>
    </div>
  );
}

export default AddQuillModal;