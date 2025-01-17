import Header from "./Header/Header";
import React, { useState, useEffect } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { fetchData } from "./utilities/ApiUti";
import FilterTable from "./Components/Dashboard/Table/FilterTable";
import Products from "./Components/Dashboard/Table/Products";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const API_URL = "http://localhost:5222/api/ProductApi/GetProducts";
  const ORDER_API_URL = "http://localhost:5222/api/Order/AllHistory ";

  const getProducts = async () => {
    setLoading(true);
    try {
      const result = await fetchData(`${API_URL}/GetProducts`, "GET");
      setProducts(result);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToSelectedProducts = (product) => {
    if (product.quantity <= 0) return;

    setSelectedProducts((prevSelected) => {
      const existingProduct = prevSelected.find((p) => p.id === product.id);
      if (existingProduct) {
        return prevSelected.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prevSelected, { ...product, quantity: 1 }];
      }
    });

    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p
      )
    );
  };

  const incrementQuantity = (productId) => {
    const product = products.find((p) => p.id === productId);
    if (product.quantity <= 0) return;

    setSelectedProducts((prevSelected) =>
      prevSelected.map((p) =>
        p.id === productId ? { ...p, quantity: p.quantity + 1 } : p
      )
    );

    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === productId ? { ...p, quantity: p.quantity - 1 } : p
      )
    );
  };

  const decrementQuantity = (productId) => {
    const selectedProduct = selectedProducts.find((p) => p.id === productId);
    if (selectedProduct && selectedProduct.quantity > 1) {
      setSelectedProducts((prevSelected) =>
        prevSelected.map((p) =>
          p.id === productId ? { ...p, quantity: p.quantity - 1 } : p
        )
      );

      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === productId ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
    } else {
      setSelectedProducts((prevSelected) =>
        prevSelected.filter((p) => p.id !== productId)
      );

      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === productId ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
    }
  };

  const calculateTotalPrice = () => {
    return selectedProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  const handleCheckout = async () => {
    if (selectedProducts.length === 0) {
      alert("No products selected for checkout.");
      return;
    }

    try {
      const response = await fetch(`${ORDER_API_URL}/Checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selectedProducts),
      });

      if (!response.ok) {
        throw new Error("Failed to submit order.");
      }

      const data = await response.json();
      console.log("Order ID:", data.OrderId);

      setSelectedProducts([]);
      alert("Order placed successfully!");
    } catch (error) {
      console.error("Checkout failed:", error);
      alert("Checkout failed. Please try again.");
    }
  };

  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4 bg-light p-3 rounded">
            <h2 className="h5 mb-4">Selected Products</h2>
            {selectedProducts.length === 0 ? (
              <p>No products selected</p>
            ) : (
              <>
                <ul className="list-unstyled">
                  {selectedProducts.map((product) => (
                    <Products
                      key={product.id}
                      product={product}
                      decrementQuantity={() => decrementQuantity(product.id)}
                      incrementQuantity={() => incrementQuantity(product.id)}
                    />
                  ))}
                </ul>
                <div className="mt-3 fw-bold">
                  Total Price: ${calculateTotalPrice()}
                </div>
                <button
                  className="mt-3 w-100 btn btn-success"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              </>
            )}
          </div>

          <div className="col-md-8 bg-white p-4 rounded shadow-sm">
            <h1 className="h4 mb-3">Products</h1>
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {loading ? (
              <p>Loading...</p>
            ) : filteredProducts.length === 0 ? (
              <p>No products found</p>
            ) : (
              <div className="row">
                {filteredProducts.map((product) => (
                  <div className="col-md-4 mb-3" key={product.id}>
                    <FilterTable
                      product={product}
                      addToSelectedProducts={() => addToSelectedProducts(product)}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
