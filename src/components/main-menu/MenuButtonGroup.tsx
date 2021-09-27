import React from "react";

interface IMenuButtonGroupProps {}

export const MenuButtonGroup: React.FC<IMenuButtonGroupProps> = ({
  children,
}) => {
  return <div className="menu-panel_group">{children}</div>;
};
