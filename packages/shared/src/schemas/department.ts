import { z } from "zod";

const DepartmentSchema = z.object({
    id: z.string(),
    name: z.string(),
    creating_date: z.string(),
    description: z.string(),
});

export type Department = z.infer<typeof DepartmentSchema>;