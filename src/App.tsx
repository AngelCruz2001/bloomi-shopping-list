import React, { useState } from "react";
import { Product } from "./types/Product";
import productsData from "./products.json";
import ProductEditor from "./ProductEditor";

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(productsData);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleSave = (updatedProduct: Product) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setSelectedProduct(null);
  };

  const calculateTotal = () => {
    return products.reduce((acc, product) => acc + product.price, 0).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Lista de Productos</h1>
      <ul className="space-y-4">
        {products.map((product) => (
          <li
            key={product.id}
            className="flex items-center justify-between bg-white p-4 shadow rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <input type="checkbox" className="h-5 w-5" />
              <span className="text-lg font-medium">{product.name}</span>
            </div>
            <button
              onClick={() => handleProductClick(product)}
              className="text-blue-500"
            >
              Editar
            </button>
          </li>
        ))}
      </ul>

      {/* Tabla de resumen */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Resumen</h2>
        <table className="min-w-full bg-white border rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left border-b">Producto</th>
              <th className="px-4 py-2 text-left border-b">Precio</th>
              <th className="px-4 py-2 text-left border-b">Pasillo</th>
              <th className="px-4 py-2 text-left border-b">Imagen</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td className="px-4 py-2 border-b">{product.name}</td>
                <td className="px-4 py-2 border-b">{product.price}</td>
                <td className="px-4 py-2 border-b">{product.aisle}</td>
                <td className="px-4 py-2 border-b">
                  {product.image !== "N/A" ? (
                    <img src={product.image} alt={product.name} className="h-8 w-8 object-cover" />
                  ) : (
                    "N/A"
                  )}
                </td>
              </tr>
            ))}
            <tr>
              <td className="px-4 py-2 font-bold border-t">Total</td>
              <td className="px-4 py-2 font-bold border-t">{calculateTotal()}</td>
              <td className="px-4 py-2 border-t"></td>
              <td className="px-4 py-2 border-t"></td>
            </tr>
          </tbody>
        </table>
      </div>

      {selectedProduct && (
        <ProductEditor
          product={selectedProduct}
          onSave={handleSave}
          onCancel={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default App;