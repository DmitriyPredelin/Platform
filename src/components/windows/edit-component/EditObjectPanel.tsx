import React, { useMemo } from "react";
import { EditObjectMain } from "./EditObjectMain";

interface IEditObjectPanelProps {
  selectItem: number;
  setSelectItem: React.Dispatch<React.SetStateAction<number>>;
}

export const EditObjectPanel: React.FC<IEditObjectPanelProps> = ({
  selectItem,
  setSelectItem,
}) => {
  type btnType = {
    key: number;
    name: string;
  };

  const btnArray: Array<btnType> = useMemo(
    () => [
      { key: 1, name: "Базовые свойства" },
      { key: 2, name: "Параметры" },
      { key: 3, name: "Свойства" },
      { key: 4, name: "Поля" },
      { key: 5, name: "Индексы" },
      { key: 6, name: "Ограничения" },
      { key: 7, name: "Триггеры" },
    ],
    []
  );
  return (
    <>
      <div className="edit-object__panel">
        <div className="edit-object__nav_panel">
          {btnArray.map((btn: btnType) => {
            return (
              <button
                key={btn.key}
                className="nav-panel__item"
                onClick={() => setSelectItem(btn.key)}
              >
                <span
                  className={`material-icons-round circle ${
                    selectItem === btn.key ? "selected" : ""
                  }`}
                >
                  circle
                </span>
                {btn.name}
              </button>
            );
          })}
        </div>
      </div>
      <div className="edit-object__info-bc">
        <div className="edit-object__info-panel">
          <EditObjectMain selectItem={selectItem} />
        </div>
      </div>
    </>
  );
};
