import React from "react";

interface IAddParamPageProps {
  setVisibleWindow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AddParamPage: React.FC<IAddParamPageProps> = ({
  setVisibleWindow,
}) => {
  return (
    <div className="modal-window__back">
      <div className="add-item__content">
        <div className="window__name-panel">
          <div style={{ paddingLeft: "12px" }}>Свойства параметра объекта</div>
          <button
            className="material-icons close_button"
            onClick={() => setVisibleWindow(false)}
          >
            close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddParamPage;
