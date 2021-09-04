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
  Center,
  Button,
  useDisclosure,
  Icon,
  Wrap,
  Alert,
  AlertIcon,
  Image,
  AlertDescription,
  CloseButton,
  Skeleton,
  Tooltip,
} from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';

import { Formik, Form } from 'formik';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import typing from './img/Tulis.gif';
import submitgif from './img/submit.gif';
import analisis from './img/analisis.jpg';
import kalimatfinal from './img/kalimat_final.png';

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [kalimat, setKalimat] = React.useState('');
  const [wordCount, setWordCount] = React.useState(0);
  const [charCount, setCharCount] = React.useState(0);
  const [isSubmitting, setSubmitting] = React.useState(false);
  const [essai, setEssai] = React.useState(null);
  const [tag, setTag] = React.useState(['']);
  const [desc, setDesc] = React.useState(['']);
  const [typo, setTypo] = React.useState(['']);
  const [awal, setAwal] = React.useState([]);
  const [grammar, setGrammar] = React.useState(['']);
  const [final, setFinal] = React.useState(null);
  const [arrAwal, setArrAwal] = React.useState(['']);
  const [arrAkhir, setArrAkhir] = React.useState(['']);

  const [status, setStatus] = React.useState(0);
  const [beta, setBeta] = React.useState('flex');

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
        kalimat_backend.typo ? setEssai(kalimat_backend) : setEssai(null); // fetched movies
        kalimat_backend.typo
          ? setEssai(kalimat_backend)
          : alert('sorry! something went wrong!'); // fetched movies
        console.log(essai);
        setStatus(status + 1);
        setSubmitting(false);
      })
      .catch(error => {
        console.log(error);
        setAwal([]);
        setSubmitting(false);
        setFinal(error);
        alert(error);
      });
  };

  // const listItems = tag.map(hit => <Text mr="2">{hit + ''}</Text>);
  const listAwal = awal.map((hit, index) =>
    hit.toLowerCase() != typo[index].toLowerCase() ? (
      <Flex minW="150px" justifyContent="space-between">
        <Text color="red" px="10px" borderRadius="lg" as="s" textColor="red">
          <Text color="white" px="10px" borderRadius="lg">
            {hit}
          </Text>
        </Text>
        <Center>
          <Icon as={ArrowForwardIcon} color="white" />
        </Center>

        <Center
          bg="green.500"
          h="auto"
          px="10px"
          color="white"
          borderRadius="md"
          boxShadow="md"
        >
          {typo[index]}
        </Center>
      </Flex>
    ) : (
      <></>
    )
  );

  const POStag = {
    X: 'tidak diketahui atau belum diketahui',
    yet: 'error',
  };

  const grammarFinal = grammar.map((hit, index) =>
    status ? (
      <Tooltip
        label={tag[index] + ' : ' + desc[index]}
        placement="top"
        hasArrow
        arrowSize={15}
      >
        {hit + ' '}
      </Tooltip>
    ) : (
      <></>
    )
  );

  const tataBahasa = arrAwal.map((hit, index) =>
    hit.toLowerCase() != arrAkhir[index].toLowerCase() ? (
      <Flex minW="150px" justifyContent="space-between">
        <Text color="red" px="10px" borderColor="red" borderBottom="5px">
          <Text
            color="white"
            px="10px"
            borderRadius=""
            bg="red.400"
            borderBottom="2px"
            borderColor="red.600"
          >
            {hit}
          </Text>
        </Text>
        <Center>
          <Icon as={ArrowForwardIcon} color="white" />
        </Center>

        <Center
          bg="green.500"
          h="auto"
          px="10px"
          color="white"
          borderRadius=""
          borderBottom="2px"
          borderColor="green.600"
        >
          {arrAkhir[index]}
        </Center>
      </Flex>
    ) : (
      <></>
    )
  );

  useEffect(() => {
    essai ? setTag(essai.pos_tagger) : setTag(['']);
    essai ? setDesc(essai.final_deskripsi) : setDesc(['']);
    essai ? setAwal(essai.kalimat_awal) : setAwal([]);
    essai ? setTypo(essai.typo) : setTypo([]);
    essai ? setFinal(essai.kalimat_final) : setFinal([]);
    essai ? setArrAwal(essai.arr_awal) : setArrAwal([]);
    essai ? setGrammar(essai.grammar_checker) : setGrammar([]);
    essai ? setArrAkhir(essai.arr_akhir) : setArrAkhir([]);
    console.log(arrAwal);
  }, [status]);

  return (
    <ChakraProvider theme={theme}>
      {/* <Fonts /> */}

      <Box textAlign="center" fontSize="xl">
        <Alert status="warning" display={beta}>
          <AlertIcon />
          {/* <AlertTitle mr={2}>
            Aplikasi ini masih dalam tahap pengembangan!
          </AlertTitle> */}
          <AlertDescription>
            esAI.app sedang dalam tahap uji beta!
          </AlertDescription>
          <CloseButton
            position="absolute"
            right="8px"
            top="8px"
            onClick={() => {
              setBeta('none');
            }}
          />
        </Alert>
        <Grid minH="75vh" p={3}>
          <Flex w="100%" p="5" justifyContent="space-between">
            <Flex justifySelf="flex-start">
              <Text
                bgGradient="linear(to-l, #7928CA,#FF0080)"
                bgClip="text"
                fontSize="4xl"
                fontWeight="extrabold"
              >
                esAI.app
              </Text>
            </Flex>
            <Flex>
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
          </Flex>
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
                esAI.app memastikan semua yang kamu tulis efektif dan bebas dari
                kesalahan sesuai dengan tata Bahasa Indonesia menggunakan
                Kecerdasan Buatan.
                <br />
                Dikembangkan oleh tim Harta Tahta Data❤️
              </ModalBody>
              <ModalHeader>Cara Pakai</ModalHeader>
              <ModalBody>
                1. Tulis kalimat kamu di kolom textbox di bawah
                <Image src={typing} />
                <br />
                2. Klik submit
                <Image src={submitgif} />
                <br />
                3. Analisis kalimat akan muncul setelah loading selesai
                <Image src={analisis} />
                <br />
                4. Kalimat final yang sudah diperbaiki
                <Image src={kalimatfinal} />
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Tutup
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
          <SimpleGrid columns={2} spacing={10} minChildWidth="250px" px="5">
            <Box justifyContent="center">
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
              <Flex justify="center">
                <Box textAlign="left" mt="5" justifySelf="center" w="330px">
                  <Flex justifyContent="space-between">
                    <Text>Jumlah Kata:</Text>
                    <Text>{wordCount}</Text>
                  </Flex>

                  <Flex justifyContent="space-between">
                    <Text>Jumlah Karakter:</Text>
                    <Text justifyItems="flex-end">{charCount}</Text>
                  </Flex>
                </Box>
              </Flex>
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
                // bgGradient="linear(to-l, #FF0080,#7928CA)"
                // _hover={{ bg: '#ebedf0' }}
                shadow="dark-lg"
              >
                Submit
              </Button>
            </Box>
            <Box>
              <SimpleGrid
                w="100%"
                h="auto"
                bgGradient="linear(to-r, #7928CA, #FF0080)"
                borderRadius="lg"
                px="5"
                py="5"
                boxShadow="dark-lg"
              >
                <>
                  <Box
                    textAlign="left"
                    borderRadius="lg"
                    fontWeight="400"
                    color="white"
                  >
                    Ejaan
                  </Box>
                  {isSubmitting ? (
                    <Skeleton mt="5px" height="25px" w="50%" />
                  ) : (
                    <Wrap w="100%" h="auto">
                      {listAwal}
                    </Wrap>
                  )}
                  {/* <Wrap w="100%" h="auto">
                    {listAwal}
                  </Wrap> */}

                  <Box
                    mt="10px"
                    borderRadius="lg"
                    textAlign="left"
                    fontWeight="400"
                    color="white"
                  >
                    Tata Bahasa
                  </Box>
                  {isSubmitting ? (
                    <Skeleton mt="5px" height="25px" w="75%" />
                  ) : (
                    <Wrap w="100%" h="auto">
                      {tataBahasa}
                    </Wrap>
                  )}
                  {/* <Wrap w="100%" h="auto">
                    {tataBahasa}
                  </Wrap> */}
                </>
              </SimpleGrid>
              <Text mt="15px">KALIMAT FINAL</Text>
              {/* <Textarea
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
              /> */}
              <Flex
                // px="5px"
                minH="150px"
                w="100%"
                // bg="red"
                shadow="dark-lg"
                border="2px"
                borderColor="#7928CA"
                borderRadius="md"
                textAlign="start"
              >
                <Text m="15px">{grammarFinal}</Text>
              </Flex>
            </Box>
          </SimpleGrid>
          <Text mt="30">esAI.app by HARTA TAHTA DATA❤️</Text>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
