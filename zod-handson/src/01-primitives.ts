import { z } from "zod";

// --- 文字列スキーマ ---
const nameSchema = z.string();

console.log(nameSchema.parse("Taro")); // ✅ "Taro"
// console.log(nameSchema.parse(123));        // ❌ ZodError がスローされる

// --- 数値スキーマ ---
const ageSchema = z.number().int().min(0).max(150);

console.log(ageSchema.parse(25)); // ✅ 25
// console.log(ageSchema.parse(-1));          // ❌ ZodError

// --- 真偽値スキーマ ---
const isActiveSchema = z.boolean();

console.log(isActiveSchema.parse(true)); // ✅ true

// --- safeParse: エラーをスローせずに結果を取得 ---
const result = ageSchema.safeParse("not a number");
if (!result.success) {
  console.log("バリデーションエラー:", result.error.issues);
} else {
  console.log("値:", result.data);
}
