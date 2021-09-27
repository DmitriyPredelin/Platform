import { Spin } from "antd";
import React, { Suspense } from "react";
import { WindowTypes } from "common/enums";
import { useAppSelector } from "redux/store";
import { EditObjectWindow } from "../windows/edit-component/EditObjectWindow";
import { PropertyWindow } from "../windows/property-component/PropertyWindow";

export const ModalWindowsRouter = () => {
  const visibleModalWindows: Array<WindowTypes> = useAppSelector(
    (state) => state.keyReducer.visibleModalWindows
  );

  return (
    <Suspense fallback={<Spin size="large" />}>
      {visibleModalWindows.map((win: WindowTypes) => {
        switch (win) {
          case WindowTypes.EDIT:
            return <EditObjectWindow key={win} />;
          case WindowTypes.PROPERTIES:
            return <PropertyWindow key={win} />;
        }
      })}
    </Suspense>
  );
};
