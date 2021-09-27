import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { WindowTypes } from "../../../common/enums";
import { hideWindow } from "../../../redux/keyReducer";
import { AppDispatch, useAppSelector } from "../../../redux/store";
import { Modal } from "../modal-window/Modal";
import { Button } from "../../reuseComponents/Button";
import { EditObjectPanel } from "./EditObjectPanel";

export const EditObjectWindow = () => {
  //выбранный объект
  const selectedObject = useAppSelector(
    (state) => state.keyReducer.selectedObject
  );
  const dispatch: AppDispatch = useDispatch();

  const [selectPage, setSelectPage] = useState(1);

  if (!selectedObject) {
    return null;
  }

  return (
    <Modal
      windowName={selectedObject.NAME}
      isModal={true}
      closeBtnHandler={() => dispatch(hideWindow(WindowTypes.EDIT))}
      height={800}
      width={1200}
    >
      <div className="edit-panel__main-panel">
        <div className="edit-panel">
          <EditObjectPanel
            selectItem={selectPage}
            setSelectItem={setSelectPage}
          />
        </div>
        <div className="edit-panel__main-btn-panel">
          <Button
            height={25}
            width={100}
            btnType={selectPage === 1 ? "disable" : "primary"}
            onClick={() => setSelectPage((prev) => prev - 1)}
          >
            <span className="material-icons-outlined">chevron_left</span>
            Назад
          </Button>
          <Button
            height={25}
            width={100}
            btnType={selectPage === 7 ? "disable" : "primary"}
            onClick={() => setSelectPage((prev) => prev + 1)}
          >
            Далее
            <span className="material-icons-outlined">chevron_right</span>
          </Button>
          <Button height={25} width={100} btnType="primary" onClick={() => {}}>
            <span className="material-icons-outlined">done</span>
            Готово
          </Button>

          <Button
            height={25}
            width={100}
            btnType="danger"
            onClick={() => dispatch(hideWindow(WindowTypes.EDIT))}
          >
            <span className="material-icons-outlined">clear</span>
            Отмена
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default EditObjectWindow;
