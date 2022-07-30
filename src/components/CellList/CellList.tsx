import './CellList.css';
import React, { Fragment } from "react";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { Cell } from "../../state/cell";
import { AddCell } from "../AddCell/AddCell";
import { CellListItem } from "../CellListItem/CellListItem";

export const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }: any) =>
    order.map((id: any) => data[id])
  );

  const renderedCells = cells.map((cell: Cell) => (
    <Fragment key={cell.id}>
      <CellListItem key={cell.id} cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ));

  return (
    <div className='cell-wrapper'>
      <h1 className='app-title'>Lemon Code Editor</h1>
      <div className={cells.length === 0 ? "force-visible" : ""}>
        <AddCell previousCellId={null} />
      </div>
      {renderedCells}
    </div>
  );
};
