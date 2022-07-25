import "bulmaswatch/superhero/bulmaswatch.min.css";
import { useState } from "react";
import { CodeEditor } from "../components/CodeEditor";
import { Preview } from "../components/Preview";
import {bundle} from "../bundler";

export const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const handleClick = async () => {
    const output = await bundle(input);
    setCode(output);
  };

  return (
    <div>
      <CodeEditor
        initialValue="const lemon = 'bay'"
        onChange={(value) => setInput(value)}
      />
      <div>
        <button onClick={handleClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};
