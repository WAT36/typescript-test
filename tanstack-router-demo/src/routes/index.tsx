import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div>
      <h1>🎉 TanStack Router デモへようこそ！</h1>
      <p>このサイトでTanStack Routerの基本的な使い方を学びましょう。</p>
    </div>
  );
}
