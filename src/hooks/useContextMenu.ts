import { useCallback, useEffect, useState } from "react";

export const useContextMenu = (
  setExpandItemIds: React.Dispatch<React.SetStateAction<string[]>>,
  target?: Node | null,
  position?: [topYPos: number, leftXPos: number],
) => {
  const [xPos, setXPos] = useState<number>(0);
  const [yPos, setYPos] = useState<number>(0);
  const [showMenu, setShowMenu] = useState<boolean>(false);

  if (!target) {
    target = document;
  }

  const handleContextMenu = useCallback(
    (e: any) => {
      //e.stopPropagation();
      e.preventDefault();
      if (position) {
        setXPos(position[1]);
        setYPos(position[0]);
      } else {
        setXPos(e.pageX);
        setYPos(e.pageY);
      }
      setShowMenu(true);
      setExpandItemIds([]);
    },
    [showMenu]
  );

  const handleClick = useCallback(
    (e) => {
      //e.stopPropagation();
      //e.preventDefault();
      if (showMenu) {
        setShowMenu(false);
        setExpandItemIds([]);
      }
    },
    [showMenu]
  );

  useEffect(() => {
    if (target) {
      if (position) {
        target.addEventListener("contextmenu", handleClick);
        target.addEventListener("click", handleContextMenu);
      } else {
        target.addEventListener("click", handleClick);
        target.addEventListener("contextmenu", handleContextMenu);
      }
      // target.addEventListener("click", handleClick);
      // target.addEventListener("contextmenu", handleContextMenu);
    }
    return () => {
      if (target) {
        if (position) {
          target.removeEventListener("contextmenu", handleClick);
          target.removeEventListener("click", handleContextMenu);
        } else {
          target.removeEventListener("click", handleClick);
          target.removeEventListener("contextmenu", handleContextMenu);
        }
      }
    };
  }, [showMenu]);

  return {
    xPos,
    yPos,
    showMenu,
    setShowMenu,
  };
};
