import React from "react";
import { useDispatch } from "react-redux";
import { INode } from "../../common/interfaces";
import { selectFolderAndFetchChild } from "../../redux/keyReducer";
import { AppDispatch, useAppSelector } from "../../redux/store";
import { FolderObserve } from "../folder-observer/FolderObserve";
import { ResizeableDiv } from "../wrapper/ResizeableDiv";
import { ModalWindowsRouter } from "./ModalWindowsRouter";
import { Tree } from "./Tree";

interface IMainFieldProps {}

export const MainField: React.FC<IMainFieldProps> = () => {
  const selectedFolderInSideTree: number = useAppSelector(
    (state) => state.keyReducer.selectedFolderInSideTree
  );
  const treeData: Array<INode> = useAppSelector(
    (state) => state.keyReducer.sideTree
  );

  const dispatch: AppDispatch = useDispatch();

  const clickHandler = (key: number) => {
    dispatch(selectFolderAndFetchChild(key));
  };

  return (
    <div className="main-field">
      <div className="sidebar">
        <Tree
          treeData={treeData}
          clickHandler={clickHandler}
          selectedItem={selectedFolderInSideTree}
        />
      </div>
      <ResizeableDiv minWidth={200} className={"resizer"} />
      <FolderObserve />
      <ModalWindowsRouter />
    </div>
  );
};
