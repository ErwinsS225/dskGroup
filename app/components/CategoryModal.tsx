import React from "react";

interface Props {
  name: string;
  description: string;
  loading: boolean;
  onclose: () => void;
  onChangeDescription: (value: string) => void;
  onChangeName: (value: string) => void;
  editMode?: boolean;
  onSubmit: () => void;
}

const CategoryModal: React.FC<Props> = ({
  name,
  description,
  loading,
  onclose,
  onChangeDescription,
  onChangeName,
  editMode,
  onSubmit,
}) => {
  return (
    <>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      <dialog id="category_modal" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={onclose}
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-4">
            {editMode ? "Modifier la catégorie" : "Nouvelle catégorie"}
          </h3>
          <input
            type="text"
            placeholder="Nom de la catégorie"
            value={name}
            onChange={(e) => onChangeName(e.target.value)}
            className="input input-bordered w-full mb-4"
          />
          <input
            type="text"
            placeholder="Description de la catégorie"
            value={description}
            onChange={(e) => onChangeDescription(e.target.value)}
            className="input input-bordered w-full mb-4"
          />

          <button
            className="btn btn-primary"
            onClick={onSubmit}
            disabled={loading}
          >
            {loading
              ? editMode
                ? "Modification en cours ..."
                : "Ajout en cours ..."
              : editMode
              ? "Modifier "
              : "Ajouter"}
          </button>
        </div>
      </dialog>
    </>
  );
};

export default CategoryModal;
