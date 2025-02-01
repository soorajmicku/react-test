import { calculateMortgageDetails } from "./calculateMortgage";

describe("calculateMortgageDetails", () => {
  test("should calculate correct mortgage details with interest", () => {
    const result = calculateMortgageDetails(300000, 60000, 30, 3.5);
    
    expect(result.monthlyPayment).toBeCloseTo(1077.71, 2);
    expect(result.totalRepayment).toBeCloseTo(387974.61, 2);
    expect(result.totalInterest).toBeCloseTo(147974.61, 2);
    expect(result.capital).toBe(240000);
    expect(result.affordabilityCheck).toBeCloseTo(1516.96, 2);
    expect(result.yearlyData.length).toBe(30);
    expect(result.yearlyData[0].year).toBe(1);
    expect(result.yearlyData[29].year).toBe(30);
  });

  test("should calculate correct mortgage details without interest", () => {
    const result = calculateMortgageDetails(300000, 60000, 30, 0);
    
    expect(result.monthlyPayment).toBeCloseTo(666.67, 2);
    expect(result.totalRepayment).toBeCloseTo(240000, 2);
    expect(result.totalInterest).toBeCloseTo(0, 2);
    expect(result.capital).toBe(240000);
    expect(result.affordabilityCheck).toBeCloseTo(1011.85, 2);
  });

  test("should calculate correct mortgage details for a 15-year term", () => {
    const result = calculateMortgageDetails(300000, 60000, 15, 3.5);
  
    expect(result.monthlyPayment).toBeCloseTo(1715.72, 2);
    expect(result.totalRepayment).toBeCloseTo(308829.26, 2);
    expect(result.totalInterest).toBeCloseTo(68829.26, 2);
    expect(result.capital).toBe(240000);
    expect(result.affordabilityCheck).toBeCloseTo(2090.66, 2);

    expect(result.yearlyData.length).toBe(15);
    expect(result.yearlyData[14].remainingDebt).toBeCloseTo(0, 2);
  });
});