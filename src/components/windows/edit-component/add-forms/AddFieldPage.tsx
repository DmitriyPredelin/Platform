import React, { useState } from "react";
import { TField } from "common/interfaces";
import { Modal } from "../../modal-window/Modal";
import { Button } from "../../../reuseComponents/Button";
import { RowInfo } from "../../../reuseComponents/RowInfo";

interface IAddFieldPageProps {
  setVisibleWindow: React.Dispatch<React.SetStateAction<boolean>>;
  setFieldList: React.Dispatch<React.SetStateAction<TField[]>>;
  fieldList: TField[];
  //editFieldId: string;
}

export const AddFieldPage: React.FC<IAddFieldPageProps> = ({
  setVisibleWindow,
  setFieldList,
  fieldList,
  //editFieldId,
}) => {
  //добавление нового параметра
  const addParam = () => {
    const newParam: TField = {
      id,
      name,
      type,
      nullable: nullable === "Допускается" ? true : false,
      length,
      decimalNum,
      defaultValue,
    };

    if (editField) {
      setFieldList(fieldList.splice(fieldList.indexOf(editField), 1, newParam));
    } else {
      setFieldList([...fieldList, newParam]);
    }

    setVisibleWindow(false);
  };

  //найдем в массиве полей редактируемое поле
  /*const editField: TField | undefined = fieldList.find((field: TField) => {
    return field.id === editFieldId;
  });
  let textNullable: string = "";

  if (editField) {
    textNullable = editField.nullable ? "Допускаются" : "Не допускаются";
  }*/
  const editField: any = undefined;
  const textNullable = "";

  const [name, setName] = useState<string>(editField ? editField.name : "");
  const [id, setId] = useState<string>(editField ? editField.id : "");
  const [type, setType] = useState<string>(
    editField ? editField.type : "Строка"
  );
  const [nullable, setNullable] = useState<string>(textNullable);
  const [length, setLength] = useState<number>(
    editField ? editField.length : 0
  );
  const [decimalNum, setDecimalNum] = useState<number>(
    editField ? editField.decimalNum : 0
  );

  const [defaultValue, setDefaultValue] = useState<string>(
    editField ? editField.defaultValue : ""
  );

  return (
    <Modal
      windowName="Свойства поля таблицы"
      isModal={false}
      closeBtnHandler={() => setVisibleWindow(false)}
      height={500}
      width={750}
    >
      {/* <div className="add-item__content">
          <div className="window__name-panel">
            <div style={{ paddingLeft: "12px" }}>Свойства поля таблицы</div>
            <button
              className="material-icons close_button"
              onClick={() => setVisibleWindow(false)}
            >
              close
            </button>
          </div> */}
      <br />
      <div className="add-item__main-content">
        <div className="edit-object__page">
          <RowInfo
            id={"inputName"}
            name={"Наименование"}
            type="text"
            width={"77%"}
            value={name}
            onChange={(e) => setName(e.target.value)}
          >
            <input />
          </RowInfo>
          <RowInfo
            id={"inputId"}
            name={"Идентификатор"}
            type="text"
            width={"77%"}
            value={id}
            onChange={(e) => setId(e.target.value)}
          >
            <input />
          </RowInfo>

          <div className="edit-object__param-panel">
            <RowInfo
              id={"selectType"}
              name={"Тип данных"}
              flexDirection="column"
              flex="2 1 auto"
              marginRight="30px"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <select>
                <option value="Строка">Строка</option>
                <option value="Целый">Целый</option>
                <option value="Вещественный">Вещественный</option>
                <option value="Дата">Дата</option>
                <option value="Текстовый">Текстовый</option>
              </select>
            </RowInfo>

            <RowInfo
              id={"selectLength"}
              name={"Общая длина"}
              flexDirection="column"
              flex="0 1 50%"
              marginRight="30px"
              type="number"
              value={length}
              onChange={(e) => setLength(e.target.value)}
            >
              <input />
            </RowInfo>
            <RowInfo
              id={"selectDecimal"}
              name={"Десятичных знаков"}
              flexDirection="column"
              flex="0 1 50%"
              type="number"
              value={decimalNum}
              onChange={(e) => setDecimalNum(e.target.value)}
            >
              <input />
            </RowInfo>
          </div>
          <div className="edit-object__param-panel">
            <RowInfo
              id={"selectNullable"}
              name={"Пустые значения"}
              flexDirection="column"
              flex="1 1 50%"
              marginRight="30px"
              value={nullable}
              onChange={(e) => setNullable(e.target.value)}
            >
              <select>
                <option value={"Допускаются"}>Допускаются</option>
                <option value={"Не допускаются"}>Не допускаются</option>
              </select>
            </RowInfo>
            <RowInfo
              id={"defaultValue"}
              name={"Значение по умолчанию"}
              flexDirection="column"
              flex="2 1 auto"
              value={defaultValue}
              onChange={(e) => setDefaultValue(e.target.value)}
            >
              <input />
            </RowInfo>
          </div>
        </div>
        <div className="additem__btn-panel">
          <Button
            height={25}
            width={100}
            btnType={id === "" || name === "" ? "disable" : "primary"}
            onClick={addParam}
          >
            <span className="material-icons-outlined">done</span>
            ОК
          </Button>
          <Button
            height={25}
            width={100}
            btnType="danger"
            onClick={() => setVisibleWindow(false)}
          >
            <span className="material-icons-outlined">clear</span>
            Отмена
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddFieldPage;
