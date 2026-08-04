import { z } from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(3).max(32),
});

export type loginSchemaType = z.infer<typeof loginSchema>;
