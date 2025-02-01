import { render, screen } from "@testing-library/react";
import ResultsTable from "./ResultsTable";
;

describe("ResultsTable Component", () => {
  test("renders all financial values correctly", () => {
    const testProps = {
      monthlyPayment: 1000,
      totalRepayment: 12000,
      totalInterest: 2000,
      capital: 10000,
      affordabilityCheck: 800,
    };

    render(<ResultsTable {...testProps} />);

    expect(screen.getByText("Monthly Payment")).toBeInTheDocument();
    expect(screen.getByText("Total Repayment")).toBeInTheDocument();
    expect(screen.getByText("Capital")).toBeInTheDocument();
    expect(screen.getByText("Interest")).toBeInTheDocument();
    expect(screen.getByText("Affordability Check")).toBeInTheDocument();

    expect(screen.getByText("£1,000.00")).toBeInTheDocument();
    expect(screen.getByText("£12,000.00")).toBeInTheDocument();
    expect(screen.getByText("£2,000.00")).toBeInTheDocument();
    expect(screen.getByText("£10,000.00")).toBeInTheDocument();
    expect(screen.getByText("£800.00")).toBeInTheDocument();
  });
});
