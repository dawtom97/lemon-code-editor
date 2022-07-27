import { ActionProps } from "../actions";
import { ActionType } from "../action-types";
import { Cell } from "../cell";

interface ICell {
    loading: boolean;
    error: string | null;
    order: string[];
    data: {
        [key: string]: Cell
    }
}

const initialState: ICell = {
    loading: false,
    error: null,
    order: [],
    data: {}
}

export const cellsReducer = (state: ICell = initialState, action: ActionProps): ICell => {
    switch (action.type) {
        case ActionType.UPDATE_CELL:
            const {id,content} = action.payload;
            return {
                ...state,
                data:{
                    ...state.data,
                    [id]: {
                        ...state.data[id],
                        content
                    }
                }
            };
        case ActionType.DELETE_CELL:
            return state;
        case ActionType.MOVE_CELL:
            return state;
        case ActionType.INSERT_CELL_BEFORE:
            return state;
        default:
            return state;
    }
}