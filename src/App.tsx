import React from 'react';

import { connect } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

// Import Routes all
import { authProtectedRoutes, publicRoutes } from './routes';

// Import all middleware
import Authmiddleware from './routes/route';

// layouts Format
import NonAuthLayout from './components/NonAuthLayout';
import VerticalLayout from './components/VerticalLayout';

// Import scss
import './assets/scss/theme.scss';

import { IState } from './Interfaces';
// import { persistor } from "./store";

// const clearStorage = () => {
//   persistor
//     .purge()
//     .then(() => {
//       console.log('Se ha limpiado el almacenamiento persistente.');
//     })
//     .catch(() => {
//       console.log('No se pudo limpiar el almacenamiento persistente.');
//     });
// };

const App = () => {

  const Layout = VerticalLayout;

  return (
    <React.Fragment>
      <Routes>
        {/* ts-ignore */}
        {publicRoutes.map((route, idx) => {
      
          return (
            <Route
              path={route.path}
              element={
                <>
                  {/*@ts-ignore  */}
                  <NonAuthLayout>{route.component}</NonAuthLayout>
                </>
              }
              key={`${idx}-idx-${route.path}`}
              // exact={true}
              caseSensitive
            />
          );
        })}

        {authProtectedRoutes.map((route, idx) => {
          return (
            <Route
              path={route.path}
              element={
                <Authmiddleware>
                  {/*@ts-ignore  */}
                  <Layout>{route.component}</Layout>
                </Authmiddleware>
              }
              key={`${route.path}-${idx}`}
              // exact={true}
            />
          );
        })}
        {/* </Route> */}
      </Routes>
    </React.Fragment>
  );
};

const mapStateToProps = (state: IState) => {
  return {
    layout: state.layout,
  };
};

export default connect(mapStateToProps, null)(App);
