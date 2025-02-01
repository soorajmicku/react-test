import { NextApiRequest, NextApiResponse } from "next";
import { calculateMortgageDetails } from "../../utils/MortgageCalculator/calculateMortgage";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { price, deposit, term, interest } = req.body;

    if (!price || !deposit || !term || !interest) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const results = calculateMortgageDetails(
      parseFloat(price),
      parseFloat(deposit),
      parseInt(term),
      parseFloat(interest)
    );

    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
