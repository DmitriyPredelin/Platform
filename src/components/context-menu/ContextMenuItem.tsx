import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { TContextMenuItem } from "../../common/interfaces";
import { AppDispatch } from "../../redux/store";
import { ContextMain } from "./ContextMain";
import { getOperation } from "./ContextMenuOperation";

interface IContextMenuItemProps {
  menuItem: TContextMenuItem;
  expand: [
    expandItemIds: Array<string>,
    setExpandItemIds: React.Dispatch<React.SetStateAction<Array<string>>>
  ];
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
  level: number;
  parentRef: React.RefObject<HTMLDivElement>;
}

export const ContextMenuItem: React.FC<IContextMenuItemProps> = ({
  menuItem,
  expand,
  setShowMenu,
  level,
  parentRef,
}) => {
  const [expandItemIds, setExpandItemIds] = expand;
  const dispatch: AppDispatch = useDispatch();
  const isHaveChildren: boolean = menuItem.children.length > 0;
  const childRef = useRef<HTMLDivElement>(null);

  let xPosInput: number = 0;
  let yPosInput: number = 0;
  if (childRef.current && parentRef.current) {
    //вычислим сдвиги для координат нового окна
    xPosInput = childRef.current.clientWidth + 6;
    const parent = parentRef.current.getBoundingClientRect();
    const element = childRef.current.getBoundingClientRect();
    yPosInput = element.top - parent.top - level;
  }

  const onClickItemContainerHandler = () => {
    if (isHaveChildren) {
      setExpandItemIds((prev) => {
        if (level - 1 < prev.length) {
          return prev.splice(level - 1).concat(menuItem.id);
        }
        return prev.concat(menuItem.id);
      });
    } else {
      setExpandItemIds([]);
      setShowMenu(false);
      getOperation(dispatch, menuItem.operation)();
    }
  };

  const isExpandItem: boolean = expandItemIds.includes(menuItem.id);

  const isDivider: boolean = menuItem.name === "";

  return (
    <React.Fragment key={menuItem.id}>
      {isDivider ? (
        <div className="horizontal-divider"></div>
      ) : (
        <>
          <div
            className="menu-item"
            ref={childRef}
            onClick={onClickItemContainerHandler}
            tabIndex={0}
          >
            <span className="material-icons-outlined icon">
              {menuItem.icon}
            </span>
            <span className="divider"></span>
            <span className="name">{menuItem.name}</span>
            {isHaveChildren ? (
              <span className="material-icons-outlined arrow_more">
                arrow_right
              </span>
            ) : null}
          </div>
          {isExpandItem ? (
            <ContextMain
              contextMenuItems={menuItem.children}
              yPosInput={yPosInput}
              xPosInput={xPosInput}
              showMenuInput={isExpandItem}
              expand={expand}
              level={level || 0}
              parentSetShowMenu={setShowMenu}
            />
          ) : null}
        </>
      )}
    </React.Fragment>
  );
};
