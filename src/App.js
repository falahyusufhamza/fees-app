import './App.css';
import AppLayout from './components/common/Layout';
import Dashboard from './pages/Dashboard';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import 'antd/dist/reset.css';
import ProtectedRoute from './components/common/ProtectedRoute';

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
      path: "/",
      element: <PrivateRouteWrapper component={<PrivateRouteWrapper component={<LayoutWrapper element={<Dashboard/>} />} />}/>
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
