import React, { useRef, useState } from "react";
import { IObject } from "../../common/interfaces";
import { useAppSelector } from "../../redux/store";
import { ContextMenu } from "../context-menu/ContextMenu";
import { ResizeableTd } from "../wrapper/ResizeableTd";
import { FolderObserveTableRow } from "./FolderObserveTableRow";
import { TableHeaderCell } from "./TableHeaderCell";

export const FolderObserve = () => {
  const objectsInDestFolder = useAppSelector(
    (state) => state.keyReducer.objectsInDestFolder
  );
  const mainFieldRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="observer-area" ref={mainFieldRef}>
        <table className="object-table" cellSpacing={0}>
          <thead>
            <tr>
              <TableHeaderCell ID={"NAME"} name="Наименование" />
              <ResizeableTd minWidth={0} className="resizer_td" />

              <TableHeaderCell ID={"ID"} name="Идентификатор" />
              <ResizeableTd minWidth={0} className="resizer_td" />

              <TableHeaderCell ID={"STAMP"} name="Дата изменения" />
              <ResizeableTd minWidth={0} className="resizer_td" />

              <TableHeaderCell ID={"CLS"} name="Тип объекта" />
            </tr>
          </thead>
          <tbody className="item-tables">
            {objectsInDestFolder.map((object: IObject) => {
              return <FolderObserveTableRow key={object.KEY} object={object} />;
            })}
          </tbody>
        </table>
      </div>
      <ContextMenu target={mainFieldRef.current as Node} />
    </>
  );
};
