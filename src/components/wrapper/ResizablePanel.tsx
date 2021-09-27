import React, { useRef, useState } from "react";
import "./wrapperStyles.scss";

interface IResizablePanelProps {
  size: number;
}

export const ResizablePanel = ({ children, size }: any) => {
  //const [startX, setStartX] = useState(0);
  //const [down, setDown] = useState(false);
  const [width, setWidth] = useState(300);
  //let startWidth : number = 300;

  let startWidth = 300;
  
  const handleMouseMove = useRef((e: any) => {
    setWidth(startWidth - startX.current + e.clientX);
  });

  
  const startX = useRef(0);
 
  
 /* const handleMouseMove = (e: any) => {
    console.log(startX)
    setWidth(startWidth - startX + e.clientX);
  };*/

  const handleMouseDown = (e: any) => {
    startX.current = e.pageX;
    //setStartX(pageX);
    
    document.addEventListener("mousemove", handleMouseMove.current);
  };

  const handleMouseUp = (e: any) => {
    //e.stopPropagation();
    
    document.removeEventListener("mousemove", handleMouseMove.current);
    console.log(startX.current)
    setWidth(startWidth - startX.current + e.clientX);
   // console.log(startWidth, startX.current, e.clientX);
    startWidth = width;
  };

  //style={{width: `calc(100% - ${this.state.panels[1]}px - ${this.state.panels[2]}px)`}}

  return (
    <div className="child" style={{ width: width }}>
      <div className="resize-panel">
        <div
          className="resize-marker-vertical"
          onMouseDown={(e) => handleMouseDown(e)}
          onMouseUp={handleMouseUp}
          
        ></div>
      </div>
    </div>
  );
};
/*onMouseMove={(e) => onMouseMoveHandler(e)} */

/*onMouseDown={(e) => onMouseDownHandler(e)}
          onMouseUp={(e) => onMouseUpHandler(e)}*/
