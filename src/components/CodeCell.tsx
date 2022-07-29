import "bulmaswatch/superhero/bulmaswatch.min.css";
import { useEffect } from "react";
import { CodeEditor } from "../components/CodeEditor";
import { Preview } from "../components/Preview";
import { Resizable } from "./Resizable";
import { Cell } from "../state";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";

interface ICodeCell {
  cell: Cell;
}

export const CodeCell: React.FC<ICodeCell> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state:any)=> state.bundles[cell.id]);
  console.log(bundle)

  useEffect(() => {
    // debouncer
    const timer = setTimeout(async () => {
      createBundle(cell.id, cell.content);
    }, 750);
    return () => {
      clearTimeout(timer);
    };
  }, [cell.content, cell.id]);

  return (
    <Resizable direction="vertical">
      <div
        style={{
          height: "calc(100% - 10px)",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        {/* <Preview code={code} err={err} /> */}
      </div>
    </Resizable>
  );
};
