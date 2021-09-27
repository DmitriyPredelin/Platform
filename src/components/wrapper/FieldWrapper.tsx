import React from "react";
import styled from "styled-components";

interface IFieldWrapperProps {
  name: string;
  id: string;
  direction: "vertical" | "horizontal";
}

const DivWrapper = styled("div")<IFieldWrapperProps>`
  display: flex;
  width: 100%;

  align-items:  ${(props) => {
    if (props.direction === "vertical") {
      return "flex-start";
    }
    return "center";
  }};
  margin-bottom: 5px;
  justify-content: space-between;
  flex-direction: ${(props) => {
    if (props.direction === "vertical") {
      return "column";
    }
    return "row";
  }};
  margin-right : 10px;

  .input-info {
    width: ${(props) => {
        if (props.direction === "vertical") {
          return "100%";
        }
        return "85%";
      }};
    height: 25px;
    font-size: 18px;
    outline: none;
    margin-right : 10px;

    &:focus {
      border: 2px solid rgb(0, 162, 255);
      box-shadow: 0 0 2px 0 rgb(0, 162, 255);
      border-radius: 2px;
    }
  }
`;

export const FieldWrapper: React.FC<IFieldWrapperProps> = ({
  children,
  name,
  id,
  direction,
}) => {
  return (
    <DivWrapper name={name} id={id} direction={direction}>
      <label style={{ marginRight: "20px" }} htmlFor={id}>
        {name}
      </label>
      {children}
    </DivWrapper>
  );
};
