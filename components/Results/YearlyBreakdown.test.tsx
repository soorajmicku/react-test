import { render } from "@testing-library/react";
import YearlyBreakdown from "./YearlyBreakdown";

jest.mock("../../utils/formatCurrency", () => ({
  formatCurrency: jest.fn((value) => `£${value.toLocaleString("en-GB", { minimumFractionDigits: 2 })}`),
}));

describe("YearlyBreakdown Component", () => {
  test("renders without crashing and displays data correctly", () => {
    const testData = [{ year: 2024, remainingDebt: 10000 }];
    
    const { getByText } = render(<YearlyBreakdown yearlyData={testData} />);

    expect(getByText("Year")).toBeInTheDocument();
    expect(getByText("Remaining Debt")).toBeInTheDocument();
    expect(getByText("2024")).toBeInTheDocument();
    expect(getByText("£10,000.00")).toBeInTheDocument(); 
  });
});
