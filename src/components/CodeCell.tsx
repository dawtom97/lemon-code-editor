import "bulmaswatch/superhero/bulmaswatch.min.css";
import "./CodeCell.css";
import { useEffect } from "react";
import { CodeEditor } from "../components/CodeEditor";
import { Resizable } from "./Resizable";
import { Cell } from "../state";
import { useActions } from "../hooks/useActions";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { Preview } from "./Preview";

interface ICodeCell {
  cell: Cell;
}

export const CodeCell: React.FC<ICodeCell> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state: any) => state.bundles[cell.id]);
  const cumulativeCode = useTypedSelector((state: any) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id: string | number) => data[id]);

    const cumulativeCode = [];
    for (let c of orderedCells) {
      if (c.type === "code") {
        cumulativeCode.push(c.content);
      }
      if(c.id === cell.id) {
        break;
      }
    }
    return cumulativeCode;
  });

  console.log(cumulativeCode)

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode.join('\n'));
      return;
    }

    // debouncer
    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode.join('\n'));
    }, 750);
    return () => {
      clearTimeout(timer);
    };
  }, [cumulativeCode.join('\n'), cell.id, createBundle]);

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
        {!bundle || bundle.loading ? (
          <div className="progress-cover">
            <progress className="progress is-small is-primary" max="100">
              Loading
            </progress>
          </div>
        ) : (
          <Preview code={bundle.code} err={bundle.err} />
        )}
      </div>
    </Resizable>
  );
};
