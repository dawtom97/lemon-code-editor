import '@fortawesome/fontawesome-free/css/all.min.css';
import { Provider } from "react-redux";
import { CellList } from "./components/CellList/CellList";
import { store } from "./state";

export const App = () => {
  return (
    <Provider store={store}>
      <div>
        <CellList/>
      </div>
    </Provider>
  );
};
