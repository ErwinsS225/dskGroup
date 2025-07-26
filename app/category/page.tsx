"use client";
import React, { useEffect, useState } from "react";
import Wrapper from "../components/Wrapper";
import CategoryModal from "../components/CategoryModal";
import { useUser } from "@clerk/nextjs";
import { createCategory, readCategory, updateCategory } from "../action";
import { toast } from "react-toastify";
import { Category } from "@prisma/client";
import EmptyState from "../components/EmptyState";

const page = () => {
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress as string;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null
  );
  const [categories, setCategories] = useState<Category[]>([]);
  const loadCategories = async () => {
    if (email) {
      const data = await readCategory(email);
      if (data) {
        setCategories(data);
      }
    }
  };

  useEffect(() => {
    loadCategories();
  }, [email]);

  const openCreateModal = () => {
    setName("");
    setDescription("");
    setEditMode(false);
    (
      document.getElementById("category_modal") as HTMLDialogElement
    )?.showModal();
  };

  const closeModal = () => {
    setName("");
    setDescription("");
    setEditMode(false);
    (document.getElementById("category_modal") as HTMLDialogElement)?.close();
  };

  const handleCreateCategory = async () => {
    setLoading(true);
    if (email) {
      await createCategory(name, email, description);
    }
    closeModal();
    setLoading(false);
    toast.success("Catégorie créée avec succès !");
  };

  // Placeholder for update functionality
  const handleUpdateCategory = async () => {
    if (!editingCategoryId) return;
    setLoading(true);
    if (email) {
      await updateCategory(editingCategoryId, email, name, description);
    }
    closeModal();
    setLoading(false);
    toast.success("Catégorie mise à jour avec succès !");
  };
  return (
    <Wrapper>
      <div>
        <div className="mb-4">
          <button className="btn btn-primary" onClick={openCreateModal}>
            Ajouter une catégorie
          </button>
        </div>
      </div>
      {categories.length > 0 ? (
        <div>d</div>
      ) : (
        <EmptyState
          IconComponent="Group"
          message={"Aucune catégorie trouvée"}
        />
      )}

      <CategoryModal
        name={name}
        description={description}
        loading={loading}
        onclose={() => {
          const modal = document.getElementById(
            "category_modal"
          ) as HTMLDialogElement;
          modal?.close();
        }}
        editMode={editMode}
        onChangeDescription={setDescription}
        onChangeName={setName}
        onSubmit={editMode ? handleUpdateCategory : handleCreateCategory}
      />
    </Wrapper>
  );
};

export default page;
