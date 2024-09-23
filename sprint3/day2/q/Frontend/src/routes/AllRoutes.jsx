import { Route, Routes } from "react-router-dom";
import { RegistrationForm } from "../components/RegistratinForm";
import { LoginForm } from "../components/LoginForm";
import { Dashboard } from "../pages/Dashboard";

export const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <h1 style={{ textAlign: "center", marginTop: "10vw" }}>
              Welcome to homepage
            </h1>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route />
      </Routes>
    </>
  );
};
