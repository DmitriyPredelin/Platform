import React from "react";
import styled from "styled-components";
import { useModalWindow } from "./useModalWindow";

interface IModalWindowProps {
  windowName: string;
  closeBtnHandler?: () => void;
  height?: number;
  width?: number;
  startTop: number;
  startLeft: number;
  setVisibleModal: React.Dispatch<React.SetStateAction<boolean>>;
  parentRef: React.RefObject<HTMLDivElement>;
}

interface IWindowTitleProps {
  background: string;
  grab: boolean;
}

interface IWindowBackProps {
  isModal: boolean;
}

interface IWindowProps {
  height?: number;
  width?: number;
  startTop?: number;
  startLeft?: number;
}
/* top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
   top: ${(props) => props.startTop || 0}px;
  left: ${(props) => props.startLeft || 0}px;

   top: 0;
  left: 0;*/

const Window = styled("div")<IWindowProps>`
  z-index: 11;
  position: fixed;
  box-shadow: 2.2px 4.5px 4.5px hsl(0deg 0% 0% / 0.43);
  border: 1px solid gray;
  box-sizing: border-box;
  flex-direction: column;
  background-color: white;
  border-radius: 8px;
  display: flex;

  height: ${(props) => props.height}px;
  width: ${(props) => props.width}px;

  top: ${(props) => props.startTop || 0}px;
  left: ${(props) => props.startLeft || 0}px;
`;

const WindowTitle = styled("div")<IWindowTitleProps>`
  width: 100%;
  height: 30px;
  background-color: ${(props) => props.background};
  display: flex;
  border-radius: 8px;
  justify-content: space-between;
  align-items: center;
  cursor: ${(props) => (props.grab ? "grabbing" : "grab")};

  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  .close_button {
    background-color: ${(props) => props.background};
    border: none;
    height: 100%;
    border-radius: 8px;

    &:hover {
      background-color: #ff4d4f;
    }
  }
`;

export const ModalWindow: React.FC<IModalWindowProps> = (props) => {
  const {
    windowName,
    closeBtnHandler,
    height,
    width,
    startTop,
    startLeft,
    setVisibleModal,
  } = props;
  const ref = React.useRef<HTMLDivElement>(null);

  const { startDrag, onMouseDownHandler, grab, setGrab } = useModalWindow(
    ref,
    startTop,
    startLeft
  );

  const onCloseBtnHandler = () => {
    if (closeBtnHandler) {
      closeBtnHandler();
    }
    setVisibleModal(false);
  };

  return (
    <Window
      height={height}
      width={width}
      ref={ref}
      startTop={startTop}
      startLeft={startLeft}
    >
      <WindowTitle
        background="#cbb0ee"
        grab={grab}
        onMouseDown={onMouseDownHandler}
        onMouseUp={() => setGrab(false)}
        onDragStart={startDrag}
      >
        <div style={{ paddingLeft: "12px" }}>{windowName}</div>
        <button
          className="material-icons close_button"
          onClick={onCloseBtnHandler}
        >
          close
        </button>
      </WindowTitle>
      {props.children}
    </Window>
  );
};
