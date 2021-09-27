import { CodeSandboxOutlined, TableOutlined } from "@ant-design/icons";
import React from "react";
import { IMenuButton, IMenuPanel } from "../../common/interfaces";
import { useAppSelector } from "../../redux/store";
import { MenuButton } from "./MenuButton";
import { MenuButtonGroup } from "./MenuButtonGroup";
import { MenuPanel } from "./MenuPanel";

export const MainMenu = () => {
  const dropList = {
    items: [
      { key: "1", icon: <CodeSandboxOutlined />, name: "Куб" },
      { key: "2", icon: <TableOutlined />, name: "Таблица" },
    ],

    handeClick: (e: any) => {
      console.log("click", e);
    },
  };

  const panels = useAppSelector((state) => state.menuReducer.menuPanels);
 
  return (
    <div className="main-menu">
      {panels.map((panel: IMenuPanel) => {
        return (
          <MenuPanel key={panel.name} name={panel.name}>
            {panel.groups.map((group: any, index: number) => {
              return (
                <MenuButtonGroup key={index}>
                  {group.map((button: IMenuButton) => {
                    return (
                      <MenuButton key={button.pid} {...button}>
                        {button.name}
                      </MenuButton>
                    );
                  })}
                </MenuButtonGroup>
              );
            })}
          </MenuPanel>
        );
      })}
    </div>
  );
};
