import React from "react";

interface IMenuPanelProps {
  name: string;
}

export const MenuPanel: React.FC<IMenuPanelProps> = ({ children, name }) => {
  return (
   
    <div className= {name === "" ? "menu-panel long" : "menu-panel"} >
      <div className="menu-panel__main-content">
        <div className="menu-panel__children">{children}</div>
        <div className="menu-panel__name-panel">
          <div className="name-panel__name">{name}</div>
        </div>
      </div>
      <div className="manu-panel__delimeter"></div>
    </div>
  );
};
