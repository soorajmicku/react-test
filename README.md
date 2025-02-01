This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To run tests:

```bash
npm run test
```

## Overview

This is a mortgage calculator application built with Next.js and React. The application calculates and displays the monthly mortgage payments, total payments over the full term, and total interest payments based on user inputs. Additionally, it dynamically fetches the interest rate from the Bank of England's website.

## Features Implemented

- **Mortgage Calculation**:
  - Monthly mortgage payments.
  - Total repayment amount over the mortgage term.
  - Total interest paid over the mortgage term.
  - Yearly breakdown of payments.
  - Affordability check by calculating the payment if the interest rate increases by 3%.
- **Dynamic Interest Rate Fetching**:
  - Retrieves the latest interest rate from the Bank of England.
  - API call handled in `pages/api/interest-rate.ts`.
- **TypeScript for Type Safety**.
- **Unit Tests**:
  - Comprehensive tests for components and logic.
  - Uses Jest and React Testing Library.
- **No-JS Support**:
  - Ensures the calculator works even if JavaScript is disabled.

## How to Review

1. **Run the Application**:
   - Start the development server using `npm run dev`.
   - Navigate to `http://localhost:3000` and test the mortgage calculator.

2. **Check API Implementation**:
   - Review `pages/api/interest-rate.ts` for dynamic interest rate fetching.
   - The API uses environment variable  (`NEXT_PUBLIC_BOE_API_URL`).

3. **Review Test Coverage**:
   - Run `npm run test` to verify unit tests.
   - Tests are implemented for mortgage calculation logic and API handling.

4. **No-JS Functionality**:
   - The form gracefully degrades when JavaScript is disabled, allowing basic mortgage calculations.

## Environment Variables Setup

Before running the application, set up the required environment variable:

```env
NEXT_PUBLIC_BOE_API_URL=https://www.bankofengland.co.uk/boeapps/iadb/fromshowcolumns.asp?csv.x=yes&Datefrom=18/Jan/2024&Dateto=18/Feb/2024&SeriesCodes=IUMABEDR&CSVF=TN&UsingCodes=Y&VPD=Y&VFD=N
```

This ensures that the application dynamically fetches the latest interest rate.

