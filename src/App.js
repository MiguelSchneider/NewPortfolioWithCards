/**
 * App.js
 *
 * Root component of the application.
 * Applies global MUI theming (via ThemeProvider) and centers the main opportunities list.
 */
import OpportunitiesList from './components/OpportunitiesList';
import opportunities from './data/OpportunitiesJSON';

// App component: wraps OpportunitiesList in theme and positions it in the viewport.
function App() {
  // Render the OpportunitiesList as the primary UI.
  return (
      <OpportunitiesList opportunities={opportunities} />
  );
}

export default App;
