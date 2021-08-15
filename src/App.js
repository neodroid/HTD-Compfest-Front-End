import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  Textarea,
  SimpleGrid,
  Grid,
  GridItem,
  theme,
  useColorModeValue,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

function App() {
  const [value, setValue] = React.useState('');
  const [wordCount, setWordCount] = React.useState(0);
  const [charCount, setCharCount] = React.useState(0);

  const handleInputChange = e => {
    const inputValue = e.target.value;
    setValue(inputValue);
    const countWords = count => {
      if (count.length === 0) {
        return 0;
      } else {
        count = count.replace(/(^\s*)|(\s*$)/gi, '');
        count = count.replace(/[ ]{2,}/gi, ' ');
        count = count.replace(/\n /, '\n');
        return count.split(' ').length;
      }
    };
    setWordCount(countWords(inputValue));
    setCharCount(inputValue.length);
  };

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="75vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <Text
            bgGradient="linear(to-l, #7928CA,#FF0080)"
            bgClip="text"
            fontSize="6xl"
            fontWeight="extrabold"
          >
            EssAI.id
          </Text>
          <SimpleGrid columns={2} spacing={10} minChildWidth="250px" px="5">
            <Box>
              <Textarea
                border="2px"
                placeholder="Isi kalimat anda disini"
                type="whiteAlpha"
                h="400"
                borderColor="#7928CA"
                value={value}
                onChange={handleInputChange}
              />
              <SimpleGrid columns={2} textAlign="left">
                <Text>Jumlah Kata:</Text>
                <Text>{wordCount}</Text>
                <Text>Jumlah Karakter:</Text>
                <Text>{charCount}</Text>
              </SimpleGrid>
            </Box>
            <SimpleGrid
              w="100%"
              h="400"
              bgGradient="linear(to-r, #7928CA, #FF0080)"
              borderRadius="lg"
              px="5"
              py="5"
            >
              <Box
                h="50px"
                textAlign="left"
                borderRadius="lg"
                fontWeight="400"
                color="white"
              >
                Kata kunci
              </Box>
              <Box
                h="50px"
                borderRadius="lg"
                textAlign="left"
                fontWeight="400"
                color="white"
              >
                Typo
              </Box>
              <Box
                h="50px"
                borderRadius="lg"
                textAlign="left"
                fontWeight="400"
                color="white"
              >
                Nilai
              </Box>
            </SimpleGrid>
          </SimpleGrid>

          <Text mt="30">EssAI.id by HARTA TAHTA DATA❤️</Text>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
