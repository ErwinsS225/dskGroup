"use client";

import React, { useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import { useUser } from "@clerk/nextjs";
import { Category } from "@prisma/client";
import { FormDataType } from "@/type";
import { readCategories } from "../action";

const page = () => {
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress as string;

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    categoryId: "",
    unit: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        if (email) {
          const data = await readCategories(email);
          if (data) setCategories(data);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des catégories:", error);
      }
    };
    fetchCategories();
  }, [email]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };
  return (
    <Wrapper>
      <div className="flex justify-center items-center">
        <div>
          <h1 className="text-2xl font-bold mb-4">Créer un Produit</h1>
          <section className="flex md:flex-row flex-col">
            <div className="space-y-4 md:w-[460px]">
              <input
                type="text"
                name="name"
                placeholder=" Nom du Produit"
                className="input input-bordered w-full "
                value={formData.name}
                onChange={handleChange}
              />
              <textarea
                name="description"
                placeholder="Description du produit"
                className="textarea textarea-bordered w-full"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
              <input
                type="number"
                name="price"
                placeholder=" Prix du produit"
                className="input input-bordered w-full "
                value={formData.price}
                onChange={handleChange}
              />
              <select
                value={formData.categoryId}
                className="select select-bordered w-full"
                name="categoryId"
                onChange={handleChange}
              >
                <option>Sélectionner une catégorie</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <select
                value={formData.unit}
                className="select select-bordered w-full"
                name="unit"
                onChange={handleChange}
              >
                <option>Sélectionner une taille</option>
                <option value="M">M</option>
                <option value="S">S</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
              <input
                type="file"
                accept="image/*"
                className=" file-input file-input-bordered w-full "
                onChange={handleFileChange}
              />
              <button className="btn btn-primary rounded-2xl font-bold ">
                Créer le produit
              </button>
            </div>
            <div
              className="md:ml-5 md:w-[300px] mt-4 md:mt-0 border-2 border-primary
             md:h-[300px] p-5 flex justify-center items-center rounded-3xl "
            >
              {previewUrl && previewUrl !== "" ? (
                <img
                  src={previewUrl}
                  alt="Aperçu du produit"
                  className="max-h-60 max-w-full rounded-xl"
                />
              ) : null}
            </div>
          </section>
        </div>
      </div>
    </Wrapper>
  );
};

export default page;
