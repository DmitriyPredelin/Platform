import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { sortTableByColumnId } from "../../redux/keyReducer";
import { AppDispatch } from "../../redux/store";

interface ITableHeaderCellProps {
  ID: string;
  name: string;
}

export const TableHeaderCell: React.FC<ITableHeaderCellProps> = ({
  ID,
  name,
}) => {
  const [sortWay, setSortWay] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const clickHandler = (columnId: string) => {
    setSortWay((prev: boolean) => !prev);
    dispatch(sortTableByColumnId({ columnId, sortWay }));
  };

  return (
    <th className="table-header" onClick={() => clickHandler(ID)}>
      {name}
      <span
        className={`material-icons-outlined table-header__sort-icon ${
          !sortWay ? "turn" : null
        }`}
      >
        sort
      </span>
    </th>
  );
};

