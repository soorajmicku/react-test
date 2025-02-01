import handler from "./interest-rate";

global.fetch = jest.fn();

describe("GET /api/interestRate", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    req = { method: "GET" };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    jest.clearAllMocks();

    jest.spyOn(console, "error").mockImplementation(() => {});
    process.env.NEXT_PUBLIC_BOE_API_URL = "https://www.bankofengland.co.uk/boeapps/iadb/fromshowcolumns.asp?csv.x=yes&Datefrom=18/Jan/2024&Dateto=18/Feb/2024&SeriesCodes=IUMABEDR&CSVF=TN&UsingCodes=Y&VPD=Y&VFD=N";
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      text: jest.fn().mockResolvedValue(`Date,Rate\n18/Feb/2024,5.25\n`),
    });
  });

  afterEach(() => {
    (console.error as jest.Mock).mockRestore();
  });

  test("should return the correct interest rate", async () => {
    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ interestRate: 5.25 });
  });

  test("should return 500 if fetch fails", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      text: jest.fn().mockResolvedValue("")
    });

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Failed to fetch interest rate" });
  });

  test("should return 500 if CSV format is invalid", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      text: jest.fn().mockResolvedValue(`Date\n`), // Invalid CSV
    });

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid data format" });
  });

  test("should return 500 if extracted rate is NaN", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      text: jest.fn().mockResolvedValue(`Date,Rate\n18/Feb/2024,INVALID\n`), 
    });

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Invalid data format" });
  });

  test("should return 500 on unexpected error", async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() => Promise.reject(new Error("Unexpected failure")));

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Failed to fetch interest rate" });
  });
});
