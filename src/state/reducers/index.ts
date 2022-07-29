import { cellsReducer } from "./cellsReducer";
import { combineReducers } from "redux";
import { bundlesReducer } from "./bundlesReducer";

export const reducers = combineReducers({
    cells: cellsReducer,
    bundles: bundlesReducer
})

export type RootState = ReturnType<typeof reducers>