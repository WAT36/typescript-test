import { z } from "zod";

// ユーザースキーマの定義
const UserSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1, "名前は必須です"),
  email: z.string().email("有効なメールアドレスを入力してください"),
  age: z.number().int().min(0).optional(), // 任意項目
  role: z.enum(["admin", "editor", "viewer"]), // 列挙型
  createdAt: z.string().datetime(), // ISO 8601 形式
});

// スキーマから TypeScript の型を自動推論 🎉
type User = z.infer<typeof UserSchema>;
// ↓ 推論結果:
// type User = {
//   id: number;
//   name: string;
//   email: string;
//   age?: number | undefined;
//   role: "admin" | "editor" | "viewer";
//   createdAt: string;
// }

// --- 正常系 ---
const validUser: unknown = {
  id: 1,
  name: "田中太郎",
  email: "taro@example.com",
  role: "admin",
  createdAt: "2026-03-23T10:00:00Z",
};

const parsed = UserSchema.parse(validUser);
console.log("✅ パース成功:", parsed);

// --- 異常系 ---
const invalidUser: unknown = {
  id: -1,
  name: "",
  email: "not-an-email",
  role: "superadmin",
  createdAt: "yesterday",
};

const result = UserSchema.safeParse(invalidUser);
if (!result.success) {
  console.log("❌ バリデーションエラー一覧:");
  result.error.issues.forEach((issue) => {
    console.log(`  [${issue.path.join(".")}] ${issue.message}`);
  });
}
