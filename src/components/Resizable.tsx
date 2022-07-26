import { useEffect, useState } from "react";
import { ResizableBox, ResizableBoxProps } from "react-resizable";
import "./Resizable.css";

interface IResizable {
  direction: "horizontal" | "vertical";
}

export const Resizable: React.FC<IResizable> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;
  const [innerHeight, setInnerHeight] = useState(window.innerHeight);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  const [width, setWidth] = useState(window.innerWidth*0.75);

  useEffect(() => {
    let timer:any;
    const listener = () => {
      if(timer) clearTimeout(timer);
      timer = setTimeout(()=>{
        setInnerWidth(window.innerWidth);
        setInnerHeight(window.innerHeight);
        if(window.innerWidth*0.75 < width) {
          setWidth(window.innerWidth * 0.75);
        }
      },100)
    };

    window.addEventListener('resize', listener);

    return () => {
      window.removeEventListener('resize',listener)
    }

  }, [width]);

  if (direction === "horizontal") {
    resizableProps = {
      className: "resize-horizontal",
      minConstraints: [innerWidth * 0.2, Infinity],
      maxConstraints: [innerWidth * 0.75, Infinity],
      height: Infinity,
      width: width,
      resizeHandles: ["e"],
      onResizeStop:(e,data)=>{
       setWidth(data.size.width);
      }
    };
  } else {
    resizableProps = {
      minConstraints: [Infinity, 100],
      maxConstraints: [Infinity, innerHeight * 0.9],
      height: 300,
      width: Infinity,
      resizeHandles: ["s"],
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};
