import { z } from "zod";

const FloorSchema = z.object({
    id: z.string(),
    name: z.string(),
    creating_date: z.string(),
    description: z.string(),
});

export type Floor = z.infer<typeof FloorSchema>;