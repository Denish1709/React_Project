// // import { Link } from "react-router-dom";
// // import Button from "react-bootstrap/Button";
// // import Card from "react-bootstrap/Card";
// // import { BsTypeH1 } from "react-icons/bs";

// import { useState, useEffect, useMemo } from "react";
// import { nanoid } from "nanoid";
// import { Link } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";
// import Table from "react-bootstrap/Table";
// import Form from "react-bootstrap/Form";
// import { BsTrash } from "react-icons/bs";

// export default function Home() {
//   // const shoppings = JSON.parse(localStorage.getItem("shoppingList"));
//   const [shopping] = useState("");

//   useEffect(() => {
//     const shoppings = JSON.parse(localStorage.getItem("shoppingList"));
//     if (shoppings) {
//       setList(shoppings);
//     }
//   }, []);

//   return (
//     <div className="container mx-auto my-5">
//       <h1 className="mb-4 text-center">shopping List</h1>
//       {shoppings
//         ? shoppings.map((shopping) => {
//             return (
//               <div key={shopping.id} className="card mb-2">
//                 <div className="card-body">
//                   <Form.Select
//                     className="mb-4"
//                     value={shoppings.filter}
//                     onChange={(event) => {
//                       shoppings.setFilter(event.target.value);
//                     }}
//                   >
//                     <option value="">All category</option>
//                     <option value="vegetables">Vegetables</option>
//                     <option value="wetItem">Wet Items</option>
//                     <option value="drinks">Drinks</option>
//                     <option value="bread">Bread</option>
//                     <option value="fruits">Fruits</option>
//                     <option value="household">Household Supplies</option>
//                     <option value="others">Others</option>
//                   </Form.Select>
//                   <Table striped bordered hover>
//                     <thead>
//                       <tr>
//                         <th>
//                           <div className="text-center">
//                             <Form.Check
//                               type="checkbox"
//                               checked={shoppings.checkAll}
//                               disabled={
//                                 shoppings.list && shoppings.list.length > 0
//                                   ? false
//                                   : true
//                               }
//                               onChange={(event) => {
//                                 shoppings.checkBoxAll(event);
//                               }}
//                             />
//                           </div>
//                         </th>
//                         <th>
//                           <div className="text-center">Items</div>
//                         </th>
//                         <th>
//                           <div className="text-center">Category</div>
//                         </th>
//                         <th>
//                           <div className="text-center">Quantity</div>
//                         </th>
//                         <th>
//                           <div className="text-center">
//                             Actions
//                             <Button
//                               variant="danger"
//                               size="sm"
//                               className="ms-2"
//                               disabled={
//                                 shoppings.checkedList &&
//                                 shoppings.checkedList.length > 0
//                                   ? false
//                                   : true
//                               }
//                               onClick={(event) => {
//                                 event.preventDefault();
//                                 shoppings.deleteCheckItems();
//                               }}
//                             >
//                               <BsTrash />
//                             </Button>
//                           </div>
//                         </th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {shoppings.filteredList.length > 0
//                         ? shoppings.filteredList.map((i) => {
//                             return (
//                               <tr key={i.id}>
//                                 <td>
//                                   <div className="text-center">
//                                     <Form.Check
//                                       checked={
//                                         shoppings.checkedList &&
//                                         shoppings.checkedList.includes(i.id)
//                                           ? true
//                                           : false
//                                       }
//                                       type="checkbox"
//                                       onChange={(event) => {
//                                         shoppings.checkboxOne(event, i.id);
//                                       }}
//                                     />
//                                   </div>
//                                 </td>
//                                 <td>
//                                   <div className="text-center">{i.item}</div>
//                                 </td>
//                                 <td>
//                                   <div className="text-center">
//                                     {i.category}
//                                   </div>
//                                 </td>
//                                 <td>
//                                   <div className="text-center">
//                                     {i.quantity}
//                                   </div>
//                                 </td>
//                                 <td>
//                                   <div className="text-center">
//                                     <Button
//                                       variant="danger"
//                                       size="sm"
//                                       onClick={(event) => {
//                                         event.preventDefault();
//                                         shoppings.deleteShoppingList(i.id);
//                                       }}
//                                     >
//                                       <BsTrash />
//                                     </Button>
//                                   </div>
//                                 </td>
//                               </tr>
//                             );
//                           })
//                         : []}
//                     </tbody>
//                   </Table>
//                 </div>
//               </div>
//             );
//           })
//         : null}
//       <Link
//         to="/shoppinglist"
//         className="pt-2 text-center btn btn-secondary btn-sm"
//       >
//         Add List
//       </Link>
//     </div>
//   );
// }
