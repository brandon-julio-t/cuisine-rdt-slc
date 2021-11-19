import React from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Create from './pages/Create';
import Detail from './pages/Detail';
import Home from './pages/Home';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/create', element: <Create /> },
      { path: '/detail/:id', element: <Detail /> },
    ],
  },
];

const App = () => useRoutes(routes);

export default App;
