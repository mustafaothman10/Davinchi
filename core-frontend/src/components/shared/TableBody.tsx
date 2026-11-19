import type { Key, ReactNode } from "react";

type TableColumn = {
  key: string;
  header?: ReactNode;
};

type TableBodyProps = {
  columns: TableColumn[];
  rows: Record<string, unknown>[];
  getRowKey?: (row: Record<string, unknown>, index: number) => Key;
  renderCell?: (
    value: unknown,
    row: Record<string, unknown>,
    column: TableColumn,
  ) => ReactNode;
  emptyMessage?: ReactNode;
};

const TableBody = ({
  columns,
  rows,
  getRowKey,
  renderCell,
  emptyMessage = "No data available",
}: TableBodyProps) => {
  if (rows.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={columns.length || 1}>{emptyMessage}</td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
      {rows.map((row, rowIndex) => {
        const key = getRowKey?.(row, rowIndex) ?? rowIndex;

        return (
          <tr key={key}>
            {columns.map((column) => (
              <td key={column.key}>
                {renderCell
                  ? renderCell(row[column.key], row, column)
                  : (row[column.key] as ReactNode)}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
