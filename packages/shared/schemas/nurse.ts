import {z} from "zod";

const NurseSchema = z.object({
  id: z.string(),
  first_name: z.string(),
  last_name: z.string(),
  date_of_birth: z.string(),
  gender: z.enum(["male", "female", "other"]),
  location: z.string(),
});

export type Nurse = z.infer<typeof NurseSchema>;