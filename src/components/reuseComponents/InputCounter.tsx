import React from "react";
import styled from "styled-components";

interface IInputCounterProps {
  height?: string;
  setValue : React.Dispatch<React.SetStateAction<any>>;
  value : any
}

const WrapperDiv = styled("div")<IInputCounterProps>`
  display: flex;
  border: 1px solid black;
  width: 100%;
  height: ${(props) => props.height || "25px"};
  border-radius: 2px;
  box-sizing: border-box;
  padding: 0;
  &:focus {
    border: 2px solid rgb(0, 162, 255);
    box-shadow: 0 0 2px 0 rgb(0, 162, 255);
    border-radius: 2px;
  }
`;

export const InputCounter: React.FC<IInputCounterProps> = (props) => {
  ///const [value, setValue] = useState<number>(0);
  const {value, setValue} = props;
  console.log(value)

  const changeValueHandler = (e: any) => {
    e.preventDefault();
    const newValue = parseInt(e.target.value);
    if (value >= 0 && newValue >= 0) {
      setValue(parseInt(e.target.value));
    }
  };

  return (
    <input
      className="edit-object__input-counter"
      type="number"
      pattern="[0-9]*"
      onChange={(e) => changeValueHandler(e)}
      value={value}
    />
  );
};
