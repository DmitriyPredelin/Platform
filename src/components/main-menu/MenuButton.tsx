import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { WindowTypes } from "../../common/enums";
import { IMenuButton } from "../../common/interfaces";
import {
  changeObject,
  fetchSideTree,
  showWindow,
  testSend,
} from "../../redux/keyReducer";
import { AppDispatch } from "../../redux/store";
import { OverlayDropDown } from "./OverlayDropDown";

const defaultColor: string = "#0277bd"; //синий
const defaultDisableColor: string = "lightgray";

const Button = styled("button")<IMenuButton>`
  font-size: ${({ size }) => {
    switch (size) {
      case "small":
        return "25px";
      case "medium":
        return "35px";
      case "large":
        return "50px";
    }
  }};
  cursor: pointer;
  color: ${(props) => {
    if (props.disable) {
      return defaultDisableColor;
    }
    return props.color || defaultColor;
  }};
  min-width: ${({ size }) => {
    switch (size) {
      case "small":
        return "25px";
      case "medium":
        return "45px";
      case "large":
        return "80px";
    }
  }};

  border: none;
  background-color: transparent;
  outline: none;
  line-height: normal;
  display: flex;
  flex-direction: ${({ size }) => {
    switch (size) {
      case "small":
        return "row";
      case "medium":
        return "column";
      case "large":
        return "column";
    }
  }};
  align-items: center;
  border-radius: 5px;
  box-sizing: border-box;
  border: 2px solid #fff;
  &:hover {
    background-color: #fff3e0;
    border: 2px solid #ffb74d;
  }
  padding: 4px;
  margin: 3px 4px 0px;
`;

export const MenuButton: React.FC<IMenuButton> = (props) => {
  const dropList = props.dropList;
  const dispatch: AppDispatch = useDispatch();
  const btnRef = useRef<HTMLButtonElement>(null);

  const btnCkickHandler = (e: React.MouseEvent<HTMLElement>) => {
    // e.stopPropagation();
    const isDisable: boolean | undefined = props.disable;
    if (isDisable) {
      return;
    }
    const method: string | undefined = props.method;
    if (method === null) {
      return;
    }
    switch (method) {
      case "reload":
        dispatch(fetchSideTree());
        break;
      case "edit":
        dispatch(showWindow(WindowTypes.EDIT));
        break;
      case "change_name":
        dispatch(changeObject(true));
        break;
      case "test":
        dispatch(testSend());
        break;
    }
  };
  return (
    <>
      <Button
        className="material-icons btn"
        {...props}
        onClick={btnCkickHandler}
        ref={btnRef}
      >
        {props.children}
        <span className="text">{props.text}</span>
      </Button>
      <OverlayDropDown dropList={dropList} btnRef={btnRef} />
    </>
  );
};
