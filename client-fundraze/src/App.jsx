import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import InvestorDashboard from "./pages/InvestorDashboard";
import InvestorBids from "./pages/InvestorBids";
import FounderDashboardPage from "./pages/FounderDashboardPage";
import Home from "./pages/Home";

import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/founder-dashboard" element={<FounderDashboardPage />} />
        <Route path="/investor-dashboard" element={<InvestorDashboard />} />
        <Route path="/investor/my-bids" element={<InvestorBids />} />
        <Route
          path="/test"
          element={
            <div className="p-6">
              <h1 className="text-4xl font-bold text-green-600">Toast Test Page</h1>
            </div>
          }
        />
      </Routes>


    </>
  );
};

export default App;
