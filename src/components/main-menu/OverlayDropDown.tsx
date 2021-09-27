import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TContextMenuItem, TDropListItems } from "../../common/interfaces";
import { getСontextMenuItems } from "../../redux/contextMenuReducer";
import { ContextMain } from "../context-menu/ContextMain";
import { ContextMenu } from "../context-menu/ContextMenu";

interface IOverlayDropDownProps {
  dropList?: Array<TDropListItems>;
  btnRef: React.RefObject<HTMLButtonElement>;
}

export const OverlayDropDown: React.FC<IOverlayDropDownProps> = ({
  dropList,
  btnRef,
}) => {
  const [targetCLS, setTargetCLS] = useState<number>(0);
  const [expandItemIds, setExpandItemIds] = useState<Array<string>>([]);

  const handleClick = (e: any) => {
    console.log("click", e);
  };

  let topYPos: number = 0;
  let leftXPos: number = 0;
  if (btnRef.current) {
    const parent = btnRef.current.getBoundingClientRect();

    topYPos = parent.bottom + 3;
    leftXPos = parent.left;
  }

  const handleBtnClick = (e: any) => {
    setTargetCLS(1111);
  };

  useEffect(() => {
    if (btnRef.current) {
      btnRef.current.addEventListener("mousedown", handleBtnClick);
    }
    return () => {
      if (btnRef.current) {
        btnRef.current.removeEventListener("mousedown", handleBtnClick);
      }
    };
  }, [btnRef.current]);

  const contextMenuItems: Array<TContextMenuItem> = useSelector(
    getСontextMenuItems(targetCLS)
  );

  if (!dropList || !contextMenuItems || !btnRef.current) {
    return null;
  }

  return (
    <ContextMain
      contextMenuItems={contextMenuItems}
      expand={[expandItemIds, setExpandItemIds]}
      target={btnRef.current as Node}
      position={[topYPos, leftXPos]}
    />
  );
};
