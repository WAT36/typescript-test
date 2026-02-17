import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <nav
        style={{
          padding: "1rem",
          borderBottom: "1px solid #ccc",
          display: "flex",
          gap: "1rem",
        }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          🏠 ホーム
        </Link>
        <Link to="/about" style={{ textDecoration: "none" }}>
          📖 About
        </Link>
        <Link to="/posts" style={{ textDecoration: "none" }}>
          📝 記事一覧
        </Link>
      </nav>
      <main style={{ padding: "1rem" }}>
        <Outlet />
      </main>
      <TanStackRouterDevtools />
    </>
  ),
});
