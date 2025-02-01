import { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import MortgageForm from "../components/MortgageForm/MortgageForm";
import ResultsTable from "../components/Results/ResultsTable";
import YearlyBreakdown from "../components/Results/YearlyBreakdown";
import InterestRateFetcher from "../components/InterestRate/InterestRateFetcher";

interface MortgageResults {
  monthlyPayment: number;
  totalRepayment: number;
  capital: number;
  totalInterest: number;
  affordabilityCheck: number;
  yearlyData: { year: number; remainingDebt: number }[];
}

export default function MortgageCalculator() {
  const [results, setResults] = useState<MortgageResults | null>(null);

  /** 
   * Calls the API to calculate mortgage results
   */
  const handleCalculate = async (price: number, deposit: number, term: number, interest: number) => {
    try {
      const response = await fetch("/api/mortgage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ price, deposit, term, interest }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch mortgage calculations");
      }

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching mortgage results:", error);
    }
  };

  return (
    <Container>
      {/* Fetch and display the latest interest rate */}
      <InterestRateFetcher onFetch={(rate) => console.log("Fetched Interest Rate:", rate)} />

      <Row className="mt-4">
        <Col md="auto">
          <MortgageForm onCalculate={handleCalculate} />
        </Col>

        {/* Display Results */}
        {results && (
          <>
            <Col md="auto">
              <h2 className="pb-3">Results</h2>
              <ResultsTable {...results} />
            </Col>

            <Col md="auto">
              <h2 className="pb-3">Yearly Breakdown</h2>
              <YearlyBreakdown yearlyData={results.yearlyData} />
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
}
