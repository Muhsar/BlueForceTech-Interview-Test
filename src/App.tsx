import { BrowserRouter, Switch, Route } from "react-router-dom";
import React from "react"
import { AnimatePresence, AnimateSharedLayout } from "framer-motion";
import { Helmet } from "react-helmet";
// import { Helmet } from 'react';
// import useToast from './Alerts';
import Home from './pages/Home';
import Login from './pages/Login';
import Admin from './pages/Admin';
import useToast from "Alerts";

export const ToastContext = React.createContext<any>(null)
function App() {
const { showAlert, Toast } = useToast();
const UserRoutes = ({location}) => (
  <Switch location={location} key={location.pathname}>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
            </Switch>
)
const AdminRoutes = ({location}) => (
  <Switch location={location} key={location.pathname}>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/admin" component={Admin} />
            </Switch>
)
  return (
    <>
      <Helmet>
        <title>BlueForceTech</title>
        <div>
          <meta name="description" content="Top Tech Provider For Weddings" />
          <meta
            property="og:description"
            content="Top Tech Provider For Weddings"
          />
          <meta property="og:title" content="Peng Wedding" />
          <meta
            name="twitter:description"
            content="Top Tech Provider For Weddings"
          />
          <meta name="twitter:title" content="Peng Wedding" />
          <meta property="og:type" content="website" />
        </div>
      </Helmet>
          <ToastContext.Provider value={showAlert}>
      <AnimateSharedLayout>
        <BrowserRouter>
        <Route
        render={({location}) => (
          <AnimatePresence exitBeforeEnter>
          <Toast />
            {
              localStorage?.token && localStorage?.token!==undefined ? <AdminRoutes location={location} /> : <UserRoutes location={location} />
            }
          </AnimatePresence>
        )}
         />
        </BrowserRouter>
      </AnimateSharedLayout>
          </ToastContext.Provider>
    </>
  );
}

export default App;
