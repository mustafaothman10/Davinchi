import {z} from "zod";

const PatientSchema = z.object({
  id: z.string(),
  age: z.number().int().positive(),
  location: z.string(),
});

export type Patient = z.infer<typeof PatientSchema>;