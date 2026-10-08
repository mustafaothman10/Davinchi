import {z} from "zod";

const HospitalSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
});

export type Hospital = z.infer<typeof HospitalSchema>;