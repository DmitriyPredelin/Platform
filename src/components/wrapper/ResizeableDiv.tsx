import React, { useEffect, useRef } from "react";

interface IResizeableDivProps {
  minWidth: number;
  className: string;
}

export const ResizeableDiv: React.FC<IResizeableDivProps> = ({
  minWidth,
  className,
}) => {
  let startWidthPrev = 0;
  let startWidthNext = 0;
  let dragging = false;
  let mouseX = 0;
  let startPos = 0;

  const ref = React.useRef<HTMLDivElement>(null);

  const startDrag = useRef(() => {
    dragging = true;
    startPos = mouseX;

    startWidthPrev = 0;
    startWidthNext = 0;

    if (ref.current) {
      let prevSibling = ref.current.previousSibling;
      let nextSibling = ref.current.nextSibling;
      if (prevSibling) {
        startWidthPrev = (prevSibling as HTMLDivElement).getBoundingClientRect().width;
      }

      if (nextSibling) {
        startWidthNext = (nextSibling as HTMLDivElement).getBoundingClientRect().width;
      }
    }
  });

  const endDrag = () => {
    dragging = false;
  };

  const onMouseMove = (e: any) => {
    mouseX = e.touches ? e.touches[0].screenX : e.screenX;
    if (!dragging) {
      return;
    }
    const moveDiff = startPos - mouseX;
    let newPrev = startWidthPrev - moveDiff;
    let newNext = startWidthNext + moveDiff;

    if (newPrev < minWidth) {
      const offset = newPrev - minWidth;
      newPrev = minWidth;
      newNext += offset;
    } else if (newNext < minWidth) {
      const offset = newNext - minWidth;
      newNext = minWidth;
      newPrev += offset;
    }

    (ref.current?.previousSibling as HTMLDivElement).style.width =
      newPrev + "px";
    (ref.current?.nextSibling as HTMLDivElement).style.width =
      (newNext) + "px";
  };
  

  const addEventListenersToDocument = () => {
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", endDrag);

    document.addEventListener("touchmove", onMouseMove);
    document.addEventListener("touchend", endDrag);
  };

  const removeEventListenersFromDocument = () => {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", endDrag);

    document.removeEventListener("touchmove", onMouseMove);
    document.removeEventListener("touchend", endDrag);
  };

  useEffect(() => {
    addEventListenersToDocument();
    return () => {
      removeEventListenersFromDocument();
    };
  }, []);

  return (
    <div
      ref={ref}
      onMouseDown={startDrag.current}
      onDragStart={startDrag.current}
      onDragEnd={endDrag}
      className={className}
    ></div>
  );
};
