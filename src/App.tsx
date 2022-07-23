import * as esbuild from "esbuild-wasm";
import { useEffect, useState, useRef } from "react";

export const App = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const ref = useRef<any>();

  useEffect(()=>{
   startService();
  },[])

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "/esbuild.wasm",
    });
    
  };

  const handleClick = async () => {
    if(!ref.current) return;
    const result = await ref.current.transform(input,{
        loader: 'jsx',
        target: 'es2015'
    });
    setCode(result.code);
  };

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={handleClick}>Submit</button>
      </div>

      <pre>{code}</pre>
    </div>
  );
};
