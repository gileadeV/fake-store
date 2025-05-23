"use client";

import { useSavedCep } from "@/lib/use-saved-cep";
import { ViaCepResponse } from "@/types/types";
import { useEffect, useState } from "react";
import { theme } from "@/lib/theme-colors";
import { useTheme } from "next-themes";
import { currencyFormatter } from "@/lib/calculation";

export const CepInput: React.FC = ({}) => {
  const { theme: current } = useTheme();
  const isDark = current === "dark";
  const colors = isDark ? theme.dark : theme.light;

  const { cep, setCep } = useSavedCep();
  const [zipCode, setZipCode] = useState(cep || "");
  const [cepInfo, setCepInfo] = useState<ViaCepResponse | null>(null);
  const [frete, setFrete] = useState<string | null>(null);
  const [cepError, setCepError] = useState<string | null>(null);

  const buscarFrete = async () => {
    setCepError(null);
    setCepInfo(null);
    setFrete(null);

    const sanitized = zipCode.replace(/\D/g, "");

    if (sanitized.length !== 8) {
      setCepError("CEP inválido. Deve conter 8 dígitos.");
      return;
    }

    setCep(sanitized);

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${sanitized}/json/`
      );
      const data: ViaCepResponse = await response.json();

      if (data.erro) {
        setCepError("CEP não encontrado.");
        return;
      }

      setCepInfo(data);

      // Simulando frete por estado
      const valorFrete = Math.random() * (29.9 - 9.9) + 9.9;
      setFrete(currencyFormatter(valorFrete, "USD"));
    } catch (err) {
      setCepError(`Erro ao buscar o CEP ${err}.`);
    }
  };

  useEffect(() => {
    if (cep) {
      console.log("cep ==> ", cep);
      setZipCode(cep);
      setFrete(null);
    }
  }, [cep]);

  return (
    <>
      <div className="mt-4 flex flex-col gap-2">
        <div className="flex gap-4 items-center">
          <input
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            placeholder="Digite seu CEP"
            className="px-4 py-2 rounded border border-gray-300 text-black"
            style={{ background: colors.background, color: colors.text }}
          />
          <button
            onClick={buscarFrete}
            className="bg-[#00ffaa] text-black font-bold px-4 py-2 rounded hover:bg-[#00ffcc] transition cursor-pointer"
          >
            Calcular Frete
          </button>
        </div>

        {cepError && <p className="text-red-500 text-sm">{cepError}</p>}

        {cepInfo && (
          <div className="text-sm text-gray-400">
            <p>
              Entregar em: {cepInfo.logradouro}, {cepInfo.bairro} –{" "}
              {cepInfo.localidade}/{cepInfo.uf}
            </p>
            <p className="font-bold text-[#00ffaa]">Frete estimado: {frete}</p>
          </div>
        )}
      </div>
    </>
  );
};
