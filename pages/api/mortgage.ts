import { NextApiRequest, NextApiResponse } from "next";
import { calculateMortgageDetails } from "../../utils/MortgageCalculator/calculateMortgage";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { price, deposit, term, interest } = req.body;

    if (!price || !deposit || !term || !interest || price <= 0 || deposit <= 0 || term <= 0 || interest <= 0) {
      throw new Error("Invalid input values. All values must be greater than zero.");
    }

    const results = calculateMortgageDetails(
      parseFloat(price),
      parseFloat(deposit),
      parseInt(term),
      parseFloat(interest)
    );

    return res.status(200).json(results);
  } catch (error: unknown) {
    console.error("Error processing request:", error);
    return res.status(400).json({ error: error instanceof Error ? error.message : "An error occurred" });
  }
}