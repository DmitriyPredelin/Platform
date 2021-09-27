import React from "react";
import { TField, TParam } from "../../../../common/interfaces";

interface ITBodyProps {
  itemList: Array<TParam> | Array<TField>;
  type: "param" | "field"| "index";
  setSelectedFieldId: React.Dispatch<React.SetStateAction<string>>;
  selectedFieldId: string;
}

export const TBody: React.FC<ITBodyProps> = (props: any) => {
  const { itemList, type, selectedFieldId, setSelectedFieldId } = props;

  switch (type) {
    case "param":
      return (
        <>
          {itemList.map((row: TParam) => {
            <tr>
              <td>{row.name}</td>
              <td></td>
              <td>{row.id}</td>
              <td></td>
              <td>{row.type}</td>
            </tr>;
          })}
        </>
      );
    case "field":
      return (
        <>
          {itemList.map((row: TField, index: number) => {
            return (
              <tr
                className={`field-row ${
                  row.id === selectedFieldId ? "clicked" : ""
                }`}
                key={row.id}
                onClick={() => setSelectedFieldId(row.id)}
              >
                <td>{row.name}</td>
                <td></td>
                <td>{row.id}</td>
                <td></td>
                <td>{row.type}</td>
                <td></td>
                <td>{row.nullable ? "Допускаются" : "Не допускаются"}</td>
              </tr>
            );
          })}
        </>
      );
  }

  return null;
};
