import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "styles/main.scss";
import { fetchSideTree } from "../redux/keyReducer";
import { AppDispatch } from "../redux/store";
import { MainMenu } from "./main-menu/MainMenu";
import { MainField } from "./object-tree/MainField";

const App = () => {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    //загружаем список всех элементов бокового дерева в стор
    dispatch(fetchSideTree());
  }, []);

  return (
    <div className="container">
      <MainMenu />
      <MainField />
    </div>
  );
};

export default App;
