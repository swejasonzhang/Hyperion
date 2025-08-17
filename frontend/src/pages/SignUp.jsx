import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  VStack,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("player");

  const toast = useToast();
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!username || !email || !password) {
      toast({ title: "All fields required", status: "error", duration: 3000 });
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, role }),
      });
      const data = await res.json();

      if (data.success) {
        toast({ title: "Account created!", status: "success", duration: 3000 });
        navigate("/login");
      } else {
        toast({ title: data.message || "Registration failed", status: "error", duration: 3000 });
      }
    } catch (error) {
      toast({ title: "Server error", status: "error", duration: 3000 });
      console.error(error);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={20} p={8} bg="white" borderRadius="md" shadow="md">
      <Heading mb={6} textAlign="center">Sign Up</Heading>
      <VStack spacing={4}>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input value={username} onChange={(e) => setUsername(e.target.value)} />
        </FormControl>

        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </FormControl>

        <FormControl>
          <FormLabel>Role</FormLabel>
          <Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="player">Player</option>
            <option value="host">Host</option>
          </Select>
        </FormControl>

        <Button colorScheme="blue" w="full" onClick={handleSignUp}>Sign Up</Button>
        <Text>
          Already have an account? <Link to="/login" style={{ color: "#3182ce" }}>Login</Link>
        </Text>
      </VStack>
    </Box>
  );
};

export default SignUp;