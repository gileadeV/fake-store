"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { useState } from "react";
import { ViaCepResponse } from "@/types/types";
import { useTheme } from "next-themes";
import { theme as colorTheme } from "@/lib/theme-colors";
import { usePurchaseForm } from "@/app/hooks/use-purchase-form";
import SearchIcon from "@mui/icons-material/Search";

interface PurchaseDialogProps {
  open: boolean;
  onClose: () => void;
}

export const PurchaseDialog = ({ open, onClose }: PurchaseDialogProps) => {
  const { theme: currentTheme } = useTheme();
  const isDark = currentTheme === "dark";
  const colors = isDark ? colorTheme.dark : colorTheme.light;

  const { form, updateField } = usePurchaseForm();
  const [cepError, setCepError] = useState<string | null>(null);

  const handleChange = (field: keyof typeof form, value: string) => {
    updateField(field, value);
  };

  const buscarEndereco = async () => {
    setCepError(null);

    const sanitized = form.cep.replace(/\D/g, "");
    if (sanitized.length !== 8) {
      setCepError("CEP inválido");
      return;
    }

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${sanitized}/json/`
      );
      const data: ViaCepResponse = await response.json();

      if (data.erro) {
        setCepError("CEP não encontrado.");
        return;
      }

      updateField("state", data.uf);
      updateField("city", data.localidade);
      updateField("street", data.logradouro);
    } catch {
      setCepError("Erro ao buscar o CEP.");
    }
  };

  const handleSubmit = () => {
    alert(JSON.stringify(form, null, 2));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <div style={{ background: colors.card, color: colors.text }}>
        <DialogTitle style={{ color: colors.text }}>
          Finalizar Compra
        </DialogTitle>

        <DialogContent dividers style={{ background: colors.background }}>
          <div className="space-y-4 flex flex-col gap-3">
            <TextField
              label="Nome"
              fullWidth
              className="my-2"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              InputProps={{ style: { color: colors.text } }}
              InputLabelProps={{ style: { color: colors.text } }}
            />

            <TextField
              label="E-mail"
              fullWidth
              type="email"
              className="my-2"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              InputProps={{ style: { color: colors.text } }}
              InputLabelProps={{ style: { color: colors.text } }}
            />

            <div className="flex gap-2 items-end">
              <TextField
                label="CEP"
                fullWidth
                value={form.cep}
                onChange={(e) => handleChange("cep", e.target.value)}
                error={!!cepError}
                helperText={cepError || ""}
                InputProps={{ style: { color: colors.text } }}
                InputLabelProps={{ style: { color: colors.text } }}
              />
              <Button
                onClick={buscarEndereco}
                variant="outlined"
                className="w-14 h-14 flex items-center justify-center"
                style={{
                  borderColor: colorTheme.neon,
                  color: colorTheme.neon,
                }}
              >
                <SearchIcon />
              </Button>
            </div>

            <TextField
              label="Estado"
              fullWidth
              className="my-2"
              value={form.state}
              onChange={(e) => handleChange("state", e.target.value)}
              InputProps={{ style: { color: colors.text } }}
              InputLabelProps={{ style: { color: colors.text } }}
            />

            <TextField
              label="Cidade"
              fullWidth
              className="my-2"
              value={form.city}
              onChange={(e) => handleChange("city", e.target.value)}
              InputProps={{ style: { color: colors.text } }}
              InputLabelProps={{ style: { color: colors.text } }}
            />

            <TextField
              label="Rua"
              fullWidth
              className="my-2"
              value={form.street}
              onChange={(e) => handleChange("street", e.target.value)}
              InputProps={{ style: { color: colors.text } }}
              InputLabelProps={{ style: { color: colors.text } }}
            />
          </div>
        </DialogContent>

        <DialogActions
          style={{ background: colors.background, padding: "1rem" }}
        >
          <Button onClick={onClose} style={{ color: "#888" }}>
            Cancelar
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            style={{
              backgroundColor: colorTheme.neon,
              color: "#000",
              fontWeight: 600,
            }}
          >
            Confirmar Pedido
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};
