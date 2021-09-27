import React, { useState } from "react";
import { TField, TIndex, TParam } from "common/interfaces";
//import { EditObjectBaseInfo } from "./pages/EditObjectBaseInfo";
//import { EditObjectProperties } from "./pages/EditObjectProperties";
//import { EditObjectTablePage } from "./pages/EditObjectTablePage";


const EditObjectBaseInfo = React.lazy(() => import("./pages/EditObjectBaseInfo"));
const EditObjectProperties = React.lazy(() => import("./pages/EditObjectProperties"));
const EditObjectTablePage = React.lazy(() => import("./pages/EditObjectTablePage"));

interface IEditObjectMainProps {
  selectItem: number;
}

export const EditObjectMain: React.FC<IEditObjectMainProps> = ({
  selectItem,
}) => {
  //================ВКЛАДКА ПАРАМЕТРОВ===================
  const [params, setParams] = useState<Array<TParam>>([]);
  const [visibleAddParamForm, setVisibleAddParamForm] = useState<boolean>(false);
  const [selectedParamId, setSelectedParamId] = useState<string>("");
  
  //процедура добавления параметра
  const onClickAddParam = () => setVisibleAddParamForm(true);


  //================ВКЛАДКА ПОЛЕЙ===================
  const [fields, setFields] = useState<Array<TField>>([]);
  const [visibleAddFieldForm, setVisibleAddFieldForm] = useState<boolean>(false);
  const [selectedFieldId, setSelectedFieldId] = useState<string>("");

  //процедура добавления поля
  const onClickAddField = () => setVisibleAddFieldForm(true);

  //процедура удаления поля
  const onClickRemove = () => {
    let copyFieldList = fields.filter((field: TField) => {
      return field.id !== selectedFieldId;
    });
    setFields([...copyFieldList]);
    setSelectedFieldId("");
  };

  //================ВКЛАДКА ИНДЕКСОВ===================
  const [indexes, setIndexes] = useState<Array<TIndex>>([]);
  const [visibleAddIndexForm, setVisibleAddIndexForm] = useState<boolean>(false);
  const [selectedIndexId, setSelectedIndexId] = useState<string>("");

  //процедура добавления поля
  const onClickAddIndex = () => setVisibleAddIndexForm(true);


  switch (selectItem) {
    //Базовая информация
    case 1:
      return <EditObjectBaseInfo />;

    //Страница параметров 
    case 2:
      return (
        <EditObjectTablePage
          itemList={params}
          setItemList={setParams}
          headerNames={["Наименование", "Идентификатор", "Тип данных"]}
          pageName="Параметры объекта"
          info="Задайте, если необходимо, список параметров объекта, они позволяют динамически менять его содержание."
          tableTitle="Список параметров"
          type="param"
          addFormState={[visibleAddParamForm, setVisibleAddParamForm]} 
          selectItemState={[selectedParamId, setSelectedParamId]} 
          onClickAdd={onClickAddParam}
          onClickRemove={() => {}}
        />
      );
    //Страница свойств  
    case 3:
      return <EditObjectProperties />;
      
    //Страница полей  
    case 4:
      return (
        <EditObjectTablePage
          itemList={fields}
          setItemList={setFields}
          headerNames={[
            "Наименование",
            "Идентификатор",
            "Тип поля",
            "Пустые значения",
          ]}
          pageName="Поля таблицы"
          info="Задайте список полей таблицы. Для создания полей нажмите кнопку Добавить."
          tableTitle="Список полей"
          type="field"
          addFormState={[visibleAddFieldForm, setVisibleAddFieldForm]}
          selectItemState={[selectedFieldId, setSelectedFieldId]}
          onClickAdd={onClickAddField}
          onClickRemove={onClickRemove}
        />
      );

    //Страница индексов  
    case 5:
      return (
        <EditObjectTablePage
          itemList={indexes}
          setItemList={setIndexes}
          headerNames={[
            "Наименование",
            "Идентификатор",
            "Тип индекса",
            "Поля индекса",
          ]}
          pageName="Индексы таблицы"
          info="Задайте, если необходимо, список индексов таблицы. Индексы обеспечивают быстрый поиск и выборку значений по индексированным полям"
          tableTitle="Список индексов"
          type="index"
          addFormState={[visibleAddIndexForm, setVisibleAddIndexForm]}
          selectItemState={[selectedIndexId, setSelectedIndexId] }
          onClickAdd={onClickAddIndex}
          onClickRemove={onClickRemove}
        />
      );
  }
  return null;
};
