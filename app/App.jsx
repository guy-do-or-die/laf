import { Route, Router, Redirect } from 'wouter'

import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";

import Landing from "./pages/Landing";
import Register from "./pages/Register";
import Lost from "./pages/Lost";
import Found from "./pages/Found";
import Items from "./pages/Items";
import User from "./pages/User";

import { ROUTE_PATTERNS } from "./constants/routes";


function App() {
  return (
    <div className="min-h-screen font-sans antialiased flex flex-col">
      <Header />

      <Content>
        <Router>
          <Route path={ROUTE_PATTERNS.ROOT}>
            <Redirect to={ROUTE_PATTERNS.LANDING} />
          </Route>
          <Route path={ROUTE_PATTERNS.LANDING} component={Landing} />
          <Route path={ROUTE_PATTERNS.REGISTER} component={Register} />
          <Route path={ROUTE_PATTERNS.LOST_ITEM} component={Lost} />
          <Route path={ROUTE_PATTERNS.FOUND_ITEM} component={Found} />
          <Route path={ROUTE_PATTERNS.ITEMS} component={Items} />
          <Route path={ROUTE_PATTERNS.USER} component={User} />
        </Router>
      </Content>

      <Footer />
    </div>
  );
}

export default App;