import { ObjectIcons, WindowTypes } from "../common/enums";
import { TContextMenuItem, TContextSets } from "../common/interfaces";

const Items: Array<TContextMenuItem> = [
  {
    id: "EDIT",
    name: "Редактировать",
    icon: ObjectIcons.EDIT,
    operation: WindowTypes.EDIT,
    children: [] as Array<TContextMenuItem>,
  },
  {
    id: "PROPERTIES",
    name: "Свойства",
    icon: ObjectIcons.PROPERTIES,
    operation: WindowTypes.PROPERTIES,
    children: [] as Array<TContextMenuItem>,
  },
  {
    id: "RENAME",
    name: "Переименовать",
    icon: ObjectIcons.RENAME,
    operation: WindowTypes.RENAME,
    children: [] as Array<TContextMenuItem>,
  },
];

export const getItemsById = (id: string, addId?: string): TContextMenuItem => {
  let empty: TContextMenuItem = {
    id: id,
    name: "",
    icon: "",
    children: [] as Array<TContextMenuItem>,
  };

  let item: TContextMenuItem | undefined = Items.find(
    (i: TContextMenuItem) => i.id === id
  );

  return item || empty;
};
