import { Box } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
const URL = `http://localhost:3000`;
export const Dashboard = () => {
  const [userDetails, setUserDetails] = useState({});
  const [allTaskDetails, setAllTaskDetail] = useState([]);
  const specificName_url = `${URL}/tasks/:name`;
  const getAll_url = `${URL}/tasks/:name`;
  useEffect(() => {
    axios
      .get(specificName_url)
      .then(function (response) {
        console.log(response);
        setUserDetails(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get(getAll_url)
      .then(function (response) {
        console.log(response);
        setAllTaskDetail(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <Box>
      <h1 style={{ textAlign: "center", marginTop: "6vw" }}>Tasks Details</h1>
      {allTaskDetails.map((elt, i) => {
        return (
          <Box key={i}>
            <h3>elt.name</h3>
            <h3></h3>
          </Box>
        );
      })}
      <Box>
        <h4>{userDetails.name}</h4>
        <h4>{userDetails.email}</h4>
      </Box>
    </Box>
  );
};
