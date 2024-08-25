import { z } from "zod";

/*
 * This is the schema for the login credentials
 * It requires an email and password
 */
export const loginCredentialsSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({
      message: "Email is invalid",
    }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

/*
 * This is the schema for the signup credentials
 * It requires an email, password and confirmPassword
 * The password and confirmPassword must match
 * The password must be at least 8 characters long
 * The email must be a valid email
 * The confirmPassword must match the password
 */
export const signupCredentialsSchema = z
  .object({
    name: z.string().min(1, {
      message: "Name is required",
    }),
    email: z
      .string()
      .min(1, {
        message: "Email is required",
      })
      .email({
        message: "Email is invalid",
      }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters long",
    }),
  })


/**
 * This is the schema for the email reset password
 * It requires an email
 * The email must be a valid email
 * The email must be at least 1 character long
 */

export const emailResetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required",
    })
    .email({
      message: "Email is invalid",
    }),
});

/**
 * This is the schema for the new password
 * It requires a password and confirmPassword
 * The password and confirmPassword must match
 * The password must be at least 8 characters long
 */
export const newPasswordSchema = z
  .object({
    password: z.string().min(8, {
      message: "Password must be at least 8 characters long",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
