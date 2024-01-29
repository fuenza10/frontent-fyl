import React from 'react';
import { Navigate } from 'react-router-dom';

// Profile
import UserProfile from '../pages/Authentication/user-profile';

// Authentication related pages
import Login from '../pages/Authentication/Login';
import Logout from '../pages/Authentication/Logout';



// Dashboard
import Dashboard from '../pages/Dashboard/index';

import FormCreate from '../pages/Form/FormCreate';
import CompanyCreate from '../pages/Companies/CompanyCreate';
import CompanyPaginatedTable from '../pages/Companies/Table/CompanyPaginatedTable';
import { CompanyUpdate } from '../pages/Companies/CompanyUpdate';
import FormPaginatedTable from '../pages/Form/Table/FormPaginatedTable';
import FormularioViewer from '../pages/Form/ResponseForm/Create';
import FormResponsePaginatedTable from '../pages/Form/AwnserForm/FormPaginatedTable';
import UpdateFormResponse from '../pages/Form/ResponseForm/Update';
import { CreateUser } from '../pages/User/CreateUser';

const authProtectedRoutes = [
  { path: '/dashboard', component: <Dashboard /> },

  // //profile
  { path: '/profile', component: <UserProfile /> },

  // this route should be at the end of all other routes
  { path: '/form-create', component: <FormCreate /> },
  { path: '/form-table', component: <FormPaginatedTable />},
  { path: '/response-form', component: <FormularioViewer />},
  { path: '/form-response-table', component: <FormResponsePaginatedTable />},
  { path: '/form-response-update', component: <UpdateFormResponse />},

  //company

  { path: '/company-table', componet: <CompanyCreate /> },
  { path: '/company-create', component: <CompanyCreate /> },
  { path: '/company-table-1', component: <CompanyPaginatedTable /> },
  { path: '/company-update-1', component: <CompanyUpdate /> },
  { path: '/company-update-1', component: <CompanyUpdate /> },

  //user
  { path: '/user-register', component: <CreateUser /> },


  {
    path: '/',
    exact: true,
    component: <Navigate to='/dashboard' />,
  },
];

const publicRoutes = [
  { path: '/logout', component: <Logout /> },
  { path: '/login', component: <Login /> },

];

export { authProtectedRoutes, publicRoutes };
