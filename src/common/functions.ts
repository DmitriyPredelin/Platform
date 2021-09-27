import { MetabaseObjectClass, MetabaseObjectNames } from "./enums";
import { INode } from "./interfaces";


/**
 * 
convertation tree(!) object to array
 */
export const remapObjectToArray = (
  destArray: INode[],
  sourceObject: INode[]
) => {
  sourceObject.forEach((node) => {
    destArray.push(node);
    destArray.concat(remapObjectToArray(destArray, node.children));
  });
  return destArray;
};

export const getObjectTypeName = (classId: number): string => {
  let text: string = "";
  Object.keys(MetabaseObjectClass).forEach((key: string) => {
    let pKey: number = parseInt(key);

    if (classId == pKey) {
      //console.log(classId, pKey)
      let objectName: string = MetabaseObjectClass[pKey];
      //console.log(classId, MetabaseObjectNames[objectName]);
      text = MetabaseObjectNames[objectName];
    }
  });
  return text;
};
