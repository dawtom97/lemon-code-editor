import "bulmaswatch/superhero/bulmaswatch.min.css";
import { useEffect, useState } from "react";
import { CodeEditor } from "../components/CodeEditor";
import { Preview } from "../components/Preview";
import {bundle} from "../bundler";
import { Resizable } from "./Resizable";

export const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    // debouncer
    const timer = setTimeout(async ()=>{
      const output = await bundle(input);
      setCode(output);
    },1000);
    return () => {
      clearTimeout(timer);
    };
  }, [input])
  

  return (
    <Resizable direction="vertical">
    <div style={{height:'100%', display:'flex', flexDirection:'row'}}>
      <Resizable direction="horizontal">
      <CodeEditor
        initialValue="const lemon = 'bay'"
        onChange={(value) => setInput(value)}
      />
      </Resizable>
      <Preview code={code} />
    </div>
    </Resizable>
  );
};
