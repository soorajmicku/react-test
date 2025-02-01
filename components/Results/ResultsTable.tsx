import Table from "react-bootstrap/Table";
import { formatCurrency } from "../../utils/formatCurrency";

interface ResultsTableProps {
  monthlyPayment: number;
  totalRepayment: number;
  totalInterest: number;
  capital: number;
  affordabilityCheck: number;
}

export default function ResultsTable({
  monthlyPayment,
  totalRepayment,
  totalInterest,
  capital,
  affordabilityCheck,
}: ResultsTableProps) {
  return (
    <Table striped bordered hover>
      <tbody>
        <tr>
          <td>Monthly Payment</td>
          <td className="text-end">{formatCurrency(monthlyPayment)}</td>
        </tr>
        <tr>
          <td>Total Repayment</td>
          <td className="text-end">{formatCurrency(totalRepayment)}</td>
        </tr>
        <tr>
          <td>Capital</td>
          <td className="text-end">{formatCurrency(capital)}</td>
        </tr>
        <tr>
          <td>Interest</td>
          <td className="text-end">{formatCurrency(totalInterest)}</td>
        </tr>
        <tr>
          <td>Affordability Check</td>
          <td className="text-end">{formatCurrency(affordabilityCheck)}</td>
        </tr>
      </tbody>
    </Table>
  );
}
