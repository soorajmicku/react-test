import { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";

interface MortgageFormProps {
  onCalculate: (propertyPrice: number, deposit: number, term: number, interest: number) => void;
}

export default function MortgageForm({ onCalculate }: MortgageFormProps) {
  const [price, setPrice] = useState<number>(100000);
  const [deposit, setDeposit] = useState<number>(5000);
  const [term, setTerm] = useState<number>(15);
  const [interest, setInterest] = useState<number>(5.25);

  const handleSubmit = (event: React.FormEvent) => {
    if (typeof window !== "undefined") {
      event.preventDefault(); 
      onCalculate(price, deposit, term, interest);
    }
  };

  return (
    <Form method="GET" onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Property Price</Form.Label>
        <InputGroup>
          <InputGroup.Text>£</InputGroup.Text>
          <Form.Control
            type="number"
            name="price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            required
          />
        </InputGroup>
      </Form.Group>

      <Form.Group>
        <Form.Label>Deposit</Form.Label>
        <InputGroup>
          <InputGroup.Text>£</InputGroup.Text>
          <Form.Control
            type="number"
            name="deposit"
            value={deposit}
            onChange={(e) => setDeposit(Number(e.target.value))}
            required
          />
        </InputGroup>
      </Form.Group>

      <Form.Group>
        <Form.Label>Mortgage Term</Form.Label>
        <InputGroup>
          <Form.Control
            type="number"
            name="term"
            value={term}
            onChange={(e) => setTerm(Number(e.target.value))}
            required
          />
          <InputGroup.Text>years</InputGroup.Text>
        </InputGroup>
      </Form.Group>

      <Form.Group>
        <Form.Label>Interest Rate</Form.Label>
        <InputGroup>
          <Form.Control
            type="number"
            name="interest"
            value={interest}
            onChange={(e) => setInterest(Number(e.target.value))}
            required
          />
          <InputGroup.Text>%</InputGroup.Text>
        </InputGroup>
      </Form.Group>

      <Button className="mt-3 w-100" variant="primary" type="submit">
        Calculate
      </Button>
    </Form>
  );
}
