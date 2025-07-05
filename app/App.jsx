import { Route, Router, useLocation } from 'wouter'

import Header from "./components/Header";
import Content from "./components/Content";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Lost from "./pages/Lost";
import Found from "./pages/Found";
import Items from "./pages/Items";
import Messages from "./pages/Messages";

// Import XMTP provider
import { XMTPProvider } from "./lib/xmtp";

function App() {
  return (
    <div className="min-h-screen font-sans antialiased flex flex-col">
      <Header />

      <Content>
        <XMTPProvider>
          <Router>
            <Route path="/" component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/lost/:secretHash" component={Lost} />
            <Route path="/found/:secretHash/:secret" component={Found} />
            <Route path="/items" component={Items} />
            <Route path="/messages" component={Messages} />
          </Router>
        </XMTPProvider>
      </Content>

      <Footer />
    </div>
  );
}

export default App;