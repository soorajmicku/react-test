import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_BOE_API_URL;
    
    if (!apiUrl) {
      return res.status(500).json({ error: "API URL is not configured" });
    }
    const response = await fetch(
        apiUrl
    );

    if (!response.ok) {
      throw new Error("Failed to fetch interest rate data");
    }

    const textData = await response.text();
    const rows = textData.split("\n");

    if (rows.length < 2) {
      return res.status(500).json({ error: "Invalid CSV format" });
    }

    const columns = rows[1].split(",");
    const extractedRate = parseFloat(columns[1]);

    if (isNaN(extractedRate)) {
      return res.status(500).json({ error: "Invalid data format" });
    }

    res.status(200).json({ interestRate: extractedRate });
  } catch (error) {
    console.error("Error fetching interest rate:", error);
    res.status(500).json({ error: "Failed to fetch interest rate" });
  }
}
