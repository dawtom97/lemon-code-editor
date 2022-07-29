import { ActionType } from "../action-types";
import { IDeleteCellAction, IInsertCellAfterAction, IUpdateCellAction, IMoveCellAction, DirectionProps } from "../actions";
import { CellProps } from '../cell'

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