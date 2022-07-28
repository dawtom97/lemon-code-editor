import React from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { Cell } from "../state/cell";
import { CellListItem } from "./CellListItem";

export const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells: { order, data } }: any) =>
    order.map((id: any) => data[id])
  );

  const renderedCells = cells.map((cell: Cell) => <CellListItem key={cell.id} cell={cell}/>)

  return <div>{renderedCells}</div>;
};
