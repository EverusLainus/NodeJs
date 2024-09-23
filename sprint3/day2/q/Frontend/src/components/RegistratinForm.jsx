"use client";

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";

const URL = `http://localhost:3000`;

import axios from "axios";

export const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `${URL}/auth/register`;
    console.log(url);
    const params = {
      name: name,
      email: email,
      password: password,
      role: role,
    };
    console.log(params);
    axios
      .post(url, params)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleName = (e) => {
    e.preventDefault();
    setName(e.target.value);
    console.log(name);
  };
  const handleEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
    console.log(email);
  };
  const handlePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
    console.log(password);
  };
  const handleRole = (e) => {
    e.preventDefault();
    setRole(e.target.value);
    console.log(role);
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Registration
        </Heading>
        <FormControl id="name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            onChange={handleName}
            placeholder="enter your name"
            _placeholder={{ color: "gray.500" }}
            type="email"
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email address</FormLabel>
          <Input
            onChange={handleEmail}
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <Input onChange={handlePassword} type="password" />
        </FormControl>
        <FormControl id="role" isRequired>
          <FormLabel>Role</FormLabel>
          <select onChange={handleRole}>
            <option value="">Select a role</option>
            <option value="admin">Admin</option>
            <option value="teacher">Teacher</option>
            <option value="viewer">Student</option>
          </select>
        </FormControl>
        <Stack spacing={6}>
          <Button
            onClick={handleSubmit}
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  );
};
