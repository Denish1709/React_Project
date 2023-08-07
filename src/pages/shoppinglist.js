import { useState, useEffect, useMemo } from "react";
import { nanoid } from "nanoid";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import { BsTrash } from "react-icons/bs";

export default function ShoppingLists() {
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [category, setCategory] = useState("");
  const [filter, setFilter] = useState("");
  const [list, setList] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [checkAll, setCheckAll] = useState([false]);

  useEffect(() => {
    const shoppingList = JSON.parse(localStorage.getItem("shoppingList"));
    if (shoppingList) {
      setList(shoppingList);
    }
  }, []);

  const filteredList = useMemo(() => {
    return list.filter((i) => (filter === "" ? true : i.category === filter));
  }, [filter, list]);

  const addShoppingList = () => {
    const newList = [...list];

    if (item && quantity) {
      newList.push({
        id: nanoid(),
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
  };

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

  // const calculatedTotal = () => {
  //   let total = 0;
  //   list
  //     .filter((i) => (filter === "" ? true : i.category === filter))
  //     .forEach((i) => {
  //       total += parseInt(i.quantity);
  //     });
  //   return total;
  // };

  return (
    <div className="container mt-5 mx-auto" style={{ maxwidth: "800px" }}>
      <Card>
        <Card.Body>
          <Card.Title className="text-center">
            <h2>Shopping List</h2>
          </Card.Title>
          <Form.Select
            className="mb-4"
            value={filter}
            onChange={(event) => {
              setFilter(event.target.value);
            }}
          >
            <option value="">All category</option>
            <option value="vegetables">Vegetables</option>
            <option value="wetItem">Wet Items</option>
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
                  <Form.Check
                    type="checkbox"
                    checked={checkAll}
                    disabled={list && list.length > 0 ? false : true}
                    onChange={(event) => {
                      checkBoxAll(event);
                    }}
                  />
                </th>
                <th>Item</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>
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
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredList.length > 0
                ? filteredList.map((i) => {
                    return (
                      <tr key={i.id}>
                        <td>
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
                        </td>
                        <td>{i.item}</td>
                        <td>{i.category}</td>
                        <td>{i.quantity}</td>
                        <td>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={(event) => {
                              event.preventDefault();
                              deleteShoppingList(i.id);
                            }}
                          >
                            <BsTrash />
                          </Button>
                        </td>
                      </tr>
                    );
                  })
                : // (
                  //   <tr>
                  //     <td>Total</td>
                  //     <td>${calculatedTotal()}</td>
                  //     <td></td>
                  //   </tr>
                  // )
                  []}
            </tbody>
          </Table>
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
                <option>Select a category</option>
                <option value="">All category</option>
                <option value="vegetables">Vegetables</option>
                <option value="wetItem">Wet Items</option>
                <option value="drinks">Drinks</option>
                <option value="bread">Bread</option>
                <option value="fruits">Fruits</option>
                <option value="household">Household Supplies</option>
                <option value="others">Others</option>
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
      <Link to="/" className="pt-2 text-center">
        Back To Home
      </Link>
    </div>
  );
}
