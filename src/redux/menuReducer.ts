import { createSlice } from "@reduxjs/toolkit";
import { ObjectIcons } from "common/enums";
import {
  IMenuButton,
  IMenuGroup,
  IMenuPanel,
  TDropListItems,
} from "common/interfaces";

let initialState = {
  menuPanels: [
    {
      name: "",
      groups: [] as Array<IMenuGroup>,
    },
  ],
};

//гет от апи
initialState = {
  menuPanels: [
    {
      name: "Вид",
      groups: [
        [
          {
            pid: 1,
            text: "Обновить",
            size: "large",
            name: ObjectIcons.RELOAD,
            method: "reload",
          },
        ],
      ],
    },
    {
      name: "Буффер обмена",
      groups: [
        [
          {
            pid: 2,
            text: "Вставить",
            size: "large",
            name: ObjectIcons.PASTE,
            disable: true,
          },
        ],
        [
          { pid: 3, text: "Вырезать", size: "small", name: ObjectIcons.CUT },
          { pid: 4, text: "Копировать", size: "small", name: ObjectIcons.COPY },
        ],
      ],
    },
    {
      name: "Упорядочить",
      groups: [
        [
          {
            pid: 5,
            text: "Удалить",
            size: "large",
            name: ObjectIcons.DELETE,
            color: "red",
          },
        ],
        [
          {
            pid: 6,
            text: "Переименовать",
            size: "large",
            name: ObjectIcons.RENAME,
            method: "change_name",
          },
        ],
      ],
    },
    {
      name: "Создать",
      groups: [
        [
          {
            pid: 7,
            text: "Новая папка",
            size: "large",
            name: ObjectIcons.NEW_FOLDER,
          },
        ],
        [
          {
            pid: 8,
            text: "Новый объект",
            size: "large",
            name: ObjectIcons.NEW_OBJECT,
            method : "new_object",
            dropList: [
              { key: 1, name: "Куб" },
              { key: 2, name: "Таблица" },
            ] as Array<TDropListItems>,
          },
        ] ,
      ],
    },
    {
      name: "Открыть",
      groups: [
        [{ pid: 9, text: "Открыть", size: "large", name: ObjectIcons.OPEN }],
        [
          {
            pid: 10,
            text: "Редактировать",
            size: "large",
            name: ObjectIcons.EDIT,
            method: "edit",
            disable: true,
          },
        ],
      ],
    },
    {
      name: "Выделение",
      groups: [
        [
          {
            pid: 11,
            text: "Выделить все",
            size: "small",
            name: ObjectIcons.SELECT_ALL,
          },
          {
            pid: 12,
            text: "Снять выделение",
            size: "small",
            name: ObjectIcons.DESELECT_ALL,
          },
        ],
      ],
    },
    {
      name: "Поиск",
      groups: [
        [{ pid: 13, text: "Поиск", size: "large", name: ObjectIcons.SEARCH }],
      ],
    },
    {
      name: "Тест",
      groups: [
        [
          {
            pid: 14,
            text: "Тест",
            size: "large",
            name: "schedule_send",
            method: ObjectIcons.TEST,
          },
        ],
      ],
    },
    {
      name: "",
      groups: [[{ pid: 999, text: "", size: "large", name: "", method: "" }]],
    },
  ],
};

const slice = createSlice({
  name: "menuSlice",
  initialState: initialState,
  reducers: {
    //редактируемый объект
    setDisableButton(state, action) {
      state.menuPanels.forEach((panel: IMenuPanel) => {
        panel.groups.forEach((group: any) => {
          group.forEach((item: IMenuButton) => {
            if (item.pid === action.payload.pid) {
              item.disable = action.payload.disable;
            }
          });
        });
      });
    },
  },
});

export default slice.reducer;
export const { setDisableButton } = slice.actions;
