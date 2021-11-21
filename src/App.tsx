import React from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Detail from './pages/Detail';
import Home from './pages/home/Home';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: '/detail/:id', element: <Detail /> },
    ],
  },
];

const App = () => useRoutes(routes);

export default App;
