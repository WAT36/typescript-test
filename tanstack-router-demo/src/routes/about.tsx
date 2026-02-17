import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <h1>📖 About</h1>
      <p>TanStack Routerは、型安全なルーティングを提供するライブラリです。</p>
      <h2>主な特徴</h2>
      <ul>
        <li>TypeScriptファースト設計</li>
        <li>ファイルベースルーティング</li>
        <li>組み込みのデータローディング</li>
      </ul>
    </div>
  );
}
