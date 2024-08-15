import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import Header from "./Header/Header";
import { fetchData } from "./utilities/ApiUti";
import UpdateModal from "./Components/Inventory/Modals/UpdateModal";
import DeleteModal from "./Components/Inventory/Modals/DeleteModal";
import AddModal from "./Components/Inventory/Modals/AddModal";
import TableRow from "./Components/Inventory/Table/TableRow";
import { Button, Table, InputGroup, FormControl, Spinner, Container, Row, Col } from "react-bootstrap";

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [modals, setModals] = useState({
    add: false,
    update: false,
    delete: false,
  });
  const [product, setAddProducts] = useState({
    Name: "",
    sku: "",
    price: "",
    quantity: "",
  });

  const API_URL = "http://localhost:5222/api/ProductApi/SaveProduct";

  async function addUsers(e) {
    e.preventDefault();
    await fetchData(`${API_URL}/SaveProduct`, "POST", {
      id: 0,
      name: product.Name,
      sku: product.sku,
      price: product.price,
      quantity: product.quantity,
    });
    toggleModal("add");
    getProducts();
  }

  async function updateUsers(e) {
    e.preventDefault();
    try {
      await fetchData(`${API_URL}/UpdateProduct?Id=${currentItem.id}`, "PUT", {
        id: currentItem.id,
        name: product.Name,
        sku: product.sku,
        price: product.price,
        quantity: product.quantity,
      });
      getProducts();
      toggleModal("update");
    } catch (error) {
      console.error("Failed to update user:", error);
      alert("Failed to update user. Please try again.");
    }
  }

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

  const handleDeleteProduct = async () => {
    if (currentItem && currentItem.id) {
      try {
        const response = await fetchData(
          `${API_URL}/DeleteProduct?id=${currentItem.id}`,
          "DELETE"
        );
        console.log("Delete response:", response);
        getProducts();
        toggleModal("delete");
      } catch (error) {
        console.error("Failed to delete product:", error);
        alert(`Failed to delete product. Error: ${error.message}`);
      }
    } else {
      console.error("No current item to delete.");
      alert("No product selected for deletion.");
    }
  };

  const toggleModal = (modalType, item = null) => {
    setModals((prevModals) => ({
      ...prevModals,
      [modalType]: !prevModals[modalType],
    }));
    setCurrentItem(item);

    if (modalType === "update" && item) {
      setAddProducts({
        Name: item.name,
        sku: item.sku,
        price: item.price,
        quantity: item.quantity,
      });
    } else if (modalType === "add") {
      setAddProducts({ Name: "", sku: "", price: "", quantity: "" });
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Header />
      <Container className="mt-5">
        <Row className="mb-3">
          <Col md={8}>
            <InputGroup>
              <FormControl
                placeholder="Search for Name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col md={4} className="text-right">
            <Button variant="dark" onClick={() => toggleModal("add")}>
              <FaPlus className="mr-2" /> Add
            </Button>
          </Col>
        </Row>
        {loading ? (
          <div className="d-flex justify-content-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Table striped bordered hover className="rounded">
            <thead className="bg-light">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>SKU</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <TableRow
                  key={product.id}
                  product={product}
                  UpdateModal={() => toggleModal("update", product)}
                  DeleteModal={() => toggleModal("delete", product)}
                />
              ))}
            </tbody>
          </Table>
        )}
      </Container>
      <DeleteModal
        isOpen={modals.delete}
        toggleModal={() => toggleModal("delete")}
        handleDeleteProduct={handleDeleteProduct}
      />
      <AddModal
        isOpen={modals.add}
        addUsers={addUsers}
        setAddProducts={setAddProducts}
        product={product}
        toggleModal={() => toggleModal("add")}
      />
      <UpdateModal
        isOpen={modals.update}
        toggleModal={() => toggleModal("update")}
        updateUsers={updateUsers}
        setAddProducts={setAddProducts}
        product={product}
      />
    </>
  );
}
