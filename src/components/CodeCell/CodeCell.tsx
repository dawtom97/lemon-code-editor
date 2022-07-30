import "bulmaswatch/superhero/bulmaswatch.min.css";
import "./CodeCell.css";
import { useEffect } from "react";
import { CodeEditor } from "../CodeEditor/CodeEditor";
import { Resizable } from "../Resizable/Resizable";
import { Cell } from "../../state";
import { useActions } from "../../hooks/useActions";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Preview } from "../Preview/Preview";
import { useCumulativeCode } from "../../hooks/useCumulativeCode";

interface ICodeCell {
  cell: Cell;
}

export const CodeCell: React.FC<ICodeCell> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state: any) => state.bundles[cell.id]);
  const cumulativeCode = useCumulativeCode(cell.id);


  console.log(cumulativeCode);

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode);
      return;
    }

    // debouncer
    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode);
    }, 750);
    return () => {
      clearTimeout(timer);
    };
  }, [cumulativeCode, cell.id, createBundle]);

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
