import { useRef, useState } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import Selectlanguage from "./Selectlanguage";
import { CODE_SNIPPETS } from "../utils/compilerconstants";
import Output from "./Output";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (language) => {
    //agar mai language select karra hu toh voi language honi chahiye
    setLanguage(language);
    //then agar mai dusri language select karta hu toh vo value set ho jaaye
    setValue(CODE_SNIPPETS[language]);
  };

  return (
    <Box>
      {/* yei hstack or box isliye hai jissey ham isko halfs mei split kar paaye */}
      <HStack spacing={4}>
        <Box w="50%">
          <Selectlanguage language={language} onSelect={onSelect} />
          <Editor
            options={{
              minimap: {
                enabled: false,
              },
            }}
            height="75vh"
            //dark theme
            theme="vs-dark"
            language={language}
            defaultValue={CODE_SNIPPETS[language]}
            onMount={onMount}
            value={value}
            //koi bhi code change hua usmey toh voi save ho jayega
            onChange={(value) => setValue(value)}
          />
        </Box>
        <Output editorRef={editorRef} language={language} />
      </HStack>
    </Box>
  );
};
export default CodeEditor;