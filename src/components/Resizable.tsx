import { ResizableBox, ResizableBoxProps } from "react-resizable";
import "./Resizable.css";

interface IResizable {
  direction: "horizontal" | "vertical";
}

export const Resizable: React.FC<IResizable> = ({ direction, children }) => {
  let resizableProps: ResizableBoxProps;

  if (direction === "horizontal") {
    resizableProps = {
      minConstraints: [window.innerHeight * 0.2, Infinity],
      maxConstraints: [window.innerHeight * 0.75, Infinity],
      height: Infinity,
      width: window.innerWidth * 0.75,
      resizeHandles: ["e"],
    };
  } else {
    resizableProps = {
      minConstraints: [Infinity, 100],
      maxConstraints: [Infinity, window.innerHeight * 0.9],
      height: 300,
      width: Infinity,
      resizeHandles: ["s"],
    };
  }

  return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};
