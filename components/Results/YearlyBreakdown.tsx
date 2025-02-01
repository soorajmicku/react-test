import Table from "react-bootstrap/Table";
import { formatCurrency } from "../../utils/formatCurrency";

interface YearlyBreakdownProps {
  yearlyData: { year: number; remainingDebt: number }[];
}

export default function YearlyBreakdown({ yearlyData }: YearlyBreakdownProps) {
  return (
    <Table bordered hover size="sm">
      <thead>
        <tr>
          <th>Year</th>
          <th>Remaining Debt</th>
        </tr>
      </thead>
      <tbody>
        {yearlyData.map(({ year, remainingDebt }) => (
          <tr key={year}>
            <td>{year}</td>
            <td>{formatCurrency(remainingDebt)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
