import React from "react";
import styled from "styled-components";

interface IButtonProps {
  height: number;
  width?: number;
  bcColor?: string;
  bcColorHovered?: string;
  border?: string;
  onClick: (value: any) => void;
  btnType: "primary" | "danger" | "undef" | "disable" | "custom";
}

/*получение цветов по типу*/
const getColor = (btnType: string, bcColor: string): string => {
  switch (btnType) {
    case "primary":
      return "#1890ff";
    case "danger":
      return "#ff4d4f";
    case "undef":
      return "#bdbdbd";
    case "disable":
      return "#d9d9d9";
    case "custom":
      return bcColor;
  }
  return "";
};
/*получение цветов при наведении по типу*/
const getColorHovered = (btnType: string, bcColor: string): string => {
  switch (btnType) {
    case "primary":
      return "#40a9ff";
    case "danger":
      return "#ff7875";
    case "undef":
      return "#e0e0e0";
    case "custom":
      return bcColor;
  }
  return "";
};

const ButtonWrapper = styled("button")<IButtonProps>`
  display: flex;
  flex-direction: row;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  align-items: center;
  justify-content: center;
  cursor: ${(props) =>
    props.btnType !== "disable" ? "pointer" : "not-allowed"};
  margin-right: 15px;
  color: white;

  border: 1px solid
    ${(props) => getColor(props.btnType, props.bcColor || "white")};
  background-color: ${(props) =>
    getColor(props.btnType, props.bcColor || "white")};
  border-radius: 3px;

  &:hover {
    border: 1px solid
      ${(props) => getColorHovered(props.btnType, props.bcColor || "white")};
    background-color: ${(props) =>
      getColorHovered(props.btnType, props.bcColor || "white")};
  }

  span {
    font-size: 20px;
    margin-right: 3px;
  }
`;

export const Button: React.FC<IButtonProps> = (props: any) => {
  const { children } = props;
  let newProp: any = {};
  if (props.btnType !== "disable") {
    newProp = props;
  } else {
    newProp = { ...props, onClick: null };
  }

  return <ButtonWrapper {...newProp}>{children}</ButtonWrapper>;
};

/* bcColor="#1890ff"
  bcColorHovered="#40a9ff"*/
