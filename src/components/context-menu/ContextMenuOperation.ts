import { useDispatch } from "react-redux";
import { WindowTypes } from "../../common/enums";
import { changeObject, showWindow } from "../../redux/keyReducer";
import { AppDispatch } from "../../redux/store";

export const getOperation = (
  dispatch: AppDispatch,
  properties: WindowTypes | undefined
) => {
  switch (properties) {
    case WindowTypes.PROPERTIES:
    case WindowTypes.EDIT:
      return () => {
        dispatch(showWindow(properties));
      };
    case WindowTypes.RENAME:
      return () => {
        dispatch(changeObject(true));
      };
    default:
      return () => {
        console.log("no operation execute");
      };
  }
};
