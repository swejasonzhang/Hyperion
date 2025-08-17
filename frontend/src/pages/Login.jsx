import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      toast({ title: "All fields required", status: "error", duration: 3000 });
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("role", data.data.role);
        toast({ title: "Login successful!", status: "success", duration: 3000 });
        navigate("/"); // Redirect to homepage
      } else {
        toast({ title: data.message || "Login failed", status: "error", duration: 3000 });
      }
    } catch (error) {
      toast({ title: "Server error", status: "error", duration: 3000 });
      console.error(error);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={20} p={8} bg="white" borderRadius="md" shadow="md">
      <Heading mb={6} textAlign="center">Login</Heading>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>

        <Button colorScheme="blue" w="full" onClick={handleLogin}>Login</Button>
        <Text>
          Don't have an account? <Link to="/signup" style={{ color: "#3182ce" }}>Sign Up</Link>
        </Text>
      </VStack>
    </Box>
  );
};

export default Login;