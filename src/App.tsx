import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import routes from './routes';
import { PrivateRoutes } from './components/PrivatRoytes';
import { OnePricePage } from './pages/OnePricePage';
import AffiliatePage from './pages/AffiliatePage/AffiliatePage';

import {
  // MainPage,
  Auth,
  // PricingPage,
  ResetPassPage,
  UsersPage,
  Companies,
  NewFeature,
  Ticketpage,
  ChatPage,
  EditUserPage,
  Orders,
  OrderPage,
  Affiliate,
  EmailEditPage,
  CreatePages,
} from './pages';
import { Layout } from './components';

import './App.module.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PrivateRoutes />}>
        <Route element={<Layout />} path={routes.index}>
          <Route element={<OnePricePage />} path={routes.pricingId} />
          <Route element={<UsersPage />} path={routes.users} />
          <Route element={<EditUserPage />} path={routes.editUserByID} />
          <Route element={<Companies />} path={routes.companies} />
          <Route element={<NewFeature />} path={routes.newFeature} />
          <Route element={<Ticketpage />} path={routes.tickets} />
          <Route element={<ChatPage />} path={routes.ticketId} />
          <Route element={<Orders />} path={routes.orders} />
          <Route element={<OrderPage />} path={routes.orderDetails} />
          <Route element={<Affiliate />} path={routes.affiliates} />
          <Route element={<AffiliatePage />} path={routes.affiliatesId} />
          <Route element={<EmailEditPage/>} path={routes.emailEditor}/>
          <Route element={<CreatePages/>} path={routes.createPages}/>
        </Route>
      </Route>
      <Route element={<Auth />} path='/auth/:id' />
      <Route element={<Auth />} path='/auth' />
      <Route element={<ResetPassPage />} path='/reset-password/:uuid/:token' />
    </>
  )
);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
