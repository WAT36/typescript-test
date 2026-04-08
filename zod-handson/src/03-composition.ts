import { z } from "zod";

// 住所スキーマ
const AddressSchema = z.object({
  postalCode: z.string().regex(/^\d{3}-\d{4}$/, "例: 100-0001"),
  prefecture: z.string(),
  city: z.string(),
  street: z.string().optional(),
});

// ベースとなる人物スキーマ
const PersonSchema = z.object({
  name: z.string().min(1),
  age: z.number().int().nonnegative(),
});

// 拡張: PersonSchema に address と tags を追加
const CustomerSchema = PersonSchema.extend({
  address: AddressSchema,
  tags: z.array(z.string()).default([]),
});

type Customer = z.infer<typeof CustomerSchema>;

const data: unknown = {
  name: "佐藤花子",
  age: 30,
  address: {
    postalCode: "100-0001",
    prefecture: "東京都",
    city: "千代田区",
  },
};

const customer = CustomerSchema.parse(data);
console.log("✅ Customer:", customer);
// tags は default([]) により空配列が自動付与される
console.log("   tags:", customer.tags); // []
