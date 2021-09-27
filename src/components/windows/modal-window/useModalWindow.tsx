import React, { useEffect, useRef, useState } from "react";

export const useModalWindow = (
  ref: React.RefObject<HTMLDivElement>,
  startTop: number,
  startLeft: number
) => {
  const [grab, setGrab] = useState<boolean>(false);

  let dragging = false;
  let mouseX = 0;
  let mouseY = 0;

  let startPosX: number = 0;
  let startPosY: number = 0;

  let windowPosX: number = startLeft;
  let windowPosY: number = startTop;

  const startDrag = useRef((e: any) => {
    dragging = true;
    startPosX = e.pageX;
    startPosY = e.pageY;
  });

  const endDrag = useRef(() => {
    if (dragging && mouseX !== 0) {
      windowPosX = mouseX;
      windowPosY = mouseY;
    }
    dragging = false;
  });

  const onMouseMove = useRef((e: any) => {
    if (!dragging) {
      return;
    }
    mouseX = e.pageX - startPosX + windowPosX;
    mouseY = e.pageY - startPosY + windowPosY;

    if (ref.current) {
      ref.current.style.left = mouseX + "px";
      ref.current.style.top = mouseY + "px";
    }
  });

  const onMouseDownHandler = useRef((e: any) => {
    setGrab(true);
    startDrag.current(e);
  });

  const addEventListenersToDocument = () => {
    document.addEventListener("mousemove", onMouseMove.current);
    document.addEventListener("mouseup", endDrag.current);
  };

  const removeEventListenersFromDocument = () => {
    document.removeEventListener("mousemove", onMouseMove.current);
    document.removeEventListener("mouseup", endDrag.current);
  };

  useEffect(() => {
    addEventListenersToDocument();
    return () => {
      removeEventListenersFromDocument();
    };
  }, []);

  return {
    startDrag: startDrag.current,
    onMouseDownHandler: onMouseDownHandler.current,
    grab,
    setGrab,
  };
};
