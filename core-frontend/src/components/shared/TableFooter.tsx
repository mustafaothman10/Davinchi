import type { FC } from "react";

export interface TableFooterProps {
	page: number;
	pageSize: number;
	totalItems: number;
	onPageChange: (page: number) => void;
	className?: string;
}

const TableFooter: FC<TableFooterProps> = ({
	page,
	pageSize,
	totalItems,
	onPageChange,
	className = "",
}) => {
	const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
	const currentPage = Math.min(Math.max(1, page), totalPages);
	const firstItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
	const lastItem = Math.min(currentPage * pageSize, totalItems);

	return (
		<div
			className={`flex items-center justify-between border-t px-4 py-3 ${className}`.trim()}
		>
			<p className="text-sm text-gray-600">
				Showing <span className="font-medium">{firstItem}</span> to{" "}
				<span className="font-medium">{lastItem}</span> of{" "}
				<span className="font-medium">{totalItems}</span> results
			</p>

			<nav aria-label="Table pagination" className="flex items-center gap-2">
				<button
					type="button"
					onClick={() => onPageChange(currentPage - 1)}
					disabled={currentPage <= 1}
					className="rounded border px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-50"
				>
					Previous
				</button>
				<span className="text-sm text-gray-600">
					Page {currentPage} of {totalPages}
				</span>
				<button
					type="button"
					onClick={() => onPageChange(currentPage + 1)}
					disabled={currentPage >= totalPages}
					className="rounded border px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-50"
				>
					Next
				</button>
			</nav>
		</div>
	);
};

export default TableFooter;
