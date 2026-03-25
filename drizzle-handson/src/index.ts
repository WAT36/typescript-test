import { eq, like, and, desc, count } from "drizzle-orm";
import { db } from "./db/index.js";
import { users, posts } from "./db/schema.js";

async function main() {
  // ============================================
  // CREATE: ユーザーの作成
  // ============================================
  console.log("--- CREATE: ユーザー作成 ---");

  const [alice] = await db
    .insert(users)
    .values({
      name: "Alice",
      email: "alice@example.com",
    })
    .returning();

  const [bob] = await db
    .insert(users)
    .values({
      name: "Bob",
      email: "bob@example.com",
    })
    .returning();

  console.log("Created:", alice, bob);

  // 複数レコードを一括挿入
  const newUsers = await db
    .insert(users)
    .values([
      { name: "Charlie", email: "charlie@example.com" },
      { name: "Diana", email: "diana@example.com" },
    ])
    .returning();

  console.log("Bulk created:", newUsers);

  // ============================================
  // CREATE: 投稿の作成
  // ============================================
  console.log("\n--- CREATE: 投稿作成 ---");

  const [post1] = await db
    .insert(posts)
    .values({
      title: "Drizzle入門",
      content: "Drizzle ORMは軽量で型安全なORMです。",
      authorId: alice.id,
      published: true,
    })
    .returning();

  await db.insert(posts).values([
    {
      title: "TypeScriptの型システム",
      content: "TypeScriptの型システムについて解説します。",
      authorId: alice.id,
      published: true,
    },
    {
      title: "下書き記事",
      content: "この記事はまだ公開されていません。",
      authorId: bob.id,
      published: false,
    },
  ]);

  console.log("Post created:", post1);

  // ============================================
  // READ: 全件取得
  // ============================================
  console.log("\n--- READ: 全件取得 ---");

  const allUsers = await db.select().from(users);
  console.log("All users:", allUsers);

  // ============================================
  // READ: 条件付き取得（WHERE）
  // ============================================
  console.log("\n--- READ: 条件付き取得 ---");

  const activeUsers = await db
    .select()
    .from(users)
    .where(eq(users.isActive, true));
  console.log("Active users:", activeUsers);

  // LIKE 検索
  const aliceSearch = await db
    .select()
    .from(users)
    .where(like(users.name, "%Ali%"));
  console.log("Search result:", aliceSearch);

  // 複数条件（AND）
  const filtered = await db
    .select()
    .from(users)
    .where(and(eq(users.isActive, true), like(users.email, "%example.com")));
  console.log("Filtered:", filtered);

  // ============================================
  // READ: 特定カラムのみ取得
  // ============================================
  console.log("\n--- READ: 特定カラム取得 ---");

  const userNames = await db
    .select({
      id: users.id,
      name: users.name,
    })
    .from(users);
  console.log("User names:", userNames);

  // ============================================
  // READ: ORDER BY / LIMIT / OFFSET
  // ============================================
  console.log("\n--- READ: ソート & ページング ---");

  const sortedUsers = await db
    .select()
    .from(users)
    .orderBy(desc(users.createdAt))
    .limit(2)
    .offset(0);
  console.log("Sorted (page 1):", sortedUsers);

  // ============================================
  // READ: 集計（COUNT）
  // ============================================
  console.log("\n--- READ: 集計 ---");

  const [userCount] = await db.select({ count: count() }).from(users);
  console.log("User count:", userCount);

  // ============================================
  // UPDATE
  // ============================================
  console.log("\n--- UPDATE ---");

  const [updatedAlice] = await db
    .update(users)
    .set({ name: "Alice Updated" })
    .where(eq(users.id, alice.id))
    .returning();
  console.log("Updated:", updatedAlice);

  // ============================================
  // DELETE
  // ============================================
  console.log("\n--- DELETE ---");

  // まず Diana の投稿がないことを確認してから削除
  const [deletedUser] = await db
    .delete(users)
    .where(eq(users.email, "diana@example.com"))
    .returning();
  console.log("Deleted:", deletedUser);

  // 最終確認
  console.log("\n--- 最終状態 ---");
  const finalUsers = await db.select().from(users);
  console.log("Final users:", finalUsers);

  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
