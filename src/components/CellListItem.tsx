import React from 'react';
import { Cell } from '../state';
import { CodeCell } from './CodeCell';
import { TextEditor } from './TextEditor';

interface ICellListItem {
  cell: Cell
}

export const CellListItem:React.FC<ICellListItem> = ({cell}) => {

    let child: JSX.Element;
    if(cell.type ==='code') {
        child = <CodeCell cell={cell}/>
    } else {
        child = <TextEditor cell={cell}/>
    }
  return (
    <div>{child}</div>
  )
}