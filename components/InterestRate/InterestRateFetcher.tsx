import { useEffect, useState } from "react";

interface InterestRateFetcherProps {
  onFetch: (rate: number) => void;
}

export default function InterestRateFetcher({ onFetch }: InterestRateFetcherProps) {
  const [rate, setRate] = useState<number | null>(null);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    async function fetchInterestRate() {
      try {
        const response = await fetch("/api/interest-rate"); 

        if (!response.ok) throw new Error("Failed to fetch");

        const data = await response.json();
        if (data.interestRate) {
          setRate(data.interestRate);
          onFetch(data.interestRate);
          setError(false);
        } else {
          throw new Error("Invalid data");
        }
      } catch (err) {
        console.error("Error fetching interest rate:", err);
        setError(true);
        setRate(null);
      }
    }

    fetchInterestRate();
  }, [onFetch]);

  return (
    <p>
      {error
        ? "Failed to fetch interest rate"
        : rate !== null
        ? `Current Interest Rate: ${rate}%`
        : "Loading..."}
    </p>
  );
}
