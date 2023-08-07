import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function Home() {
  return (
    <div
      className="container mt-5 mx-auto"
      style={{
        maxWidth: "800px",
      }}
    >
      <Card>
        <Card.Body>
          <Card.Title>Summary Dashboard</Card.Title>
          <Card.Text>This is the summary of your personal budget</Card.Text>
          <Link to="/shoppinglist" className="btn btn-primary me-2">
            Add Item
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
}
