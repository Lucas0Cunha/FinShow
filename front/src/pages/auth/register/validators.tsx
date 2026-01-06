import z from 'zod';

export const registerSchema = z
  .object({
    name: z.string().nonempty(),
    email: z.email(),
    password: z.string().min(8),
    confirmPassword: z.string().nonempty(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterData = z.infer<typeof registerSchema>;
