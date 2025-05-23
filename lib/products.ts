import { Products } from "@/types/types";
import axios from "axios";

export async function getAllProducts(): Promise<Products> {
  try {
    const response = await axios.get("https://dummyjson.com/products");

    return response.data.products || [];
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw new Error("Erro ao buscar produtos");
  }
}

export async function getAllProductsByCategory(
  category: string
): Promise<Products> {
  try {
    const response = await axios.get(`https://dummyjson.com/products/category/${category}`);

    return response.data.products || [];
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    throw new Error("Erro ao buscar produtos");
  }
}
