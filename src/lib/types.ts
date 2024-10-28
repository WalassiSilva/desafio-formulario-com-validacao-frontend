import { z } from "zod";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const formSchema = z.object({
  nome: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 letras")
    .max(50, "O nome deve ter no maximo 50 letras"),
  email: z
    .string()
    .max(100, "O e-mail deve ter no maximo 100 letras")
    .regex(emailRegex, "E-mail inválido"),
  telefone: z
    .string()
    .min(11, "O telefone conter DDD mais 9 digitos")
    .max(15, "O telefone conter DDD mais 9 digitos"),
  cargo: z.enum([
    "Desenvolvedor Frontend",
    "Desenvolvedor Backend",
    "Desenvolvedor Full Stack",
    "Desenvolvedor Mobile",
    "Desenvolvedor de Software",
    "Engenheiro de Software",
    "Arquiteto de Software",
    "UI/UX Designer",
    "Analista de Sistemas",
    "Analista Programador",
    "DevOps Engineer",
    "Engenheiro de Dados",
    "QA Engineer",
    "Scrum Master",
    "Product Owner",
  ]),
  linkedin: z
    .string()
    .url()
    .max(50, "Link deve conter no máximo 100 caracteres")
    .optional(),
  github: z
    .string()
    .url()
    .max(50, "Link deve conter no máximo 100 caracteres")
    .optional(),
});

export type FormSchemaType = z.infer<typeof formSchema>;
