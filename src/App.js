import './App.css';
import AppLayout from './components/common/Layout';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <div className="App">
      <AppLayout>
        <Dashboard/>
      </AppLayout>
    </div>
  );
}

export default App;
