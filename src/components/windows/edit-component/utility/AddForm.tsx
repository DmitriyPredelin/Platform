import { Spin } from "antd";
import React, { Suspense } from "react";
import { TField, TParam } from "../../../../common/interfaces";
import AddFieldPage from "../add-forms/AddFieldPage";
import AddIndexPage from "../add-forms/AddIndexPage";
import AddParamPage from "../add-forms/AddParamPage";

interface IAddFormProps {
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  itemList: Array<TParam> | Array<TField>;
  setItemList: React.Dispatch<React.SetStateAction<any[]>>;
  type: "param" | "field" | "index";
}

export const AddForm: React.FC<IAddFormProps> = (props) => {
  const { setVisible, itemList, setItemList, type } = props;
 
  switch (type) {
    case "field":
      return (
        <Suspense fallback={<Spin size="large" />}>
          <AddFieldPage
            setVisibleWindow={setVisible}
            fieldList={itemList as TField[]}
            setFieldList={setItemList}
          />
        </Suspense>
      );
    case "param":
      return (
        <Suspense fallback={<Spin size="large" />}>
          <AddParamPage setVisibleWindow={setVisible} />
        </Suspense>
      );
    case "index":
      return (
        <Suspense fallback={<Spin size="large" />}>
          <AddIndexPage setVisibleWindow={setVisible} />
        </Suspense>
      );
  }
};

export default AddForm;
