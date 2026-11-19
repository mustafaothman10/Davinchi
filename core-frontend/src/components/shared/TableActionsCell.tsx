import type { FC } from "react";

export interface TableActionsProps {
  className?: string;
}

const TableActions: FC<TableActionsProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center justify-end gap-2 ${className}`.trim()}>
      <td></td>
    </div>
  );
};

export default TableActions;
