import { z } from 'zod';
import validator from 'validator';

export const contactSchema = z.object({
    name: z.string().min(2, { message: 'Nombre demasiado corto' }).max(50, { message: 'Nombre demasiado largo' }),
    email: z.string().email({ message: 'Email inválido' }),
    message: z.string().min(10, { message: 'Mensaje demasiado corto' }).max(500, { message: 'Mensaje demasiado largo' }),
    subject: z.string()
        .min(2, { message: 'Asunto demasiado corto' })
        .max(120, { message: 'Asunto demasiado largo' })
        .refine(value => validator.isAlpha(value), { message: 'Solo se permiten letras en el asunto' })
});
