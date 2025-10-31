import { z } from 'zod';

import { emailSchema } from '@/app/(public)/login/schemas/loginSchema';

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});
