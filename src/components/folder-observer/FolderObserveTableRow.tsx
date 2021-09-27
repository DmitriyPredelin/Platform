import React, { useMemo, useRef } from "react";
import { useDispatch } from "react-redux";
import { getObjectTypeName } from "../../common/functions";
import { IObject } from "../../common/interfaces";
import {
  selectFolderAndFetchChild,
  setHoveredObject,
  setSelectedObject
} from "../../redux/keyReducer";
import { setDisableButton } from "../../redux/menuReducer";
import { AppDispatch, useAppSelector } from "../../redux/store";

interface IFolderObserveTableRowProps {
  object: IObject;
}

export const FolderObserveTableRow: React.FC<IFolderObserveTableRowProps> = ({
  object
}) => {
  const dispatch: AppDispatch = useDispatch();
  const selectedObject: IObject = useAppSelector(
    (state) => state.keyReducer.selectedObject
  );
  const changeObject: IObject = useAppSelector(
    (state) => state.keyReducer.changeObject
  );

  const dblClickHandler = (object: IObject) => {
    //если этот объект является контейнером для других объектов
    if (object.IS_CONTAINERABLE) {
      dispatch(selectFolderAndFetchChild(object.KEY));
    }
  };

  const clickHandler = useMemo(
    () => (object: IObject) => {
      if (object.CLS === 0) {
        dispatch(setDisableButton({ pid: 10, disable: true }));
      } else {
        dispatch(setDisableButton({ pid: 10, disable: false }));
      }
      dispatch(setSelectedObject(object));
      //setClickedObjectKey(object);
    },
    []
  );

  const hoverHandler = (object: IObject) => {
    dispatch(setHoveredObject(object));
  }

  const changeNameHandler = () => {};

  const saveNewNameHandler = () => {};

  const ref = useRef<HTMLTableRowElement>(null);

  return (
    <>
      <tr
        className={`table-row ${
          selectedObject.KEY === object.KEY ? "selected" : ""
        }`}
        onDoubleClick={() => dblClickHandler(object)}
        onMouseEnter={() => hoverHandler(object)}
        onClick={() => clickHandler(object)}
        ref={ref}
      >
        <td
          className="table-cell"
          id={object.KEY + "_" + object.CLS.toString()}
        >
          {changeObject.KEY === object.KEY ? (
            <input
              type="text"
              className="edit-input"
              value={object.NAME}
              onChange={changeNameHandler}
              onBlur={saveNewNameHandler}
            />
          ) : (
            object.NAME
          )}
        </td>
        <td className="table-cell__empty" />
        <td className="table-cell" id={"ID_" + object.CLS.toString()}>
          {object.ID}
        </td>
        <td className="table-cell__empty" />
        <td className="table-cell" id={"STAMP_" + object.CLS.toString()}>
          {object.STAMP}
        </td>
        <td className="table-cell__empty" />
        <td className="table-cell" id={"CLS_" + object.CLS.toString()}>
          {getObjectTypeName(object.CLS)}
        </td>
        {/* <td className="table-cell__empty" />
        <td className="table-cell" id={"DES_" + object.CLS.toString()}>{object.DES}</td> */}
      </tr>
    </>
  );
};
