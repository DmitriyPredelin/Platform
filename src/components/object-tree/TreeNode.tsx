import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { INode, NodeStyle } from "common/interfaces";
import { setDisableButton } from "redux/menuReducer";
import { AppDispatch } from "redux/store";
import { Tree } from "./Tree";

interface ExpanderProps {
  hasChild: boolean;
  childVisible: boolean;
  setChildVisiblity: React.Dispatch<React.SetStateAction<boolean>>;
}

interface ITreeNodeProps {
  node: INode;
  clickHandler: any;
  selectedItem: number;
}

//компонент Экспандер
const Expander: React.FC<ExpanderProps> = ({
  hasChild,
  childVisible,
  setChildVisiblity,
}) => {
  const clickOnExpand = () => {
    setChildVisiblity((prev) => !prev);
  };

  if (hasChild && childVisible) {
    return (
      <span className="material-icons-outlined icon" onClick={clickOnExpand}>
        indeterminate_check_box
      </span>
    );
  }

  if (hasChild) {
    return (
      <span className="material-icons-outlined icon" onClick={clickOnExpand}>
        add_box
      </span>
    );
  }
  return null;
};

export const TreeNode: React.FC<ITreeNodeProps> = ({
  node,
  clickHandler,
  selectedItem,
}) => {
  const classNames = require("classnames");
  const [childVisible, setChildVisiblity] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  const hasChild = node.children.length > 0;

  const style: string = classNames(
    "item",
    { "clicked-item": selectedItem === node.KEY },
    { "dotted-item": node.style === NodeStyle.dotted }
  );
  const clickNodeHandler = (key: number) => {
    dispatch(setDisableButton({ pid: 10, disable: true }));
    clickHandler(key);
  };

  return (
    <li className={`tree-node ${!hasChild ? "margined" : ""}`}>
      <div className="tree-object-item">
        <Expander
          hasChild={hasChild}
          childVisible={childVisible}
          setChildVisiblity={setChildVisiblity}
        />
        <div className={style} onClick={() => clickNodeHandler(node.KEY)}>
          {hasChild && childVisible ? (
            <span className="material-icons folder">folder_open</span>
          ) : (
            <span className="material-icons folder">folder</span>
          )}
          {node.NAME}
        </div>
      </div>

      {hasChild && childVisible && (
        <div className="child-tree">
          <ul className="child-tree">
            <Tree
              treeData={node.children}
              clickHandler={clickHandler}
              selectedItem={selectedItem}
            />
          </ul>
        </div>
      )}
    </li>
  );
};
