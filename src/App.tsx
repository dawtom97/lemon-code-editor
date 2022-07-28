import { Provider } from "react-redux";
import { CellList } from "./components/CellList";
import { CodeCell } from "./components/CodeCell";
import { TextEditor } from "./components/TextEditor";
import { store } from "./state";

export const App = () => {
  return (
    <Provider store={store}>
      <div>

        {/* <CodeCell /> */}
        {/* <TextEditor /> */}
        <CellList/>
      </div>
    </Provider>
  );
};
