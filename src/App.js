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
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="75vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <Text fontSize="6xl" color="teal">
            EssAI.id
          </Text>
          <SimpleGrid columns={2} spacing={10} minChildWidth="400px">
            <Box>
              <Textarea
                border="2px"
                placeholder="Isi kalimat anda disini"
                type="whiteAlpha"
                h="400"
              />
            </Box>
            <Box w="100%" h="400" bg="teal" borderRadius="lg" />
          </SimpleGrid>

          <Text>EssAI.id by HARTA TAHTA DATA❤️</Text>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
