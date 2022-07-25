import { useEffect, useRef } from "react";

interface IPreview {
  code: string;
}

const html = `
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
`;

export const Preview: React.FC<IPreview> = ({ code }) => {
  const iframe = useRef<any>();
  useEffect(() => {
    iframe.current.srcdoc = html;
    iframe.current.contentWindow.postMessage(code, "*");
  }, [code]);
  return (
    <iframe
      title="preview"
      ref={iframe}
      sandbox="allow-scripts"
      srcDoc={html}
    />
  );
};
