import { Box ,Heading} from "@chakra-ui/react";
import CodeEditor from "../compilercomponents/Codeeditor";
import React from 'react'

export const Compilerapp = () => {
  return (
    <Box minH="100vh" bg="#0f0a19" color="gray.500" px={6} py={8}>
      <Heading 
        color="white" 
        size="4xl" 
        fontWeight="bold"
        textAlign="center" 
        mb={8} 
        style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
      >
        Online code runner
      </Heading>
      <CodeEditor />
    </Box>
  )
}

