import { useState } from "react";

const initialModel = {
  products: [
    { id: "1", title: "Iphone 8" },
    { id: "2", title: "Iphone 10" },
    { id: "3", title: "Iphone 11" },
  ],
};

export default function App() {
  const [state, setState] = useState(initialModel);
  const [isEditMode, setIsEditMode] = useState(false);
  const [productModel, setProductModel] = useState({ id: "", title: "" });

  const handleProductModelChange = (title) => {
    setProductModel((prev) => ({
      id: prev.id,
      title,
    }));
  };

  const handleAddNewProduct = (title) => {
    setState((prev) => ({
      products: [...prev.products, { id: Math.random(), title }],
    }));
    handleProductModelChange("");
  };

  const handleRemoveProduct = (id) => {
    setState((prev) => ({
      products: prev.products.filter((product) => product.id !== id),
    }));
  };

  const handleOpenEditMode = (product) => {
    setIsEditMode(true);
    setProductModel({ id: product.id, title: product.title });
  };

  const handleUpdateProduct = (title, id) => {
    const index = state.products.findIndex((x) => x.id === id);

    const newProducts = [...state.products];
    newProducts[index] = { ...newProducts[index], title };
    setState(() => ({
      products: newProducts,
    }));

    setProductModel({ id: "", title: "" });
    setIsEditMode(false);
  };

  return (
    <div style={{ padding: "25px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "10px",
          alignItems: "center",
        }}
      >
        <div>
          <input
            style={{ width: "300px", height: "25px" }}
            value={productModel.title}
            onChange={(e) => handleProductModelChange(e.target.value)}
            placeholder="Create new product"
          />
        </div>
        <div>
          {isEditMode ? (
            <button
              onClick={() =>
                handleUpdateProduct(productModel.title, productModel.id)
              }
            >
              Save
            </button>
          ) : (
            <button onClick={() => handleAddNewProduct(productModel.title)}>
              Add New Product
            </button>
          )}
        </div>
      </div>
      {state.products.map((product) => (
        <div
          key={product.id}
          style={{
            width: "100%",
            height: "40px",
            border: "1px solid #333",
            marginBottom: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <div>{product.title}</div>
          <div>
            <div style={{ display: "flex", padding: "0px -10px" }}>
              <div style={{ margin: "0px 10px" }}>
                <button onClick={() => handleOpenEditMode(product)}>
                  Edit
                </button>
              </div>
              <div style={{ margin: "0px 10px" }}>
                <button onClick={() => handleRemoveProduct(product.id)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
