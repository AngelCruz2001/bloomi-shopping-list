import React, { useState } from "react";
import { Product } from "./types/Product";

interface ProductEditorProps {
  product: Product;
  onSave: (product: Product) => void;
  onCancel: () => void;
}

const ProductEditor: React.FC<ProductEditorProps> = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Product>(product);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Editar Producto</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Precio</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Pasillo</label>
            <input
              type="text"
              name="aisle"
              value={formData.aisle}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancelar
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductEditor;
