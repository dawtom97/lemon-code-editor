import "bulmaswatch/superhero/bulmaswatch.min.css";
import { useEffect, useState } from "react";
import { CodeEditor } from "../components/CodeEditor";
import { Preview } from "../components/Preview";
import {bundle} from "../bundler";
import { Resizable } from "./Resizable";
import { Cell } from "../state";
import { useActions } from "../hooks/useActions";


interface ICodeCell {
  cell: Cell
}

export const CodeCell:React.FC<ICodeCell> = ({cell}) => {
  const [input, setInput] = useState("");
  const [err,setErr] = useState('');
  const [code, setCode] = useState("");
  const {updateCell} = useActions();

  useEffect(() => {
    // debouncer
    const timer = setTimeout(async ()=>{
      const output = await bundle(cell.content);
      setCode(output.code);
      setErr(output.err);
    },1000);
    return () => {
      clearTimeout(timer);
    };
  }, [cell.content])
  

  return (
    <Resizable direction="vertical">
    <div style={{height:'100%', display:'flex', flexDirection:'row'}}>
      <Resizable direction="horizontal">
      <CodeEditor
        initialValue={cell.content}
        onChange={(value) => updateCell(cell.id,value)}
      />
      </Resizable>
      <Preview code={code} err={err}/>
    </div>
    </Resizable>
  );
};
