export type CellProps = 'code' | 'text'

export interface Cell {
    id:string;
    type: CellProps;
    content: string;
}



