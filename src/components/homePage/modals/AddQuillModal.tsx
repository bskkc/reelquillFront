import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalView from "../../common/ModalView";  // ModalView'ı import ettik
import uiActions from "../../../actions/uiActions";
import { QuillController } from "../../../controllers/QuillController";
import { AddQuillRequest } from "../../../models/addQuillRequest";
import uiConstantsTR from "../../../constants/uiConstantsTR";
import TextFieldView from "../../common/TextFieldView";

const AddQuillModal: React.FC = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: any) => state.ui.isAddQuillModalOpen);
  const userInfo = useSelector((state: any) => state.userInfo);
  const [addedQuill, setAddedQuill] = useState<string>("");

  useEffect(() => {
    setAddedQuill("");
  }, [isOpen]);

  const handleClose = () => {
    dispatch(uiActions.addQuillModalStatusChanged(false));
  };

  const onChangeQuill = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddedQuill(e.target.value);
  };

  const handleAdd = () => {
    const userId = userInfo.data.id;
    const username = userInfo.data.username;
    const newQuillRequest: AddQuillRequest = {
      userId,
      username,
      quill: addedQuill,
    };
    QuillController.addNewQuill(newQuillRequest, dispatch);
  };

  return (
    <ModalView
      isOpen={isOpen}
      handleClose={handleClose}
      title={uiConstantsTR.HOME_PAGE.QUILL_LABEL}
      firstBtnText={uiConstantsTR.HOME_PAGE.CANCEL_LABEL}
      secondBtnText={uiConstantsTR.HOME_PAGE.ADD_LABEL}
      handleApply={handleAdd}
      width="40%"
    >
      <TextFieldView
        fullWidth={true}
        label={uiConstantsTR.HOME_PAGE.QUILL_LABEL}
        value={addedQuill}
        onChange={onChangeQuill}
      />
    </ModalView>
  );
};

export default AddQuillModal;
