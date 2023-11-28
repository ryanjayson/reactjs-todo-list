import ReactDOM from "react-dom/client";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Register from "./pages/Signup";
import Dashboard from "./pages/Dashbaord";
import { Provider } from "react-redux";
import store from "./store/index";

loadDevMessages();
loadErrorMessages();

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPQL_SERVER_URL,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("auth_token");
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={<AuthenticatedRoute />}>
            <Route exact path="/dashboard" element={<Dashboard />} />
          </Route>
        </Route>
        <Route index element={<Home />}></Route>
        <Route path="register" element={<Register />}></Route>
      </Routes>
    </Router>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>
);
