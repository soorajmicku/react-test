import handler from "../../pages/api/mortgage"; 
import { calculateMortgageDetails } from "../../utils/MortgageCalculator/calculateMortgage";

jest.mock("../../utils/MortgageCalculator/calculateMortgage");

describe("POST /api/mortgage", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    req = {
      method: "POST",
      body: {
        price: "300000",
        deposit: "60000",
        term: "30",
        interest: "3.5",
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

  
    (calculateMortgageDetails as jest.Mock).mockReturnValue({
      monthlyPayment: 1077.71,
      totalRepayment: 388775.60,
      totalInterest: 148775.60,
      affordabilityCheck: 1510.02,
      yearlyData: [{ year: 1, remainingDebt: 235394.09 }],
    });
  });

  test("should return 200 and calculated mortgage details", async () => {
    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      monthlyPayment: 1077.71,
      totalRepayment: 388775.60,
      totalInterest: 148775.60,
      affordabilityCheck: 1510.02,
      yearlyData: [{ year: 1, remainingDebt: 235394.09 }],
    });
  });

  test("should return 400 for missing fields", async () => {
    req.body = {}; // Empty request

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid input values. All values must be greater than zero." });
  });

  test("should return 405 for non-POST methods", async () => {
    req.method = "GET";

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ error: "Method Not Allowed" });
  });

  test("should return 400 for input error", async () => {
    (calculateMortgageDetails as jest.Mock).mockImplementation(() => {
      throw new Error("Calculation Error");
    });

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Calculation Error" });
  });
});
