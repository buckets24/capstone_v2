## Tech Stack

1. Vercel
2. Next.js

### Testing

- Jest & Testing Library React for unit testing
- Cypress E2E testing (or Playwright - for discussion)

### UI Library

- still under discussion
- external private ui library - for discussion

### Data Fetching

- axios
- react-query

## Setup Local ENV

Create `.env.local` add add the following:

```
  OMH_API_KEY: secret key value
  OMH_ELASTICSEARCH_KEY: elasticsearch key value
  ...other keys
```

## Running the app locally

1. Clone the repository.
2. Install dependencies with `yarn`.
3. Run `yarn dev` and the application will be running on `localhost:3000`.

### Running Cypress

1. Run the app locally with above instructions.
2. In a different tab run `yarn cypress:open`

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js
  features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the
[Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
from the creators of Next.js.
