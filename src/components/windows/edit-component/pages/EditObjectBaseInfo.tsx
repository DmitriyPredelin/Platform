import React from "react";
import { useInput } from "hooks/useInput";
import { RowInfo } from "../../../reuseComponents/RowInfo";

export const EditObjectBaseInfo: React.FC = () => {
  const inputName = useInput("");
  const inputId = useInput("");

  return (
    <div className="edit-object__page">
      <b className="edit_object__text">Базовые свойства</b>
      <p className="edit_object__text">
        Укажите наименование и идентификатор объекта, а также примечание для
        него.
      </p>
      <p className="edit_object__text">
        Наименование объекта может быть любым и обычно указывает на его
        функциональность или содержание; Идентификатор объекта должен быть
        уникальным
      </p>

      <RowInfo
        id={"inputName"}
        name={"Наименование"}
        type="text"
        width={"85%"}
        onChange={inputName.onChange}
        value={inputName.value}
      >
        <input />
      </RowInfo>

      <RowInfo
        id={"inputId"}
        name={"Идентификатор"}
        type="text"
        width={"85%"}
        onChange={inputId.onChange}
        value={inputId.value}
      >
        <input />
      </RowInfo>

      <RowInfo
        id={"inputNote"}
        name={"Примечание"}
        flexDirection="column"
        
      >
        <textarea />
      </RowInfo>
    </div>
  );
};


export default EditObjectBaseInfo;