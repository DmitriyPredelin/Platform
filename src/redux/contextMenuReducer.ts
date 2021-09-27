import { createSlice } from "@reduxjs/toolkit";
import { WindowTypes, ObjectIcons } from "../common/enums";
import { TContextMenuItem, TContextSets } from "../common/interfaces";
import { getItemsById } from "./contextMenuItems";
/*
-1 - пустое поле
0 - папка
513 - БД
*/
const initialState = {
  contextSets: [
    {
      //меню для пустого поля
      contextType: -1,
      contextMenuItems: [
        {
          id: "1",
          name: "Вид",
          icon: "",
          children: [] as Array<TContextMenuItem>,
        },
        {
          id: "2",
          name: "Упорядочить",
          icon: "",
          children: [] as Array<TContextMenuItem>,
        },
        getItemsById("EMPTY1"),
        {
          id: "3",
          name: "Создать",
          icon: "",
          children: [
            {
              id: "3.1",
              name: "Папка",
              icon: ObjectIcons.NEW_FOLDER,
              children: [
                {
                  id: "23333",
                  name: "ergerg",
                  icon: "",
                  children: [] as Array<TContextMenuItem>,
                },
              ],
            },
            {
              id: "3.2",
              name: "Ярлык",
              icon: ObjectIcons.NEW_LABEL,
              children: [] as Array<TContextMenuItem>,
            },
          ],
        },
        getItemsById("EMPTY2"),
        {
          id: "4",
          name: "Вставить",
          icon: ObjectIcons.PASTE,
          children: [] as Array<TContextMenuItem>,
        },
        getItemsById("EMPTY3"),
        {
          id: "5",
          name: "Поиск",
          icon: ObjectIcons.SEARCH,
          children: [] as Array<TContextMenuItem>,
        },
      ],
    },
    {
      //меню для объекта, который можно открыть только через редактирование
      contextType: -2,
      contextMenuItems: [
        getItemsById("EDIT"),
        getItemsById("EMPTY1"),
        {
          id: "-2_2",
          name: "Вырезать",
          icon: ObjectIcons.CUT,
          children: [] as Array<TContextMenuItem>,
        },
        {
          id: "-2_3",
          name: "Копировать",
          icon: ObjectIcons.COPY,
          children: [] as Array<TContextMenuItem>,
        },
        getItemsById("RENAME"),
        {
          id: "-2_5",
          name: "Удалить",
          icon: ObjectIcons.DELETE,
          children: [] as Array<TContextMenuItem>,
        },
        getItemsById("EMPTY2"),
        getItemsById("PROPERTIES"),
      ],
    },
    {
      contextType: 5635,
      contextMenuItems: [
        {
          id: "5635_1",
          name: "Открыть",
          icon: ObjectIcons.OPEN,
          children: [] as Array<TContextMenuItem>,
        },
        getItemsById("EMPTY1"),
        getItemsById("EDIT"),
        {
          id: "1",
          name: "",
          icon: "",
          children: [] as Array<TContextMenuItem>,
        },
        {
          id: "5635_3",
          name: "Вырезать",
          icon: ObjectIcons.CUT,
          children: [] as Array<TContextMenuItem>,
        },
        {
          id: "5635_4",
          name: "Копировать",
          icon: ObjectIcons.COPY,
          children: [] as Array<TContextMenuItem>,
        },
        {
          id: "5635_5",
          name: "Переименовать",
          icon: ObjectIcons.RENAME,
          children: [] as Array<TContextMenuItem>,
        },
        {
          id: "5635_6",
          name: "Удалить",
          icon: ObjectIcons.DELETE,
          children: [] as Array<TContextMenuItem>,
        },
        getItemsById("EMPTY2"),
        getItemsById("PROPERTIES"),
      ],
    },
    {
      contextType: 1111,
      contextMenuItems: [
        {
          id: "1",
          name: "мейн меню",
          icon: "",
          children: [] as Array<TContextMenuItem>,
        },
        {
          id: "2",
          name: "Упорядочить",
          icon: "",
          children: [] as Array<TContextMenuItem>,
        },
        {
          id: "0",
          name: "",
          icon: "",
          children: [] as Array<TContextMenuItem>,
        },
        {
          id: "3",
          name: "Создать",
          icon: "",
          children: [
            {
              id: "3.1",
              name: "Папка",
              icon: ObjectIcons.NEW_FOLDER,
              children: [] as Array<TContextMenuItem>,
            },
            {
              id: "3.2",
              name: "Ярлык",
              icon: ObjectIcons.NEW_LABEL,
              children: [] as Array<TContextMenuItem>,
            },
          ],
        },
        {
          id: "-1",
          name: "",
          icon: "",
          children: [] as Array<TContextMenuItem>,
        },
        {
          id: "4",
          name: "Вставить",
          icon: ObjectIcons.PASTE,
          children: [] as Array<TContextMenuItem>,
        },
        {
          id: "-2",
          name: "",
          icon: "",
          children: [] as Array<TContextMenuItem>,
        },
        {
          id: "5",
          name: "Поиск",
          icon: ObjectIcons.SEARCH,
          children: [] as Array<TContextMenuItem>,
        },
      ],
    },
  ] as Array<TContextSets>,
};

const slice = createSlice({
  name: "formSlice",
  initialState: initialState,
  reducers: {
    /*getСontextSets(state, action) {
      const contextSet: TContextSets | undefined = state.contextSets.find(
        (set: TContextSets) => {
          return set.contextType === action.payload;
        }
      );
      if (contextSet) {
        return contextSet;
      }
    },*/
  },
});

export default slice.reducer;
///export const { getСontextSets } = slice.actions;

export const getСontextMenuItems = (contextSetKey: number) => (state: any) => {
  let setKey: number = -1;
  switch (contextSetKey) {
    case 0:
      setKey = -1;
      break;
    case 513:
    case 1537:
      setKey = -2;
      break;
    default:
      setKey = contextSetKey;
      break;
  }
  const contextSet: TContextSets = state.contextMenuReducer.contextSets.find(
    (set: TContextSets) => {
      return set.contextType === setKey;
    }
  );

  return contextSet.contextMenuItems || null;
};
