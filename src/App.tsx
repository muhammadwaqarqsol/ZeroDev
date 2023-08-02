import { Dashboard } from './Dashboard';

import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate
} from "react-router-dom";
import { SponsoredGasExample } from './examples/SponsoredGasExample';
import { BatchExample } from './examples/BatchExample';
import { NftTransfer } from './examples/NftTransfer';
import {ERC20} from './examples/ERC20'

const links = [
  { path: '/gas-free', label: 'Pay Gas for Users', element: <SponsoredGasExample /> },
  { path: '/bundle', label: 'Bundle Transactions', element: <BatchExample /> },
  { path: '/transfer', label: 'NFT Transfer', element: <NftTransfer /> },
  { path: '/tokenMint', label: 'Mint ERC20 Token', element: <ERC20 /> },

];

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard children={<Outlet />}
      links={links} />,
    errorElement: <Navigate to={'/'} replace />,
    children: [
      {
        index: true,
        element: <Navigate to={links[0].path} replace />
      },
      ...links
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />
}

export default App;
