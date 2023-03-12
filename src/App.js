import './App.css';
import AppLayout from './components/common/Layout';
import Dashboard from './pages/Dashboard';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import 'antd/dist/reset.css';

const LayoutWrapper = ({element}) => {
  return <div className='App'>
      <AppLayout>
      {element}
    </AppLayout>
    </div>
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/dashboard",
      element: <LayoutWrapper element={<Dashboard/>}/>
    },
    {
      path: "/login",
      element: <LoginPage/>
    }
  ])
  return (
    <RouterProvider router={router} />
  );
}

export default App;
