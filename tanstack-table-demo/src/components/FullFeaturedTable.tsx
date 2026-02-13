import { useState, useMemo } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
  type SortingState,
  type ColumnFiltersState,
  type PaginationState,
  type RowSelectionState,
  type VisibilityState,
} from "@tanstack/react-table";
import type { User } from "../data/users";

interface FullFeaturedTableProps {
  data: User[];
  onEdit?: (user: User) => void;
  onDelete?: (user: User) => void;
}

const columnHelper = createColumnHelper<User>();

function FullFeaturedTable({ data, onEdit, onDelete }: FullFeaturedTableProps) {
  // 状態管理
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [showColumnMenu, setShowColumnMenu] = useState(false);

  // 列定義
  const columns = useMemo(
    () => [
      // 選択チェックボックス列
      {
        id: "select",
        header: ({ table }: any) => (
          <input
            type="checkbox"
            className="checkbox"
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }: any) => (
          <input
            type="checkbox"
            className="checkbox"
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      columnHelper.accessor("id", {
        header: "ID",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor((row) => `${row.lastName} ${row.firstName}`, {
        id: "fullName",
        header: "氏名",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("email", {
        header: "メールアドレス",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("age", {
        header: "年齢",
        cell: (info) => `${info.getValue()}歳`,
      }),
      columnHelper.accessor("status", {
        header: "ステータス",
        cell: (info) => {
          const status = info.getValue();
          const statusMap = {
            active: "有効",
            inactive: "無効",
            pending: "保留中",
          };
          const statusClass = `status-badge status-${status}`;
          return <span className={statusClass}>{statusMap[status]}</span>;
        },
        filterFn: "equals",
      }),
      columnHelper.accessor("role", {
        header: "権限",
        cell: (info) => {
          const role = info.getValue();
          const roleMap = {
            admin: "管理者",
            user: "ユーザー",
            guest: "ゲスト",
          };
          const roleClass = `role-badge role-${role}`;
          return <span className={roleClass}>{roleMap[role]}</span>;
        },
        filterFn: "equals",
      }),
      columnHelper.accessor("createdAt", {
        header: "登録日",
        cell: (info) => info.getValue(),
      }),
      // アクション列
      {
        id: "actions",
        header: "操作",
        cell: ({ row }: any) => (
          <div className="action-buttons">
            <button
              className="btn btn-edit"
              onClick={() => onEdit?.(row.original)}
            >
              編集
            </button>
            <button
              className="btn btn-delete"
              onClick={() => onDelete?.(row.original)}
            >
              削除
            </button>
          </div>
        ),
        enableSorting: false,
        enableHiding: false,
      },
    ],
    [onEdit, onDelete],
  );

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      pagination,
      rowSelection,
      columnVisibility,
    },
    enableRowSelection: true,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const selectedRows = table.getFilteredSelectedRowModel().rows;

  const handleBulkDelete = () => {
    const selectedIds = selectedRows.map((row) => row.original.id);
    if (window.confirm(`${selectedIds.length}件のユーザーを削除しますか？`)) {
      alert(`削除対象ID: ${selectedIds.join(", ")}`);
      setRowSelection({});
    }
  };

  return (
    <div>
      {/* コントロールバー */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "1rem",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {/* グローバル検索 */}
        <input
          type="text"
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="検索..."
          style={{
            padding: "0.5rem 1rem",
            border: "1px solid #dee2e6",
            borderRadius: "4px",
            fontSize: "1rem",
            minWidth: "200px",
          }}
        />

        {/* ステータスフィルター */}
        <select
          value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table
              .getColumn("status")
              ?.setFilterValue(e.target.value || undefined)
          }
          className="page-size-select"
        >
          <option value="">すべてのステータス</option>
          <option value="active">有効</option>
          <option value="inactive">無効</option>
          <option value="pending">保留中</option>
        </select>

        {/* 権限フィルター */}
        <select
          value={(table.getColumn("role")?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn("role")?.setFilterValue(e.target.value || undefined)
          }
          className="page-size-select"
        >
          <option value="">すべての権限</option>
          <option value="admin">管理者</option>
          <option value="user">ユーザー</option>
          <option value="guest">ゲスト</option>
        </select>

        {/* フィルタークリア */}
        <button
          onClick={() => {
            setGlobalFilter("");
            setColumnFilters([]);
          }}
          className="btn"
          style={{ background: "#6c757d", color: "white" }}
        >
          クリア
        </button>

        {/* 列表示設定 */}
        <div style={{ position: "relative", marginLeft: "auto" }}>
          <button
            onClick={() => setShowColumnMenu(!showColumnMenu)}
            className="btn"
            style={{ background: "#007bff", color: "white" }}
          >
            列の表示 ▼
          </button>

          {showColumnMenu && (
            <div
              style={{
                position: "absolute",
                top: "100%",
                right: 0,
                marginTop: "0.5rem",
                padding: "1rem",
                background: "white",
                border: "1px solid #dee2e6",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                zIndex: 100,
                minWidth: "180px",
              }}
            >
              {table
                .getAllLeafColumns()
                .filter((column) => column.getCanHide())
                .map((column) => (
                  <label
                    key={column.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginBottom: "0.25rem",
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={column.getIsVisible()}
                      onChange={column.getToggleVisibilityHandler()}
                    />
                    {typeof column.columnDef.header === "string"
                      ? column.columnDef.header
                      : column.id}
                  </label>
                ))}
              <button
                onClick={() => setShowColumnMenu(false)}
                className="btn"
                style={{
                  marginTop: "0.5rem",
                  background: "#6c757d",
                  color: "white",
                  width: "100%",
                }}
              >
                閉じる
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 選択時の一括操作バー */}
      {selectedRows.length > 0 && (
        <div className="selection-bar">
          <span>{selectedRows.length} 件選択中</span>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button onClick={handleBulkDelete}>一括削除</button>
            <button
              onClick={() => setRowSelection({})}
              style={{ background: "#6c757d" }}
            >
              選択解除
            </button>
          </div>
        </div>
      )}

      {/* テーブル */}
      <div className="table-container">
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className={header.column.getCanSort() ? "sortable" : ""}
                    onClick={
                      header.column.getCanSort()
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                      {header.column.getCanSort() && (
                        <span className="sort-indicator">
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted() as string] ?? " ↕️"}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={table.getVisibleLeafColumns().length}
                  style={{ textAlign: "center", padding: "2rem" }}
                >
                  該当するデータがありません
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={row.getIsSelected() ? "row-selected" : ""}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ページネーション */}
      <div className="pagination">
        <div className="pagination-buttons">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </button>
        </div>

        <div className="pagination-info">
          ページ {table.getState().pagination.pageIndex + 1} /{" "}
          {table.getPageCount() || 1}
          （全 {table.getFilteredRowModel().rows.length} 件）
        </div>

        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
          className="page-size-select"
        >
          {[5, 10, 20, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              {pageSize}件表示
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default FullFeaturedTable;
