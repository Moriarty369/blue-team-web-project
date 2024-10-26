import { z } from "zod";

 export const signupSchema = z.object({
    name: z
      .string()
      .min(2, { message: "El nombre debe tener al menos 2 caracteres" })
      .max(80, { message: "El nombre debe tener como máximo 80 caracteres" })
      .regex(/^[a-zA-Z\s]+$/, { message: "El nombre solo puede contener letras" })
      .transform(value => value.trim().toLowerCase()),
    lastname: z
      .string()
      .min(2, { message: "El apellido debe tener al menos 2 caracteres" })
      .max(80, { message: "El apellido debe tener como máximo 80 caracteres" })
      .regex(/^[a-zA-Z\s]+$/, { message: "El apellido solo puede contener letras" })
      .transform(value => value.trim().toLowerCase()),
    username: z
      .string()
      .min(4, { message: "El nombre de usuario debe tener al menos 4 caracteres" })
      .max(30, { message: "El nombre de usuario debe tener como máximo 30 caracteres" })
      .regex(/^[a-zA-Z0-9]+$/, { message: "El nombre de usuario solo puede contener letras y números" })
      .transform(value => value.trim().toLowerCase()),
      
    email: z
      .string()
      .email({ message: "El email debe tener un formato válido" })
      .max(100)
      .transform(value => value.trim().toLowerCase()),
    mobile: z
      .string()
      .min(10, { message: "El número de móvil debe tener al menos 10 caracteres" })
      .max(15, { message: "El número de móvil debe tener como máximo 15 caracteres" })
      .regex(/^\d+$/, { message: "El número de móvil solo puede contener dígitos" }),
    password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  });



export const signinSchema = z.object({
    email: z
      .string()
      .email({ message: "El email debe tener un formato válido authSchema" })
      .max(100)
      .transform(value => value.trim().toLowerCase()),
    password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  });
  




