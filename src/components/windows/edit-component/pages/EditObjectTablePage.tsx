import React from "react";
import { TField, TParam } from "common/interfaces";
import { ResizeableTd } from "../../../wrapper/ResizeableTd";
import { EditObjectBtnPanel } from "../utility/EditObjectBtnPanel";
import { TBody } from "../utility/TBody";
import { AddForm } from "../utility/AddForm";

interface IEditObjectTablePageProps {
  itemList: Array<TParam> | Array<TField>;
  setItemList: React.Dispatch<React.SetStateAction<any[]>>;
  headerNames: Array<string>;
  pageName: string;
  info: string;
  tableTitle: string;
  type: "param" | "field" | "index";
  addFormState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  selectItemState: [string, React.Dispatch<React.SetStateAction<string>>];
  onClickAdd: () => void;
  onClickRemove: () => void;
}

export const EditObjectTablePage: React.FC<IEditObjectTablePageProps> = (
  props: IEditObjectTablePageProps
) => {
  const {
    itemList,
    setItemList,
    headerNames,
    pageName,
    info,
    tableTitle,
    type,
    addFormState,
    selectItemState,
    onClickAdd,
    onClickRemove,
  } = props;

  const [visible, setVisible] = addFormState;
  const [selectedFieldId, setSelectedFieldId] = selectItemState;

  return (
    <div className="edit-object__page">
      <b className="edit_object__text">{pageName}</b>
      <p className="edit_object__text">{info}</p>
      <br />
      <div className="row">{tableTitle}:</div>

      <div className="table-panel">
        <table className="table-param">
          <thead>
            <tr>
              {headerNames.map((name: string, index: number) => {
                return (
                  <React.Fragment key={name}>
                    <th className="table-header">{name}</th>
                    {/*для последнего столбца не надо резайзер*/}
                    {index + 1 !== headerNames.length ? (
                      <ResizeableTd minWidth={0} className="resizer_td" />
                    ) : null}
                  </React.Fragment>
                );
              })}
            </tr>
          </thead>
          <tbody>
            <TBody
              itemList={itemList}
              type={type}
              setSelectedFieldId={setSelectedFieldId}
              selectedFieldId={selectedFieldId}
            />
          </tbody>
        </table>
        <EditObjectBtnPanel
          onClickAdd={onClickAdd}
          onClickEdit={() => {}}
          onClickRemove={onClickRemove}
        />
      </div>
      {visible ? (
        <AddForm
          setVisible={setVisible}
          itemList={itemList}
          setItemList={setItemList}
          type={type}
        />
      ) : null}
    </div>
  );
};

export default EditObjectTablePage;
