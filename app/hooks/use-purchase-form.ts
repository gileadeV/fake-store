"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "purchase_form_data";

type PurchaseForm = {
  name: string;
  email: string;
  cep: string;
  state: string;
  city: string;
  street: string;
};

const defaultForm: PurchaseForm = {
  name: "",
  email: "",
  cep: "",
  state: "",
  city: "",
  street: "",
};

function getInitialForm(): PurchaseForm {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return { ...defaultForm, ...parsed };
    }
  } catch (e) {
    console.error("Erro ao ler localStorage:", e);
  }
  return defaultForm;
}

export function usePurchaseForm() {
  const [form, setForm] = useState<PurchaseForm>(() => {
    if (typeof window === "undefined") return defaultForm;
    return getInitialForm();
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    } catch (e) {
      console.error("Erro ao salvar:", e);
    }
  }, [form]);

  const updateField = (field: keyof PurchaseForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setForm(defaultForm);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    form,
    updateField,
    resetForm,
  };
}
