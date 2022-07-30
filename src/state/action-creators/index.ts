import { ActionType } from "../action-types";
import { IDeleteCellAction, IInsertCellAfterAction, IUpdateCellAction, IMoveCellAction, DirectionProps, ActionProps } from "../actions";
import { CellProps } from '../cell'
import { Dispatch } from "redux";
import { bundle } from "../../bundler";

export const updateCell = (id: string, content: string): IUpdateCellAction => {
    return {
        type: ActionType.UPDATE_CELL,
        payload: {
            id,
            content
        }
    }
};

export const deleteCell = (id: string): IDeleteCellAction => {
    return {
        type: ActionType.DELETE_CELL,
        payload: id
    }
};

export const moveCell = (id: string, direction: DirectionProps): IMoveCellAction => {
    return {
        type: ActionType.MOVE_CELL,
        payload: {
            id,
            direction
        }
    }
};

export const insertCellAfter = (id: string | null, cellType: CellProps): IInsertCellAfterAction => {
    return {
        type: ActionType.INSERT_CELL_AFTER,
        payload: {
            id,
            type: cellType
        }
    }
};

export const createBundle = (cellId: string, input:string) => {
    return async (dispatch: Dispatch<ActionProps>) => {
        dispatch({
            type:ActionType.BUNDLE_START,
            payload: {
                cellId
            }
        });

        const result = await bundle(input);
        dispatch({
            type:ActionType.BUNDLE_COMPLETE,
            payload: {
                cellId,
                bundle:result
            }
        })
    }
  }