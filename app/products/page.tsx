"use client";
import React, { useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import { useUser } from "@clerk/nextjs";
import { Product } from "@/type";
import { readProducts } from "../action";
import EmptyState from "../components/EmptyState";
import ProductImage from "../components/ProductImage";

const page = () => {
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress as string;
  const [products, setProducts] = useState<Product[]>([]);
  const fetchProducts = async () => {
    try {
      if (email) {
        const products = await readProducts(email);
        if (products) {
          setProducts(products);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (email) fetchProducts();
  }, [email]);

  return (
    <Wrapper>
      <div className="overflow-x-auto">
        {products.length === 0 ? (
          <div>
            <EmptyState
              message="Aucun Produit trouvé"
              IconComponent="PackageSearch"
            />
          </div>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Image</th>
                <th>Nom</th>
                <th>Description</th>
                <th>Prix</th>
                <th>Tailles</th>
                <th>Catégorie</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product.id}>
                  <th>{index + 1}</th>
                  <td>
                    <ProductImage
                      src={product.imageUrl}
                      alt={product.imageUrl}
                      heightClass="h-12"
                      widthClass="w-12"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Wrapper>
  );
};

export default page;
