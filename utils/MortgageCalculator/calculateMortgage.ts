import { calculateMonthlyPayment } from "./calculateRepayment";

/**
 * Calculates full mortgage details including:
 * - Monthly payments
 * - Total repayment amount
 * - Total interest paid
 * - Affordability check (with interest +3%)
 * - Yearly breakdown of remaining mortgage balance
 *
 * @param price - Property price
 * @param deposit - Deposit amount
 * @param term - Mortgage term in years
 * @param interest - Annual interest rate
 * @returns Mortgage calculation results
 */
export function calculateMortgageDetails(
  price: number,
  deposit: number,
  term: number,
  interest: number
) {
  const monthlyInterestRate = interest / 100 / 12;
  const monthlyPayment = calculateMonthlyPayment(price, deposit, interest, term);
  const totalRepayment = monthlyPayment * term * 12;
  const capital = price - deposit;
  const totalInterest = totalRepayment - capital;
  const affordabilityCheck = calculateMonthlyPayment(price, deposit, interest + 3, term);

  let remainingBalance = capital;
  let yearlyData: { year: number; remainingDebt: number }[] = [];

  // Track loan balance month-by-month
  for (let month = 1; month <= term * 12; month++) {
    const interestPaid = remainingBalance * monthlyInterestRate;
    const principalPaid = monthlyPayment - interestPaid;
    remainingBalance -= principalPaid;

    // Store the remaining balance at the end of each year
    if (month % 12 === 0) {
      yearlyData.push({ year: month / 12, remainingDebt: Math.max(0, remainingBalance) });
    }
  }

  return { monthlyPayment, totalRepayment, capital, totalInterest, affordabilityCheck, yearlyData };
}
