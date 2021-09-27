import React from "react";
import styled from "styled-components";

interface IRowInfoProps {
  id: string;
  name: string;
  type?: string;
  width?: string;
  height?: string;
  fontSize?: string;
  flexDirection?: "row" | "column";
  flex?: string;
  onChange?: (e: any) => void;
  value?: string | number;
  marginRight?: string;
}

const WrapperDiv = styled("div")<IRowInfoProps>`
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 5px;
  justify-content: space-between;
  flex-direction: ${(props) => props.flexDirection || "row"};
  flex: ${(props) => props.flex || "0 1 auto"};
  margin-right: ${(props) => props.marginRight || ""};
  overflow-x: hidden;

  input {
    width: ${(props) => props.width || "100%"};
    height: ${(props) => props.height || "25px"};
    font-size: ${(props) => props.fontSize || "18px"};
    outline: none;
    box-sizing: border-box;
    font-family: Roboto;
    font-size: 16px;

    &:focus {
      border: 2px solid rgb(0, 162, 255);
      box-shadow: 0 0 2px 0 rgb(0, 162, 255);
      border-radius: 2px;
    }
  }

  textarea {
    width: 100%;
    height: 400px;
    font-size: 16px;
    max-width: 100%;
    resize: none;
    outline: none;
    overflow: auto;
    box-sizing: border-box;

    &:focus {
      border: 2px solid rgb(0, 162, 255);
      box-shadow: 0 0 2px 0 rgb(0, 162, 255);
      border-radius: 2px;
    }
  }

  label {
    align-self: ${(props) =>
      props.flexDirection === "column" ? "flex-start" : "center"};
    font-size: 16px;
  }

  select {
    width: ${(props) => props.width || "100%"};
    box-sizing: border-box;
    height: ${(props) => props.height || "100%"};
    border-radius: 2px;
    font-size: 16px;
    &:focus {
      border: 2px solid rgb(0, 162, 255);
      box-shadow: 0 0 2px 0 rgb(0, 162, 255);
      border-radius: 2px;
    }
  }
`;

export const RowInfo: React.FC<IRowInfoProps> = (props: any) => {
  const { id, name, type, onChange, value, children } = props;

  const childNode = React.cloneElement(children, {
    ...children.props,
    type: type,
    id: id,
    onChange: onChange,
    value: value,
  });

  return (
    <WrapperDiv {...props}>
      <label htmlFor={id}>{name}:</label>
      {childNode}
    </WrapperDiv>
  );
};
