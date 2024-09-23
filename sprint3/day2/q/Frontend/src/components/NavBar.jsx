import { Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { AllRoutes } from "../routes/AllRoutes";

export const NavBar = () => {
  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-around"}
        backgroundColor={"black"}
        color={"white"}
        h={10}
      >
        <Link to="/">Home page</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </Box>
      <AllRoutes />
    </>
  );
};
