import React, { useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  theme,
  Textarea,
  SimpleGrid,
  Grid,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Image,
  Button,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react';

import { Formik, Form } from 'formik';
import { ColorModeSwitcher } from './ColorModeSwitcher';

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [kalimat, setKalimat] = React.useState('');
  const [wordCount, setWordCount] = React.useState(0);
  const [charCount, setCharCount] = React.useState(0);
  const [isSubmitting, setSubmitting] = React.useState(false);
  const [essai, setEssai] = React.useState(null);
  const [tag, setTag] = React.useState([]);
  const [typo, setTypo] = React.useState([]);
  const [word, setWord] = React.useState([]);
  const [grammar, setGrammar] = React.useState([]);
  const [final, setFinal] = React.useState(null);

  // {
  //   typo: '',
  //   word_checker: '',
  //   pos_tagger: '',
  //   grammar_checker: '',
  //   kalimat_final: '',
  // }

  const handleInputChange = e => {
    const inputValue = e.target.value;
    setKalimat(inputValue);
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

  var formdata = new FormData();

  async function fetchKalimatJSON() {
    formdata.append('text', kalimat);
    const response = await fetch('https://trialessaiapi.herokuapp.com/check', {
      method: 'POST',
      body: formdata,
    });
    const kalimat_backend = await response.json();
    return kalimat_backend;
  }

  const diClick = () => {
    setSubmitting(true);
    fetchKalimatJSON()
      .then(kalimat_backend => {
        setEssai(kalimat_backend); // fetched movies
        console.log(essai);

        setSubmitting(false);
      })
      .catch(error => {
        console.log(error);
        alert(error);
        setSubmitting(false);
      });
  };

  const listItems = tag.map(number => <Text mr="2">{number + ''}</Text>);

  useEffect(() => {
    essai ? setTag(essai.pos_tagger) : setTag([]);
    essai ? setFinal(essai.kalimat_final) : setFinal([]);
  }, [essai]);

  return (
    <ChakraProvider theme={theme}>
      {/* <Fonts /> */}
      <Box textAlign="center" fontSize="xl">
        <Grid minH="75vh" p={3}>
          <Flex w="100%" justifyContent="flex-end" p="5">
            <Button
              onClick={onOpen}
              borderColor="#7928CA"
              borderWidth="2px"
              boxShadow="dark-lg"
            >
              Informasi
            </Button>
            <ColorModeSwitcher />
          </Flex>
          <Box>
            <Text
              bgGradient="linear(to-l, #7928CA,#FF0080)"
              bgClip="text"
              fontSize="6xl"
              fontWeight="extrabold"
            >
              essAI.id
            </Text>
          </Box>
          <Modal
            isOpen={isOpen}
            onClose={onClose}
            motionPreset="slideInRight"
            size="md"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Informasi</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                essAI.id memastikan semua yang kamu tulis menjadi efektif dan
                bebas dari kesalahan sesuai dengan PUEBI menggunakan Kecerdasan
                Buatan.
                <br />
                Dikembangkan oleh tim Harta Tahta DATA❤️
              </ModalBody>
              <ModalHeader>Cara Pakai</ModalHeader>
              <ModalBody>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Tutup
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <SimpleGrid columns={2} spacing={10} minChildWidth="250px" px="5">
            <Box>
              <Textarea
                focusBorderColor="#FF0080"
                border="2px"
                placeholder="Isi kalimat anda disini"
                type="whiteAlpha"
                h="400"
                borderColor="#7928CA"
                value={kalimat}
                onChange={handleInputChange}
                boxShadow="dark-lg"
              />
              <SimpleGrid columns={2} textAlign="left" mt="5">
                <Text>Jumlah Kata:</Text>
                <Text>{wordCount}</Text>
                <Text>Jumlah Karakter:</Text>
                <Text>{charCount}</Text>
              </SimpleGrid>
              <Button
                mt={4}
                colorScheme="teal"
                // type="submit"
                onClick={() => {
                  diClick();
                }}
                alignSelf="center"
                w="330px"
                isLoading={isSubmitting}
              >
                Submit
              </Button>
            </Box>
            <Box>
              <SimpleGrid
                w="100%"
                h="200"
                bgGradient="linear(to-r, #7928CA, #FF0080)"
                borderRadius="lg"
                px="5"
                py="5"
                boxShadow="dark-lg"
              >
                <>
                  <Box
                    h="50px"
                    textAlign="left"
                    borderRadius="lg"
                    fontWeight="400"
                    color="white"
                  >
                    POS tag
                  </Box>
                  <Flex maxW="100%">{listItems}</Flex>

                  {/* <Box
                    h="50px"
                    borderRadius="lg"
                    textAlign="left"
                    fontWeight="400"
                    color="white"
                  >
                    Kalimat Final
                  </Box>

                  <Flex>
                    <Text>{final}</Text>
                  </Flex> */}
                  <Box
                    h="50px"
                    borderRadius="lg"
                    textAlign="left"
                    fontWeight="400"
                    color="white"
                  >
                    Nilai
                  </Box>
                </>
              </SimpleGrid>
              <Text
                // bgGradient="linear(to-l, #7928CA,#FF0080)"
                // bgClip="text"
                // fontSize="6xl"
                // fontWeight="BOLD"
                mt="15px"
              >
                KALIMAT FINAL
              </Text>
              <Textarea
                mt="15px"
                focusBorderColor="#FF0080"
                border="2px"
                placeholder="Isi kalimat anda"
                type="whiteAlpha"
                // h="400"
                // bg="white"
                h="150px"
                // maxH="400px"
                borderColor="#7928CA"
                boxShadow="dark-lg"
                value={final}
                resize="none"
              />
            </Box>
          </SimpleGrid>{' '}
          <Text mt="30">essAI.id by HARTA TAHTA DATA❤️</Text>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
