import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import { formSchema, FormSchemaType } from "../lib/types";

export default function Form() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSubmit = async (data: FormSchemaType) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    let dataForm = data;
    const existingData = JSON.parse(localStorage.getItem("FORM_DATA") || "[]");

    existingData.push(dataForm);
    localStorage.setItem("FORM_DATA", JSON.stringify(existingData));

    reset();
    setIsModalOpen(true);
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
          <label className="px-6 font-bold">Nome</label>
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
          <label className="px-6 font-bold">E-mail</label>
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
          <label className="px-6 font-bold">Telefone</label>
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
          <label className="px-6 font-bold">Cargo</label>
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
          <label className="px-6 font-bold">LinkedIn (Opcional)</label>
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
          <label className="px-6 font-bold">GitHub (Opcional)</label>
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
          {isSubmitting ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>

      {isModalOpen && (
        <div onClick={() => setIsModalOpen(false)}>
          <Modal />
        </div>
      )}

      {Object.keys(errors).length > 0 && (
        <p className="text-red-600 text-center">
          Falha ao cadastrar. Verifique os dados informados.
        </p>
      )}
    </div>
  );
}
