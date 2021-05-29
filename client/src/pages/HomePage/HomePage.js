import React, { useState } from 'react';
import {
  Stack,
  Text,
  Progress,
  Link,
  Button,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { DWB } from './DWB';
import { BasicLayout } from '../../layout';
import { DownloadIcon } from '@chakra-ui/icons';

export const HomePage = () => {
  const [progress, setProgress] = useState(null);
  const [percentage, setPercentage] = useState(0);
  const colorLogo = useColorModeValue('#041c29', 'teal.50');
  const colorSlogan = useColorModeValue('black', 'white');
  return (
    <BasicLayout>
      <DWB
        color={colorLogo}
        progress={progress}
        setProgress={setProgress}
        setPercentage={setPercentage}
        percentage={percentage}
      />
      <Slogan color={colorSlogan} />
      {progress === 'finished' && <DownloadFile />}
      {progress && <ProgressBar percentage={percentage} />}
    </BasicLayout>
  );
};

const ProgressBar = ({ percentage }) => {
  const bgBar = useColorModeValue('pink', 'purple');
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      w={{ base: '100%', lg: '100%' }}
    >
      <Progress
        position="relative"
        display="flex"
        justifyContent="center"
        isAnimated
        hasStripe
        value={percentage}
        colorScheme={bgBar}
        mt={5}
        w="100%"
        h="1.3em"
      >
        <Text
          position="absolute"
          fontSize="sm"
          color="blackAlpha.700"
        >{`${percentage}%`}</Text>
      </Progress>
      <Text fontSize="x-small" color="blackAlpha.900">
        Large Videos may take a while
      </Text>
    </Stack>
  );
};

const DownloadFile = () => {
  const link = JSON.parse(sessionStorage.getItem('file'));
  return (
    <Stack justifyContent="center" alignItems="center">
      <Button
        id="file-download-link"
        bg="blue.400"
        as={Link}
        px={8}
        href={link.url}
        download={link.format}
      >
        <Icon as={DownloadIcon} mr={2} />
        <Text id="file-download-text">{link.format}</Text>
      </Button>
    </Stack>
  );
};

const Slogan = ({ color }) => {
  return (
    <Stack justifyContent="center" alignItems="center" color={color}>
      <Text>Simple HQ Youtube Downloader</Text>
      <Text as={'small'}>up to 4k</Text>
    </Stack>
  );
};
