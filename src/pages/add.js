import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { AiOutlineUnorderedList } from "react-icons/ai";

export default function AddItems() {
  const navigate = useNavigate();
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [list, setList] = useState([]);

  useEffect(() => {
    const shoppingList = JSON.parse(localStorage.getItem("shoppingList"));
    if (shoppingList) {
      setList(shoppingList);
    }
  }, []);

  const addShoppingList = () => {
    const newList = [...list];

    if (item && quantity) {
      newList.push({
        id: Math.floor(Math.random() * 100000),
        item: item,
        quantity: quantity,
        category: category,
      });

      setList(newList);
      localStorage.setItem("shoppingList", JSON.stringify(newList));

      setItem("");
      setQuantity(0);
    } else {
      alert("Please add your Shopping List");
    }

    navigate("/");
  };

  return (
    <div className="container mt-5 mx-auto" style={{ maxwidth: "800px" }}>
      <Card>
        <Card.Body>
          <Card.Title className="text-center">
            <h2>
              <AiOutlineUnorderedList />
              Add Shopping List
            </h2>
          </Card.Title>
          <Form>
            <Form.Group className="mb-1 mt-2">
              <Form.Control
                type="text"
                placeholder="Add your items here..."
                value={item}
                onChange={(event) => setItem(event.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-1">
              <Form.Control
                type="text"
                placeholder="Add your quantity here..."
                value={quantity}
                // min={0}
                onChange={(event) => setQuantity(event.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Select
                value={category}
                onChange={(event) => {
                  setCategory(event.target.value);
                }}
              >
                <option value="">Select a Category</option>
                <option value="">All Category</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value="Can-Food">Can Foods</option>
                <option value="Wet-Items">Wet Items</option>
                <option value="Dry-Items">Dry Items</option>
                <option value="Snacks">Snacks</option>
                <option value="Household">Household Supplies</option>
                <option value="Others">Others</option>
              </Form.Select>
            </Form.Group>
            <Button
              variant="primary"
              size="sm"
              onClick={(event) => {
                event.preventDefault();
                addShoppingList();
              }}
            >
              Add New Item
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="mt-5 text-center">
        <Link to="/" className="pt-2 text-center btn btn-secondary btn-sm">
          Back To Home
        </Link>
      </div>
    </div>
  );
}
