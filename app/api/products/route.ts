import { getAllProducts, getAllProductsByCategory } from "@/lib/products";
import { Products } from "@/types/types";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    let products: Products;

    if (category === "all") {
      products = await getAllProducts();
    } else if (category) {
      products = await getAllProductsByCategory(category);
    } else {
      return NextResponse.json(
        { error: "Category parameter is required" },
        { status: 400 }
      );
    }

    if (!products) {
      return notFound();
    }

    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
