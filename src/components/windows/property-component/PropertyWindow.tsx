import React from "react";
import { RowInfo } from "../../reuseComponents/RowInfo";
import { Modal } from "../modal-window/Modal";

export const PropertyWindow = () => {
  return (
    <Modal windowName="Свойства" isModal={false} height={600} width={450}>
      <div>
        <RowInfo
          id="name"
          name="Наименование"
          flexDirection="column"
          type="text"
          width={"100%"}
          onChange={() => {}}
          value={"wef"}
        >
          <input />
        </RowInfo>
      </div>
    </Modal>
  );
};
