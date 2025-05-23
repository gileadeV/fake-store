import { useEffect, useState } from "react";

const STORAGE_KEY = "user_zip_code";

export function useSavedCep() {
  const [cep, setCepState] = useState<string>("");

  useEffect(() => {
    const storedCep = localStorage.getItem(STORAGE_KEY);
    if (storedCep) setCepState(storedCep);
  }, []);

  const setCep = (newCep: string) => {
    localStorage.setItem(STORAGE_KEY, newCep);
    setCepState(newCep);
  };

  const clearCep = () => {
    localStorage.removeItem(STORAGE_KEY);
    setCepState("");
  };

  return { cep, setCep, clearCep };
}
