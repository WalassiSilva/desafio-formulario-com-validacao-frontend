import React from "react";
import { FaCheck } from "react-icons/fa";
export default function Modal() {
  return (
    <div className="w-screen h-screen bg-black/50 fixed top-0 left-0">
      <div className="bg-zinc-800 min-w-[300px] h-[300px] p-5 rounded-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white flex flex-col items-center justify-center gap-3 [z-index:10] text-center">
        <div>
          <FaCheck className="text-emerald-500" size={50} />
        </div>
        <h2 className="text-2xl font-black">
          Cadastro realizado com sucesso!
        </h2>
        <p className="font-semibold text-lg">
          Muito obrigado por ser inscrever!
        </p>
      </div>
    </div>
  );
}
