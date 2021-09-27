import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { WindowTypes } from "../common/enums";
import { INode, IObject } from "../common/interfaces";
import { tree } from "mock/tree";

const initialState = {
  selectedFolderInSideTree: 0, //ключ выбранной папки в боковом дереве
  sideTree: [] as Array<INode>, //боковое дерево объектов, выполнено в виде рекурсивного объекта
  selectedObject: {} as IObject, //выбранный объект
  objectsInDestFolder: [] as Array<IObject>, //список объектов в выбранной папке
  visibleModalWindows: [] as Array<WindowTypes>, //список окон
  changeObject: {} as IObject, // объект, у которого редактируется имя
  allDBObject: [] as Array<INode>, //список всех объектов типа БД, деревом
  hoveredObject : {} as IObject, //объект, на который навели мышь
};

export const selectFolderAndFetchChild = createAsyncThunk(
  "selectFolderAndFetchChild",
  async (key: number) => {
    let response = await fetch(`http://localhost:4000/observe/?id=${key}`);
    response = await response.json();
    return response;
    /*return [
      {
        KEY: 455285,
        NAME: "Объект",
        CLS: 1537,
        PAR: 389181,
        IS_EXPAND: 0,
        children: [],
      },
    ];*/
  }
);

//получить список всех элементов для бокового дерева
export const fetchSideTree = createAsyncThunk("fetchSideTree", async () => {
  let response = await fetch("http://localhost:4000/objecttree");
  response = await response.json();
  return response;
  //return tree;
});

//получить список элементов дерева типа База данных
export const fetchAllDBObject = createAsyncThunk(
  "fetchAllDBObject",
  async () => {
    let response = await fetch("http://localhost:4000/alldb");
    response = await response.json();
    return response;
  }
);

//получить список всех элементов для бокового дерева
export const testSend = createAsyncThunk("testSend", async () => {
  console.log("testSend start");
  const url = "https://fns-demo.fsight.cloud/fp9.2/app/PPService.axd";
  const params = {
    methodId: "CalcData",
    moduleId: "MOD_LINK_WITH_WEB",
    params: { params: `{"3":[101],"5":[101012020],"7":[3]}` },
    staticForeNet: false,
  };

  const qwe = {
    GetSearch: {
      tMb: {
        id: "HJPMLMGCOKDLFOAEIAMCJILCLNKNBCDEGIGGFKLAEOODBEJN!M",
      },
      tArg: {
        GetMbObjectsArg: {
          text: "Сумма полученных ИТ-компаниями льгот по налогу на прибыль (накопительный итог) - ХД",
          pattern: {
            n: "true",
            note: "false",
            id: "true",
            classId: "true",
            className: "false",
            content: "false",
            changeDate: "false",
          },
        },
      },
    },
  };

  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    // mode: "cors", // no-cors, *cors, same-origin
    // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: "same-origin", // include, *same-origin, omit
    // headers: {
    //   /*"Content-Length": JSON.stringify(params).length.toString(),

    //   "Content-Type": "application/json"*/
    //   "Access-Control-Allow-Origin": "*",
    //   "Content-Type": "application/json",
    //   Accept: "application/json",

    //   // "Content-Type": "application/json",
    // },

    //  redirect: "follow", // manual, *follow, error
    //  referrerPolicy: "no-referrer", // no-referrer, *client
    body: JSON.stringify(qwe), // body data type must match "Content-Type" header
  });
  let res = await response.json();
  console.log("res = ", res.json());
  console.log("testSend end");
  return res; // parses JSON response into native JavaScript objects

  //response = await response.json();
  //return response;
});

const sortByColumnId = (
  arr: Array<any>,
  columnId: string,
  sortWay: boolean
) => {
  //sortWay === true - по возрастанию, false - по убыванию
  if (sortWay) {
    return arr.sort((a, b) => (a[columnId] > b[columnId] ? 1 : -1));
  } else {
    return arr.sort((a, b) => (a[columnId] < b[columnId] ? 1 : -1));
  }
};

const slice = createSlice({
  name: "keySlice",
  initialState: initialState,
  reducers: {
    //загрузка всех элементов из бокового дерева
    setSideTree(state, action) {
      state.sideTree = action.payload;
    },
    //выделение объекта в папке
    setSelectedObject(state, action) {
      state.selectedObject = action.payload;
    },
    sortTableByColumnId(state, action) {
      const columnId = action.payload.columnId;
      const sortWay = action.payload.sortWay;
      state.objectsInDestFolder = sortByColumnId(
        state.objectsInDestFolder,
        columnId,
        sortWay
      );
    },

    changeObject(state, action) {
      if (action.payload) {
        state.changeObject = state.selectedObject;
      }
    },

    hideWindow(state, action) {
      state.visibleModalWindows = state.visibleModalWindows.filter(
        (win: WindowTypes) => win !== (action.payload as WindowTypes)
      );
    },

    showWindow(state, action) {
      state.visibleModalWindows.push(action.payload as WindowTypes);
    },

    setHoveredObject(state, action) {
      state.hoveredObject = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSideTree.fulfilled, (state, action) => {
      state.sideTree = action.payload as unknown as Array<INode>;
    });
    builder.addCase(selectFolderAndFetchChild.fulfilled, (state, action) => {
      state.selectedFolderInSideTree = action.meta.arg;
      state.objectsInDestFolder = action.payload as unknown as Array<IObject>;
    });
    builder.addCase(fetchAllDBObject.fulfilled, (state, action) => {
      state.allDBObject = action.payload as unknown as Array<INode>;
    });
  },
});

export default slice.reducer;
export const {
  setSideTree,
  setSelectedObject,
  setHoveredObject,
  sortTableByColumnId,
  changeObject,
  hideWindow,
  showWindow,
} = slice.actions;
