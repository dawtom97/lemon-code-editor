import MonacoEditor from "@monaco-editor/react";

interface ICodeEditor {
  initialValue:string;
}

export const CodeEditor:React.FC<ICodeEditor> = ({initialValue}) => {
  return (
    <MonacoEditor
      theme="dark"
      value={initialValue}
      language="javascript"
      height={"300px"}
      options={{
        wordWrap: "on",
        minimap: { enabled: false },
        showUnused: false,
        folding: false,
        lineNumbersMinChars: 3,
        fontSize: 16,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
    />
  );
};
