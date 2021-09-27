import React, { useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { remapObjectToArray } from "../../common/functions";
import { INode } from "../../common/interfaces";
import { useInput } from "../../hooks/useInput";
import { Tree } from "../object-tree/Tree";

interface ITreeComboProps {
  width?: string;
  borderStyle?: string;
  borderWidth?: string;
  fontSize?: number;
  iconSize?: number;
  dropAction?: any;
  treeData?: any;
  selectOnlyLeaf?: boolean;
}

const TreeComboWrapper = styled("div")<ITreeComboProps>`
  display: flex;
  flex-direction: row;
  width: ${(props) => props.width || "100%"};
  border-width: ${(props) => props.borderWidth || "1px"};
  border-style: ${(props) => props.borderStyle || "solid"};
  border-color : rgb(118, 118, 118);
  align-items: center;
  box-sizing : border-box;
  padding: 0;

  .btn {
    align-self: stretch;
    border: none;
    background-color: white;
    display: flex;
    padding: 0;
    &:hover {
      background-color: lightblue;
    }
  }
  .span {
    padding: 0;
    font-size: ${(props) => {
      if (props.iconSize) {
        return props.iconSize + "px";
      } else {
        return "20px";
      }
    }};
    align-self: center;
  }

  .check-data {
    width: 100%;
    align-self: stretch;
    outline: none;
    padding: 0;
    font-size: ${(props) => {
      if (props.fontSize) {
        return props.fontSize + "px";
      } else {
        return "20px";
      }
    }};
    border: none;
    &:focus {
      border: 2px solid rgb(0, 162, 255);
      box-shadow: 0 0 2px 0 rgb(0, 162, 255);
      border-radius: 2px;
    }
  }
`;

const DropOverlayWrapper = styled("div")`
  border: 1px solid black;
  display: flex;
  overflow-x: hidden;
  min-height: 300px;
  max-height: 300px;
  z-index: 2;
  padding: 0px 10px;
  padding: 0;
`;

export const TreeCombo: React.FC<ITreeComboProps> = (props) => {
  //признак видимости выпадающего списка
  const [visibleList, setVisibleList] = useState(false);

  //ключ выбранного элемента
  const [selectedItem, setSelectedItem] = useState<number>(0);

  //активация режима поиска
  const [searchMode, setSearchMode] = useState<boolean>(false);

  //инпут для БД
  const inputBD = useInput("");

  const refInputData = useRef<HTMLInputElement>(null);
  const refDiv = useRef<HTMLDivElement>(null);
  const refBtn = useRef<HTMLButtonElement>(null);

  //получим линейный список элементов из дерева объектов
  const remapObjectArray: Array<INode> = useMemo(() => {
    let destArray: Array<INode> = [];
    remapObjectToArray(destArray, props.treeData);
    return destArray;
  }, [props.treeData]);

  const showTreeComboUp = () => {
    refInputData.current?.focus();
    setVisibleList((prev) => !prev);
  };

  const toggleVisibilityTreeCombo = () => {
    setVisibleList((prev) => !prev);
  };

  const hideDropDownOverlay = () => {
    setVisibleList(false);
  };

  const clickSearchHandler = () => {
    refInputData.current?.focus();
    setSearchMode(true);
    setVisibleList(true);
  };

  const selectedHandler = (key: number) => {
    

    const selectedObject: INode | undefined = remapObjectArray.find(
      (node: INode) => node.KEY === key
    );
    if (props.selectOnlyLeaf) {
      if (selectedObject?.IS_LEAF) {
        setSelectedItem(key);
        inputBD.setValue(selectedObject?.NAME);
      }
    } else {
      inputBD.setValue(selectedObject?.NAME);
    }
  };

  return (
    <>
      <TreeComboWrapper {...props}>
        <button className="btn" onClick={() => inputBD.setValue("")}>
          <span className="material-icons span" style={{ color: "red" }}>
            clear
          </span>
        </button>
        {searchMode ? (
          <input
            ref={refInputData}
            className="check-data"
            type="text"
            onChange={inputBD.onChange}
            value={inputBD.value}
            /*onBlur={hideDropDownOverlay}*/
          />
        ) : (
          <input
            ref={refInputData}
            className="check-data"
            type="text"
            value={inputBD.value}
            readOnly
          />
        )}

        <button className="btn" onClick={clickSearchHandler}>
          <span className="material-icons-outlined span">search</span>
        </button>
        <button
          className="btn"
          onClick={toggleVisibilityTreeCombo}
          ref={refBtn}
          /*onBlur={hideDropDownOverlay}*/
        >
          <span className="material-icons-outlined span">arrow_drop_down</span>
        </button>
      </TreeComboWrapper>

      {/* выпадающий */}
      {visibleList ? (
        <DropOverlayWrapper
          tabIndex={0}
          onBlur={hideDropDownOverlay}
          ref={refDiv}
        >
          {props.treeData.length > 0 ? (
            <Tree
              treeData={props.treeData}
              clickHandler={selectedHandler}
              selectedItem={selectedItem}
            />
          ) : null}
        </DropOverlayWrapper>
      ) : null}
    </>
  );
};
