import {z} from "zod";

const FloorSchema = z.object({
  id: z.string(),
  number: z.string(),
  description: z.string(),
});

export type Floor = z.infer<typeof FloorSchema>;