import React from "react";
import styled from "styled-components";

interface IWindowBackProps {
  isModal: boolean;
}

interface IModalBackProps {
  isModal: boolean;
}

const WindowBack = styled("div")<IWindowBackProps>`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow : hidden;
  transform: ${(props) => (props.isModal ? "scale(1)" : "scale(0)")};
`;

export const ModalBack: React.FC<IModalBackProps> = (props) => {
  return <WindowBack isModal={props.isModal}>{props.children}</WindowBack>;
};
