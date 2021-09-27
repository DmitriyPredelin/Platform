import React, { useRef } from "react";
import { TContextMenuItem } from "../../common/interfaces";
import { useContextMenu } from "../../hooks/useContextMenu";
import { ContextMenuItem } from "./ContextMenuItem";

interface IContextMenuProps {
  contextMenuItems: Array<TContextMenuItem>;
  yPosInput?: number;
  xPosInput?: number;
  showMenuInput?: boolean;

  expand: [
    expandItemIds: Array<string>,
    setExpandItemIds: React.Dispatch<React.SetStateAction<Array<string>>>
  ];
  xPosStart?: number;
  yPosStart?: number;
  level?: number;
  target?: Node;
  parentSetShowMenu?: React.Dispatch<React.SetStateAction<boolean>>;
  position?: [topYPos: number, leftXPos: number];
}

export const ContextMain: React.FC<IContextMenuProps> = ({
  contextMenuItems,
  yPosInput,
  xPosInput,
  showMenuInput,
  expand,
  level,
  target,
  parentSetShowMenu,
  position,
}) => {
  const parentRef = useRef<HTMLDivElement>(null);

  const { xPos, yPos, showMenu, setShowMenu } = useContextMenu(
    expand[1],
    target,
    position
  );

  let topYPosInput: string = yPosInput ? yPosInput + "px" : yPos + "px";
  let leftXPosInput: string = xPosInput ? xPosInput + "px" : xPos + "px";

  if (position) {
    topYPosInput = position[0] + "px";
    leftXPosInput = position[1] + "px";
  }

  level = level ? level + 1 : 1;

  return (
    <>
      {showMenu || showMenuInput ? (
        <div
          ref={parentRef}
          className={`menu-container `}
          style={{
            top: topYPosInput,
            left: leftXPosInput,
          }}
        >
          {contextMenuItems.map((menuItem: TContextMenuItem) => {
            return (
              <ContextMenuItem
                key={menuItem.id}
                menuItem={menuItem}
                expand={expand}
                setShowMenu={parentSetShowMenu || setShowMenu}
                level={level || 1}
                parentRef={parentRef}
              />
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
