import { render, screen, fireEvent } from "@testing-library/react";
import MortgageForm from "./MortgageForm";

describe("MortgageForm Component", () => {
  test("renders all input fields with correct default values", async () => {
    render(<MortgageForm onCalculate={jest.fn()} />);

    // Select inputs using placeholder 
    const priceInput = screen.getByDisplayValue(100000);
    const depositInput = screen.getByDisplayValue(5000);
    const termInput = screen.getByDisplayValue(15);
    const interestInput = screen.getByDisplayValue(5.25);

    // Ensure fields are present
    expect(priceInput).toBeInTheDocument();
    expect(depositInput).toBeInTheDocument();
    expect(termInput).toBeInTheDocument();
    expect(interestInput).toBeInTheDocument();
  });

  test("updates input fields on user input", () => {
    render(<MortgageForm onCalculate={jest.fn()} />);

    // Select input fields
    const priceInput = screen.getByDisplayValue(100000);
    const depositInput = screen.getByDisplayValue(5000);
    const termInput = screen.getByDisplayValue(15);
    const interestInput = screen.getByDisplayValue(5.25);

    // Simulate user typing new values
    fireEvent.change(priceInput, { target: { value: "200000" } });
    fireEvent.change(depositInput, { target: { value: "10000" } });
    fireEvent.change(termInput, { target: { value: "20" } });
    fireEvent.change(interestInput, { target: { value: "4.5" } });

    // Assert updated values
    expect(priceInput).toHaveValue(200000);
    expect(depositInput).toHaveValue(10000);
    expect(termInput).toHaveValue(20);
    expect(interestInput).toHaveValue(4.5);
  });

  test("calls onCalculate with correct values when form is submitted", () => {
    const mockOnCalculate = jest.fn();
    render(<MortgageForm onCalculate={mockOnCalculate} />);

    const submitButton = screen.getByRole("button", { name: /calculate/i });
    fireEvent.click(submitButton);

    expect(mockOnCalculate).toHaveBeenCalledWith(100000, 5000, 15, 5.25);
  });
});
