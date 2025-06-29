import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Layout from "./layout/Layout";
import { Register, Login } from "./pages";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout>hello</Layout>} />
        <Route path="/home" element={<Layout>Home</Layout>} />
        <Route path="/about" element={<Layout>About</Layout>} />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <Login />
            </Layout>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
