import "./shopping.css";
import { useState, useEffect, useMemo } from "react";
import { nanoid } from "nanoid";
// import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { BsTrash } from "react-icons/bs";
import { AiOutlineUnorderedList, AiOutlineEdit } from "react-icons/ai";
import Modal from "react-bootstrap/Modal";

// edit button
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import { useState, useEffect } from "react";
import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
// edit button

export default function ShoppingLists() {
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [filter, setFilter] = useState("");
  const [list, setList] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [checkAll, setCheckAll] = useState(false);
  // edit button
  const [modalShow, setModalShow] = React.useState(false);

  useEffect(() => {
    const shoppingList = JSON.parse(localStorage.getItem("shoppingList"));
    if (shoppingList) {
      setList(shoppingList);
    }
  }, []);

  const filteredList = useMemo(() => {
    return list.filter((i) => (filter === "" ? true : i.category === filter));
  }, [filter, list]);

  const deleteShoppingList = (id) => {
    const newList = list.filter((i) => i.id !== id);
    setList(newList);
    localStorage.setItem("shoppingList", JSON.stringify(newList));
  };

  const checkBoxAll = (event) => {
    if (event.target.checked) {
      const newCheckedList = [];
      list.forEach((i) => {
        newCheckedList.push(i.id);
      });
      setCheckedList(newCheckedList);
      setCheckAll(true);
    } else {
      setCheckedList([]);
      setCheckAll(false);
    }
  };

  const checkboxOne = (event, id) => {
    if (event.target.checked) {
      const newCheckedList = [...checkedList];
      newCheckedList.push(id);
      setCheckedList(newCheckedList);
    } else {
      const newCheckedList = checkedList.filter((i) => i !== id);
      setCheckedList(newCheckedList);
    }
  };

  const deleteCheckItems = () => {
    const newList = list.filter((i) => {
      if (checkedList && checkedList.includes(i.id)) {
        return false;
      }
      return true;
    });
    setList(newList);
    localStorage.setItem("shoppingList", JSON.stringify(newList));
    setCheckAll(false);
  };

  return (
    <div className="container mt-5 mx-auto" style={{ maxwidth: "800px" }}>
      <Card>
        <Card.Body>
          <Card.Title className="text-center">
            <h2>
              <AiOutlineUnorderedList /> Shopping List
            </h2>
          </Card.Title>
          <div class="d-grid gap-2 d-md-flex justify-content-md-end">
            <>
              <Button
                variant="primary"
                size="sm"
                className="me-2 mb-4"
                onClick={() => setModalShow(true)}
              >
                Add New Item
              </Button>

              <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
              />
            </>
          </div>
          <Form.Select
            className="mb-4"
            value={filter}
            onChange={(event) => {
              setFilter(event.target.value);
            }}
          >
            <option value="">All category</option>
            <option value="vegetables">Vegetables</option>
            <option value="wet Item">Wet Items</option>
            <option value="drinks">Drinks</option>
            <option value="bread">Bread</option>
            <option value="fruits">Fruits</option>
            <option value="household">Household Supplies</option>
            <option value="others">Others</option>
          </Form.Select>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>
                  <div className="text-center">
                    <Form.Check
                      type="checkbox"
                      checked={checkAll}
                      disabled={list && list.length > 0 ? false : true}
                      onChange={(event) => {
                        checkBoxAll(event);
                      }}
                    />
                  </div>
                </th>
                <th>
                  <div className="text-center">Items</div>
                </th>
                <th>
                  <div className="text-center">Category</div>
                </th>
                <th>
                  <div className="text-center">Quantity</div>
                </th>
                <th>
                  <div className="text-center">
                    Actions
                    <Button
                      variant="danger"
                      size="sm"
                      className="ms-2"
                      disabled={
                        checkedList && checkedList.length > 0 ? false : true
                      }
                      onClick={(event) => {
                        event.preventDefault();
                        deleteCheckItems();
                      }}
                    >
                      <BsTrash />
                    </Button>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredList.length > 0 ? (
                filteredList.map((i) => {
                  return (
                    <tr key={i.id}>
                      <td>
                        <div className="text-center">
                          <Form.Check
                            checked={
                              checkedList && checkedList.includes(i.id)
                                ? true
                                : false
                            }
                            type="checkbox"
                            onChange={(event) => {
                              checkboxOne(event, i.id);
                            }}
                          />
                        </div>
                      </td>
                      <td>
                        <div className="text-center">{i.item}</div>
                      </td>
                      <td>
                        <div className="text-center">{i.category}</div>
                      </td>
                      <td>
                        <div className="text-center">{i.quantity}</div>
                      </td>
                      <td>
                        <div className="text-center">
                          {/* <Link
                            to={`/edit/${i.id}`}
                            className="btn btn-secondary btn-sm me-2"
                          >
                            <i className="bi bi-pencil"></i>
                          </Link> */}

                          {/* <Link
                            // to={`/test/${i.id}`}
                            className="btn btn-secondary btn-sm me-2"
                            variant="primary"
                            onClick={() => setModalShow(true)}
                            // value={`${i.id}`}
                          >
                            <MyVerticallyCenteredModal
                              show={modalShow}
                              onHide={() => setModalShow(false)}
                            />
                            <i className="bi bi-pencil"></i>
                          </Link> */}

                          <>
                            <Link
                              to={`/edit/${i.id}`}
                              className="me-2 fs-5 text-secondary"
                              variant=""
                              size="sm"
                            >
                              <Button variant="secondary" size="sm">
                                <AiOutlineEdit />
                              </Button>
                            </Link>

                            <MyVerticallyCenteredModal
                              show={modalShow}
                              onHide={() => setModalShow(false)}
                            />
                          </>

                          <Button
                            variant="danger"
                            size="sm"
                            className="me-2"
                            onClick={(event) => {
                              event.preventDefault();
                              deleteShoppingList(i.id);
                            }}
                          >
                            <BsTrash />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="text-center">
                    <img src="https://i0.wp.com/www.huratips.com/wp-content/uploads/2019/04/empty-cart.png?fit=603%2C288&ssl=1" />
                    <h1 className="text-center pe-5 text-secondary">
                      NO ITEM ADDED YET
                    </h1>
                  </td>
                  {/* <td colSpan={5}>No Items added yet.</td> */}
                </tr>
              )}
            </tbody>
          </Table>
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

export function MyVerticallyCenteredModal(props) {
  const navigate = useNavigate();
  const [item, setItem] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
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

    // navigate("/shoppinglist");
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
            addShoppingList();
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
            <Button type="submit" className="btn btn-primary">
              Add
            </Button>
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
