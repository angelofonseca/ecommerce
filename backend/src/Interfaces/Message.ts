import * as z from "zod";

export default interface Message {
  result?: any;
  message?: string;
  error?: z.core.$ZodIssue[];
}
