import { useState } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { executeCode } from "../compilerapi/compilerapi";

const Output = ({ editorRef, language }) => {
  const toast = useToast();
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  //yei isliye hai jissey ham error pei styling karr paaye
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    //so first thing which we want ki hamey source code mil jaaye from that compiler
    //toh apan ismey codeeditor.jsx mei jo value hai usey bhi paas kar sakte the but here ham editorRef le aaye
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      //yaha ham apne code or language ko api ke paas bhejre hai fir agar error aara hai toh error show karre hai otherwise output aara hai toh output
      const { run: result } = await executeCode(language, sourceCode);
      //jo result ka output hoga na vo kuch iss type ke hoga ie. something\n234\nsomething toh hamey yei split karna hoga
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    
    <Box w="50%">
      {/* yei  box isliye hai jissey ham isko halfs mei split kar paaye */}
      <Text mb={2} fontSize="lg">
        Output
      </Text>
      <Button
        variant="outline"
        colorScheme="green"
        mb={4}
        isLoading={isLoading}
        onClick={runCode}
      >
        Run Code
      </Button>
      <Box
        height="75vh"
        p={2}
        color={isError ? "red.400" : ""}
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "red.500" : "#333"}
      >
        {output  ? 
        // so instead of rendering the output vo upper \n wala logic ke bajaye ham yei karenge ki
        //jus render the next line for each render
        output.map((line, i) => <Text key={i}>{line}</Text>) : 'Click "Run Code" to see the output here'}
      </Box>
    </Box>
  );
};
export default Output;