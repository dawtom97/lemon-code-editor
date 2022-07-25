import * as esbuild from "esbuild-wasm";
import { useEffect, useState, useRef } from "react";
import { CodeEditor } from "./components/CodeEditor";
import { fetchPlugin } from "./plugins/fetch-plugin";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";

export const App = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");
  const ref = useRef<any>();
  const iframe = useRef<any>();

  useEffect(() => {
    startService();
  }, []);

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  };

  const handleClick = async () => {
    if (!ref.current) return;

    // TUTAJ COS NIE TAK
   // iframe.current.srcdoc = html;

    const result = await ref.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });

   // setCode(result.outputFiles[0].text);
   iframe.current.contentWindow.postMessage(result.outputFiles[0].text, '*');
  };

  const html = 
  `
    <html>
      <head></head>
      <body>
         <div id="root"></div>
         <script>
            window.addEventListener('message', (e)=>{
                try{
                eval(e.data);
                } catch (err) {
                   const root = document.querySelector('#root');
                   root.innerHTML = '<div style="color:red;"><h4>Runtime error</h4>' + err +'</div>';
                   console.log(err);
                }
            },false);  
         </script>
      </body>
    </html>
  `

  return (
    <div>
      <CodeEditor initialValue="const lemon = 'bay'"/>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button onClick={handleClick}>Submit</button>
      </div>

      <iframe title="preview" ref={iframe} sandbox='allow-scripts' srcDoc={html}></iframe>

    </div>
  );
};

