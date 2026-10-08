import { z } from "zod";

const FloorSchema = z.object({
    id: z.string(),
    first_name: z.string(),
    second_name: z.string(),
    birth_date: z.string(),
    gender: z.enum(["male", "female", "other"]),
    first_location: z.string(),
});

export type Floor = z.infer<typeof FloorSchema>;