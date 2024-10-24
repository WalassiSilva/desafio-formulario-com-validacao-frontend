import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const formSchema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 letras"),
  email: z.string().regex(emailRegex, "E-mail inválido"),
  telefone: z.string().min(11, "O telefone conter DDD mais 9 digitos"),
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
  linkedin: z.string().optional(),
  github: z.string().optional(),
});

type FormSchemaType = z.infer<typeof formSchema>;
export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormSchemaType) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));

    localStorage.setItem("FORM_DATA", JSON.stringify(data));

    reset();
    console.log(data);
    alert("Cadastro efetuado com sucesso!");
  };

  return (
    <div className=" mx-auto max-w-xl ">
      <h1 className="text-3xl font-black text-center py-4">
        Formulário de Cadastro
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 rounded-lg border border-zinc-800 py-10 px-5 "
      >
        <div>
          <label className="px-6 font-bold" htmlFor="nome">
            Nome
          </label>
          <input
            {...register("nome")}
            type="text"
            placeholder="Nome"
            className="input"
          />
          {errors.nome && (
            <p className="text-red-600">{`${errors.nome.message}`}</p>
          )}
        </div>
        <div>
          <label className="px-6 font-bold" htmlFor="email">
            E-mail
          </label>
          <input
            {...register("email")}
            type="email"
            placeholder="nome@email.com"
            className="input"
          />
          {errors.email && (
            <p className="text-red-600">{`${errors.email.message}`}</p>
          )}
        </div>
        <div>
          <label className="px-6 font-bold" htmlFor="telefone">
            Telefone
          </label>
          <input
            {...register("telefone")}
            type="telefone"
            placeholder="31 98888-1234"
            className="input"
          />
          {errors.telefone && (
            <p className="text-red-600">{`${errors.telefone.message}`}</p>
          )}
        </div>
        <div>
          <label className="px-6 font-bold" htmlFor="cargo">
            Cargo
          </label>
          <select {...register("cargo")} className="input cursor-pointer">
            {formSchema.shape.cargo.options.map((option) => (
              <option
                key={option}
                value={option}
                className="flex-1 bg-zinc-900 outline-none "
              >
                {option}
              </option>
            ))}
          </select>
          {errors.cargo && (
            <p className="text-red-600">{`${errors.cargo.message}`}</p>
          )}
        </div>

        <div>
          <label className="px-6 font-bold" htmlFor="linkedin">
            LinkedIn (Opcional)
          </label>
          <input
            type="text"
            {...register("linkedin")}
            placeholder="https://linkedin.com/joaosilva"
            className="input"
          />
          {errors.linkedin && (
            <p className="text-red-600">{`${errors.linkedin.message}`}</p>
          )}
        </div>

        <div>
          <label className="px-6 font-bold" htmlFor="github">
            GitHub (Opcional)
          </label>
          <input
            type="text"
            {...register("github")}
            placeholder="https://github.com/joaosilva"
            className="input"
          />
          {errors.github && (
            <p className="text-red-600">{`${errors.github.message}`}</p>
          )}
        </div>

        <button type="submit" disabled={isSubmitting} className="button">
          Enviar
        </button>
      </form>
    </div>
  );
}
