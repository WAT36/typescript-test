import { z } from "zod";

// --- refine: カスタムバリデーション ---
const PasswordSchema = z
  .string()
  .min(8, "8文字以上で入力してください")
  .refine((val) => /[A-Z]/.test(val), {
    message: "大文字を1文字以上含めてください",
  })
  .refine((val) => /[0-9]/.test(val), {
    message: "数字を1文字以上含めてください",
  });

console.log(PasswordSchema.safeParse("weakpass"));
// → { success: false, error: ... }

console.log(PasswordSchema.safeParse("Strong1Pass"));
// → { success: true, data: "Strong1Pass" }

// --- transform: パース時にデータを変換 ---
const TrimmedLowerEmail = z
  .string()
  .email()
  .transform((val) => val.trim().toLowerCase());

console.log(TrimmedLowerEmail.parse("  TARO@Example.COM  "));
// → "taro@example.com"

// --- superRefine: 複数フィールドにまたがるバリデーション ---
const SignupSchema = z
  .object({
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "パスワードが一致しません",
        path: ["confirmPassword"],
      });
    }
  });

const signupResult = SignupSchema.safeParse({
  password: "MySecret123",
  confirmPassword: "Different456",
});

if (!signupResult.success) {
  console.log("❌", signupResult.error.issues[0].message);
  // → "パスワードが一致しません"
}
