import MDEditor from "@uiw/react-md-editor";
import { useState, useEffect, useRef } from "react";
import { useActions } from "../hooks/useActions";
import { Cell } from "../state";
import './TextEditor.css'

interface ITextEditor {
  cell: Cell
}

export const TextEditor: React.FC<ITextEditor> = ({cell}) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const [editing, setEditing] = useState(false);
  const {updateCell} = useActions();

  useEffect(() => {
    const listener = (e:MouseEvent) => {
      if(ref.current && e.target && ref.current.contains(e.target as Node)) {
         return;
      }
      setEditing(false);
    };

    document.addEventListener("click", listener, { capture: true });

    return () => {
      document.removeEventListener("click", listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div className="text-editor" ref={ref}>
        <MDEditor value={cell.content} onChange={(v)=>updateCell(cell.id, v || '')}/>
      </div>
    );
  }

  return (
    <div className="text-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
          <MDEditor.Markdown source={cell.content || 'Click to Edit'} />
      </div>
    </div>
  );
};
