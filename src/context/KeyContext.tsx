import { createContext, useContext, useState } from "react";


export const KeyContext = createContext({
    key : 0,
    setKey : (a : any) => {},
});

export const KeyProvider = (props: any) => {
  const [key, setKey] = useState(0);
  return (
      //@ts-ignore
    <KeyContext.Provider value={{ key, setKey }}>
      {props.children}
    </KeyContext.Provider>
  );
};



export const useKeyProvider = () => useContext(KeyContext);
