
import { z } from 'zod';

export const contactUsSchema = z.object({
  name: z.string().min(1, 'Name is required').refine(value => /^[A-Za-z\s]+$/.test(value), 'Name should only contain letters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message should be at least 10 characters long'),
});
