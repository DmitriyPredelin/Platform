import React from "react";
import { Button } from "../../../reuseComponents/Button";

interface IEditObjectBtnPanelProps {
  onClickAdd: (value: any) => void;
  onClickRemove: (value: any) => void;
  onClickEdit: (value: any) => void;
}

export const EditObjectBtnPanel: React.FC<IEditObjectBtnPanelProps> = (
  props
) => {
  const { onClickAdd, onClickRemove, onClickEdit } = props;

  return (
    <div className="table-panel__btn-panel">
      <Button height={25} width={100} btnType="primary" onClick={onClickAdd}>
        <span className="material-icons-outlined">add</span>
        Добавить
      </Button>
      <Button height={25} width={100} btnType="danger" onClick={onClickRemove}>
        <span className="material-icons-outlined">remove</span>
        Удалить
      </Button>
      <Button height={25} btnType="undef" onClick={onClickEdit}>
        <span className="material-icons-outlined">edit</span>
        Редактировать...
      </Button>
    </div>
  );
};
