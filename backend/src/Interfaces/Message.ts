import * as z from "zod";

export default interface Message {
  message?: string;
  error?: z.core.$ZodIssue[];

}
