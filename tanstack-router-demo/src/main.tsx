import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";

// 自動生成されるルートツリーをインポート
import { routeTree } from "./routeTree.gen";

// ルーターインスタンスを作成
const router = createRouter({ routeTree });

// 型安全のためのモジュール拡張
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
