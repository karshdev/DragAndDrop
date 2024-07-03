import React from "react";
import { BsFillExclamationTriangleFill } from "react-icons/bs";

const AttentionModal = () => {
  return (
    <div className="flex items-center justify-center my-auto h-[100vh]">
      <div className="sm:w-2/3 w-[90%] rounded-lg border border-gray-300 p-4">
        <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center rounded-lg p-2">
          <BsFillExclamationTriangleFill className="sm:text-8xl text-5xl m-8 text-red-500" />
          <span className="sm:text-xl text-md p-2 text-center">
        Esse aplicativo não é otimizado para este tamanho de tela, para uma melhor experiência recomendamos o acesso no tablet, notebook ou computador de mesa.
          </span>
        </div>
      </div>
    </div>
  );
};

export default AttentionModal;
