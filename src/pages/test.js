import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

export function MyVerticallyCenteredModal(props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [item, setItem] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    // 1. load all the posts from the local storage
    const lists = JSON.parse(localStorage.getItem("lists"));
    // 2. find the single post with the provided id inside the posts array
    const list = lists
      ? lists.find((p) => parseInt(p.id) === parseInt(id))
      : null;

    if (list) {
      setItem(list.item);
      setCategory(list.category);
      setQuantity(list.quantity);
    }
  }, []); // empty array so that only trigger once when page is loaded

  const updateList = () => {
    // 1. load the posts from local storage
    const lists = JSON.parse(localStorage.getItem("lists"));
    // 2. use .map to modify the array
    const newLists = lists.map((p) => {
      if (parseInt(p.id) === parseInt(id)) {
        p.item = item;
        p.category = category;
        p.quantity = quantity;
      }
      return p;
    });
    // 3. save the newPosts into the local storage
    localStorage.setItem("lists", JSON.stringify(newLists));
    // 4. redirect back to /manage-posts
    navigate("/shoppinglist");
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Shopping List
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>List</h4>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            updateList();
          }}
        >
          <div className="mb-3">
            <label for="list-item" className="form-label">
              Item
            </label>
            <input
              type="text"
              className="form-control"
              id="list-item"
              value={item}
              onChange={(event) => setItem(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label for="category" className="form-label">
              Category
            </label>
            <select
              className="form-control"
              id="item-category"
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
            </select>
          </div>
          <div className="mb-3">
            <label for="list-quantity" className="form-label">
              Quantity
            </label>
            <input
              type="text"
              className="form-control"
              id="list-quantity"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
            />
          </div>
          <div className="text-end">
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Link to="/shoppinglist" className="btn btn-lsecondary btn-sm">
          <i className="bi bi-arrow-left"></i> Back to Home
        </Link>
      </Modal.Footer>
    </Modal>
  );
}

export function Test() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Edit Item
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

// render(<Test />);
