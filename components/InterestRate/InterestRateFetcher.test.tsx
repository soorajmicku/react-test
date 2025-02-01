import { render, screen, waitFor } from "@testing-library/react";
import InterestRateFetcher from "./InterestRateFetcher";
import React from "react";
global.fetch = jest.fn();

describe("InterestRateFetcher Component", () => {
  let mockOnFetch: jest.Mock;
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    mockOnFetch = jest.fn();
    
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore(); 
  });

  test("should display interest rate on successful fetch", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({ interestRate: 5.25 }),
    });

    render(<InterestRateFetcher onFetch={mockOnFetch} />);

    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => expect(mockOnFetch).toHaveBeenCalledWith(5.25));
    expect(screen.getByText("Current Interest Rate: 5.25%")).toBeInTheDocument();
  });

  test("should show error message when fetch fails", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Failed to fetch"));

    render(<InterestRateFetcher onFetch={mockOnFetch} />);

    await waitFor(() =>
      expect(screen.getByText("Failed to fetch interest rate")).toBeInTheDocument()
    );
  });

  test("should show error message when data is invalid", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValue({}), // Missing interestRate
    });

    render(<InterestRateFetcher onFetch={mockOnFetch} />);

    await waitFor(() =>
      expect(screen.getByText("Failed to fetch interest rate")).toBeInTheDocument()
    );
  });

  test("should handle fetch throwing an error", async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    render(<InterestRateFetcher onFetch={mockOnFetch} />);

    await waitFor(() =>
      expect(screen.getByText("Failed to fetch interest rate")).toBeInTheDocument()
    );
  });
});
