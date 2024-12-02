import { panelTypes } from "shared/constants";
import z from "zod";

export const AddPanelFormSchema = z.object({
  type: z.enum(panelTypes),
  showFrom: z.date(),
  showTill: z.date(),
  content: z.string().optional(),
});
