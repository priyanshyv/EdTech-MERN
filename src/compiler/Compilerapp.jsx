import { Box, Heading } from "@chakra-ui/react";
import CodeEditor from "../compilercomponents/Codeeditor";
import React from 'react';

const Compilerapp = () => {
  return (
    <Box minH="100vh" bg="richblack-700" color="gray.500" px={6} py={8}>
      <Heading 
        color="white" 
        size="4xl" 
        fontWeight="bold"
        textAlign="center" 
        mb={8} 
        style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
      >
        Code runner
      </Heading>
      <CodeEditor />
    </Box>
  );
};

export default Compilerapp;



