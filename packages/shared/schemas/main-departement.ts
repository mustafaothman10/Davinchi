import {z} from "zod";

const MainDepartmentSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
});

export type MainDepartment = z.infer<typeof MainDepartmentSchema>;