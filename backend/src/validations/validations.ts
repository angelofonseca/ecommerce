import { Product, User } from "../generated/prisma";
import Login from "../Interfaces/Login";
import { LoginSchema, ProductSchema, UserSchema } from "./Schemas.js";

export const validateUser = (param: User) => {
  const result = UserSchema.safeParse(param);
  if (!result.success) {
    return {
      status: 400,
      data: {
        error: result.error.issues,
      },
    };
  }
};

export const validateLogin = (param: Login) => {
  const result = LoginSchema.safeParse(param);
  if (!result.success) {
    return {
      status: 400,
      data: {
        error: result.error.issues,
      },
    };
  }
};

export const validateProduct = (param: Product) => {
  const result = ProductSchema.safeParse(param);
  if (!result.success) {
    return {
      status: 400,
      data: {
        error: result.error.issues,
      },
    };
  }
};
