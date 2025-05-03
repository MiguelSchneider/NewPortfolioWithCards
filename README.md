# Portfolio Cards Demo

A React application that presents grouped investment opportunities in a clean, card-based portfolio view. Users can browse multiple chains, view key details, and initiate investments directly from the interface.

## Features

- **Grouped Opportunities**: Automatically groups related opportunities by `metaOpportunityId` or `opportunityId`.
- **Multi-Chain Support**: Select between chains when an opportunity spans multiple networks.
- **Detailed Card View**: View images, labels (e.g., Always Open, Qualified), network icons, and token/issuer information at a glance.
- **Dynamic Data**: Displays description, key features (e.g., minimum investment), and custom tags for each opportunity.
- **Responsive Layout**: Adjusts card grid for different screen sizes.

## Demo

![Portfolio Cards Demo](https://734htw-3000.csb.app/)

## Getting Started

These instructions will help you run the project locally.

### Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x) or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/newPortfolioWithCards.git
   ```
2. Navigate into the project directory:
   ```bash
   cd newPortfolioWithCards
   ```
3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

### Available Scripts

In the project directory, you can run:

- `npm start`  
  Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
- `npm test`  
  Launches the test runner in interactive watch mode.
- `npm run build`  
  Builds the app for production to the `build` folder.
- `npm run eject`  
  Ejects from Create React App setup (one-way operation).

## Project Structure

```plaintext
newPortfolioWithCards/
├── src/
│   ├── components/
│   │   ├── OpportunitiesList.jsx
│   │   └── OpportunityGroupCard.jsx
│   ├── data/
│   │   └── OpportunitiesJSON.js
│   └── index.js
├── public/
├── .gitignore
├── package.json
└── README.md
```

## Contributing

1. Fork this repository.
2. Create a feature branch: `git checkout -b feature/NewFeature`.
3. Commit your changes: `git commit -m "Add NewFeature"`.
4. Push to the branch: `git push origin feature/NewFeature`.
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Uses [Create React App](https://github.com/facebook/create-react-app) for setup.
- Styled with Material-UI.
