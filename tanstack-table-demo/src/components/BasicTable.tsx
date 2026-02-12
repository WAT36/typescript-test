import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import type { User } from "../data/users";

interface BasicTableProps {
  data: User[];
}

// 列ヘルパーを作成（型安全な列定義のため）
const columnHelper = createColumnHelper<User>();

// 列定義
const columns = [
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
      return statusMap[status];
    },
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
      return roleMap[role];
    },
  }),
  columnHelper.accessor("createdAt", {
    header: "登録日",
    cell: (info) => info.getValue(),
  }),
];

function BasicTable({ data }: BasicTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="table-container">
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BasicTable;
