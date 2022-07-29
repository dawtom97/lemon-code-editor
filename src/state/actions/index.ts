import { ActionType } from "../action-types";
import {CellProps} from '../cell';

export type DirectionProps = 'up' | 'down'

export interface IMoveCellAction {
    type: ActionType.MOVE_CELL;
    payload: {
        id: string;
        direction: DirectionProps;
    }
}

export interface IDeleteCellAction {
    type: ActionType.DELETE_CELL;
    payload: string;
}

export interface IInsertCellAfterAction {
    type: ActionType.INSERT_CELL_AFTER;
    payload: {
        id: string | null;
        type: CellProps;
    }
}

export interface IUpdateCellAction {
    type: ActionType.UPDATE_CELL;
    payload: {
        id: string;
        content: string;
    }
}

export type ActionProps = IMoveCellAction | IDeleteCellAction | IInsertCellAfterAction | IUpdateCellAction;