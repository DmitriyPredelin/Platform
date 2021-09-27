import React from "react";
import { INode } from "common/interfaces";
import { TreeNode } from "./TreeNode";

interface ITreeProps {
  treeData: Array<INode>;
  clickHandler: any;
  selectedItem: number;
}

export const Tree: React.FC<ITreeProps> = React.memo(
  ({ treeData, clickHandler, selectedItem }) => {
    if (!treeData) {
      return null;
    }

    return (
      <ul className="object-tree">
        {treeData.map((node: INode) => (
          <TreeNode
            key={node.KEY}
            node={node}
            clickHandler={clickHandler}
            selectedItem={selectedItem}
          />
        ))}
      </ul>
    );
  }
);
