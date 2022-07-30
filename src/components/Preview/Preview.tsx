import { useEffect, useRef } from "react";
import "./Preview.css";

interface IPreview {
  code: string;
  err: string;
}

const html = `
  <html>
    <head>
       
    </head>
    <body>
       <div id="root"></div>
       <script>

          const handleError = (err) => {
            const root = document.querySelector('#root');
            root.innerHTML = '<div style="color:red;"><h4>Runtime error</h4>' + err +'</div>';
            console.log(err);
          }

          window.addEventListener('error',(e)=>{
            e.preventDefault();
            handleError(e.error);
          })

          window.addEventListener('message', (e)=>{
              try{
                eval(e.data);
              } catch (err) {
                handleError(err);
              }
          },false);  
       </script>
    </body>
  </html>
`;

export const Preview: React.FC<IPreview> = ({ code, err }) => {
  const iframe = useRef<any>();
  useEffect(() => {
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        style={{ backgroundColor: "white" }}
        title="preview"
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
      />
      {err ? <div className="preview-error">{err}</div> : null}
    </div>
  );
};
