"use server";

import prisma from "@/lib/prisma";
import { Category } from "@prisma/client";

export async function checkAndAddAssociation(email: string, name: string) {
  if (!email) return;
  try {
    const existingAssociation = await prisma.association.findUnique({
      where: { email },
    });
    if (!existingAssociation && name) {
      await prisma.association.create({
        data: { email, name },
      });
    }
  } catch (error) {
    console.error(error);
  }
}
export async function getAssociation(email: string) {
  if (!email) return;
  try {
    const existingAssociation = await prisma.association.findUnique({
      where: { email },
    });
    return existingAssociation;
  } catch (error) {
    console.error(error);
  }
}

export async function createCategory(
  name: string,
  email: string,
  description?: string
) {
  if (!name) return;
  try {
    const association = await getAssociation(email);
    if (!association) {
      throw new Error("Aucune assiciation trouvée");
    }
    await prisma.category.create({
      data: {
        name,
        description: description || "",
        associationId: association.id,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function updateCategory(
  id: string,
  name: string,
  email: string,
  description?: string
) {
  if (!id || !name) {
    throw new Error("ID et nom requis pour la mise à jour de la catégorie");
  }
  try {
    const association = await getAssociation(email);
    if (!association) {
      throw new Error("Aucune assiciation trouvée");
    }
    await prisma.category.update({
      where: {
        id: id,
        associationId: association.id,
      },
      data: {
        name: name,
        description: description || "",
      },
    });
  } catch (error) {
    console.error(error);
  }
}
export async function deleteCategory(id: string, email: string) {
  if (!id || !email) {
    throw new Error("ID et email requis pour la suppression de la catégorie");
  }
  try {
    const association = await getAssociation(email);
    if (!association) {
      throw new Error("Aucune assiciation trouvée");
    }
    await prisma.category.delete({
      where: {
        id: id,
        associationId: association.id,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function readCategory(
  email: string
): Promise<Category[] | undefined> {
  if (!email) {
    throw new Error("Email requis pour la lecture de la catégorie");
  }
  try {
    const association = await getAssociation(email);
    if (!association) {
      throw new Error("Aucune assiciation trouvée");
    }
    const categories = await prisma.category.findMany({
      where: {
        associationId: association.id,
      },
    });
    return categories;
  } catch (error) {
    console.error(error);
  }
}
