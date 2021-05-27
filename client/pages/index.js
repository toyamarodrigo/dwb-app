import Head from 'next/head';
import { Stack, Text } from '@chakra-ui/react';
import { Landing, Footer } from '../components/';

export default function Home() {
  return (
    <Stack
      position="relative"
      overflowX="hidden"
      h="100vh"
      w="100vw"
      justifyContent="center"
      alignItems="center"
      bg={'teal.200'}
      spacing={4}
    >
      <Head>
        <title>dwb - YT Downloader</title>
        <meta name="description" content="Simple HQ YT Downloader" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Sans&family=Pacifico&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Landing />
      <Slogan />
      <Footer />
    </Stack>
  );
}

const Slogan = () => {
  return (
    <Stack justifyContent="center" alignItems="center">
      <Text color="black">Simple HQ Youtube Downloader</Text>
      <Text color="black" as={'small'}>
        up to 4k
      </Text>
    </Stack>
  );
};
