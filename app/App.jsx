import { Route, Router, useLocation } from 'wouter'

import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Lost from "./pages/Lost";
import Found from "./pages/Found";

function App() {
  return (
    <div className="min-h-screen font-sans antialiased flex flex-col">
      <Header />

      <Content>
        <Router>
          <Route path="/" component={Home} />
          <Route path="/register" component={Register} />
          <Route path="/lost" component={Lost} />
          <Route path="/found" component={Found} />
        </Router>
      </Content>

      <Footer />
    </div>
  );
}

export default App;