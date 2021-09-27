import React, { useState } from "react";
import { ModalBack } from "./ModalBack";
import { ModalWindow } from "./ModalWindow";

interface IModalProps {
  windowName: string;
  closeBtnHandler?: () => void;
  isModal: boolean;
  height?: number;
  width?: number;
  top?: number;
  left?: number;
}

export const Modal: React.FC<IModalProps> = (props: any) => {
  const [visibleModal, setVisibleModal] = useState<boolean>(true);
  const { isModal, top, left, height, width } = props;
  let startTop: number = top;
  let startLeft: number = left;
  if (!top) {
    startTop = document.documentElement.clientHeight / 2 - height / 2;
    startLeft = document.documentElement.clientWidth / 2 - width / 2;
  }

  const MWindow: JSX.Element = (
    <ModalWindow
      {...props}
      startTop={startTop}
      startLeft={startLeft}
      visibleModal={visibleModal}
      setVisibleModal={setVisibleModal}
    ></ModalWindow>
  );
  return (
    <>
      {visibleModal ? (
        isModal ? (
          <ModalBack isModal={isModal}>{MWindow}</ModalBack>
        ) : (
          MWindow
        )
      ) : null}
    </>
  );
};
