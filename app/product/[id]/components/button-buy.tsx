"use client";

import { useState } from "react";
import { PurchaseDialog } from "./purchase-dialog";

export const ButtonBuy: React.FC = ({}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setDialogOpen(true)}
        className="mt-6 w-full bg-[#00ffaa] text-black py-3 rounded-xl font-semibold text-lg hover:bg-[#00ffcc] transition cursor-pointer"
      >
        Comprar
      </button>
      <PurchaseDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
};
