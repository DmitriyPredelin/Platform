import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedObject } from "redux/keyReducer";
import { setDisableButton } from "redux/menuReducer";
import { AppDispatch, useAppSelector } from "redux/store";
import { TContextMenuItem } from "common/interfaces";
import { getСontextMenuItems } from "redux/contextMenuReducer";
import { ContextMain } from "./ContextMain";

interface IContextMenuProps {
  contextMenuItems?: Array<TContextMenuItem>;
  target?: Node;
}

export const ContextMenu: React.FC<IContextMenuProps> = ({ target }) => {
  const [expandItemIds, setExpandItemIds] = useState<Array<string>>([]);
  const [targetCLS, setTargetCLS] = useState<number>(0);
  const dispatch: AppDispatch = useDispatch();

  const hoveredObject = useAppSelector(
    (state) => state.keyReducer.hoveredObject
  );

  const handleContextMenu = useCallback(
    (e: any) => {
      if (e.target.id === "") {
        setTargetCLS(-1);
        //dispatch(setSelectedObject(null));
      } else {
        if (hoveredObject) {
          setTargetCLS(hoveredObject.CLS);
        }
        if (hoveredObject.CLS === 0) {
          dispatch(setDisableButton({ pid: 10, disable: true }));
        } else {
          dispatch(setDisableButton({ pid: 10, disable: false }));
        }
        dispatch(setSelectedObject(hoveredObject));
      }
    },
    [hoveredObject]
  );

  useEffect(() => {
    if (target) {
      target.addEventListener("contextmenu", handleContextMenu);
    }
    return () => {
      if (target) {
        target.removeEventListener("contextmenu", handleContextMenu);
      }
    };
  }, [target, hoveredObject]);

  const contextMenuItems: Array<TContextMenuItem> = useSelector(
    getСontextMenuItems(targetCLS)
  );
  if (!contextMenuItems || !target) {
    return null;
  }

  return (
    <ContextMain
      contextMenuItems={contextMenuItems}
      expand={[expandItemIds, setExpandItemIds]}
      target={target}
    />
  );
};
