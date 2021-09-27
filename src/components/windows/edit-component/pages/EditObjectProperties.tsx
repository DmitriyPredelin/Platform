import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { INode } from "common/interfaces";
import { useInput } from "hooks/useInput";
import { fetchAllDBObject } from "redux/keyReducer";
import { AppDispatch, useAppSelector } from "redux/store";
import { RowInfo } from "../../../reuseComponents/RowInfo";
import { TreeCombo } from "../../../reuseComponents/TreeCombo";

export const EditObjectProperties = () => {
  const inputPhisicalName = useInput("");

  const dispatch: AppDispatch = useDispatch();

  //список всех объектов типа БД
  const treeData: Array<INode> = useAppSelector(
    (state) => state.keyReducer.allDBObject
  );

  useEffect(() => {
    //загружаем список всех элементов бокового дерева в стор
    dispatch(fetchAllDBObject());
  }, []);

  //console.log(treeData)

  return (
    <div className="edit-object__page">
      <b className="edit_object__text">Свойства таблицы</b>
      <p className="edit_object__text">
        Укажите базу данных, в которую будет помещена таблица, а также
        физическое имя таблицы
      </p>
      <br />
      <div style={{ width: "100%", boxSizing: "border-box" }}>
        <RowInfo
          id={"inputPhisicalName"}
          name={"Физическое имя"}
          type="text"
          width={"910px"}
          onChange={inputPhisicalName.onChange}
          value={inputPhisicalName.value}
          flexDirection="column"
        >
          <input />
        </RowInfo>

        <div className="row">
          <label htmlFor="inputDataBase">База данных:</label>
        </div>
        <TreeCombo
          fontSize={16}
          iconSize={25}
          treeData={treeData}
          selectOnlyLeaf
        />
      </div>
    </div>
  );
};

export default EditObjectProperties;