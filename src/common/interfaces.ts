import { WindowTypes } from "./enums";

export enum TriState {
  false = 0,
  true = 1,
  undef = 2,
}

export enum NodeStyle {
  dotted = 1,
}

export interface IObject {
  ID: string;
  KEY: number;
  NAME: string;
  STAMP: string;
  CLS: number;
  DES: string;
  //expanderState?: TriState ;
  IS_CONTAINERABLE: boolean; ////если этот объект является контейнером для других объектов, то = 1, иначе 0
  SELECTED: boolean;
}

export interface INode {
  KEY: number;
  NAME: string;
  CLS: number;
  PAR: null | number;
  children: Array<INode>;
  style?: NodeStyle;
  IS_LEAF?: boolean;
  IS_EXPAND: number;
}

export interface IMenuPanel {
  name: string;
  groups: Array<IMenuGroup>;
}

export interface IMenuButton {
  pid: number;
  text: string;
  size: "small" | "medium" | "large";
  name: string;
  color?: string;
  disable?: boolean;
  method?: string;
  dropList?: Array<TDropListItems>;
}

export interface IMenuGroup {
  //buttons : Array<IMenuButton>
}

export type TField = {
  id: string;
  name: string;
  type: string;
  nullable: boolean;
  length: number;
  decimalNum: number;
  defaultValue: string;
};

export type TIndex = {
  id: string;
  name: string;
  type: string;
  fields: string;
};

export type TParam = {
  id: string;
  name: string;
  type: string;
};

export type TColumn = {
  key: number;
  name: string;
  id: string;
};

export type TContextSets = {
  contextType: number;
  contextMenuItems: Array<TContextMenuItem>;
};

export type TContextMenuItem = {
  id: string;
  name: string;
  icon: string;
  operation? : WindowTypes;
  children: Array<TContextMenuItem>;
};

export type TDropListItems = {
  key: number;
  name: string;
};

export type TDropList = {
  items: Array<TDropListItems>;
};
