import DataProvider from './config/context/DataContext';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <DataProvider>
      <div className="App">
        <Dashboard />
      </div>
    </DataProvider>
  );
}

export default App;
