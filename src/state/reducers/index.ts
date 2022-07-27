import { cellsReducer } from "./cellsReducer";
import { combineReducers } from "redux";

export const reducers = combineReducers({
    cells: cellsReducer
})

export type RootState = ReturnType<typeof reducers>