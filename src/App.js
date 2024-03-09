import './App.css';
import AppLayout from './components/common/Layout';
import Students from './pages/Students';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import 'antd/dist/reset.css';
import ProtectedRoute from './components/common/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import NoContent from './pages/NoContent';
import Invoices from './pages/Invoices';

const LayoutWrapper = ({element}) => {
  return <div className='App'>
      <AppLayout>
      {element}
    </AppLayout>
    </div>
}

const PrivateRouteWrapper = ({component}) => {
  return <ProtectedRoute component={component}  />
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/passengers",
      element: <LayoutWrapper element={<Students/>} />
    },
    {
      path: "/invoices",
      element: <LayoutWrapper element={<Invoices/>} />
    },
    {
      path: "/login",
      element: <LoginPage/>
    },
    {
      path: "/",
      element: <LayoutWrapper element={<NoContent/>} />
    },
  ])
  return (
    <RouterProvider router={router} />
  );
}

export default App;
