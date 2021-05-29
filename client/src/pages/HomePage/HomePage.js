import React, { useState } from 'react';
import { Stack, Text, Progress, Link, Button, Icon } from '@chakra-ui/react';
import { DWB } from './DWB';
import { BasicLayout } from '../../layout';
import { DownloadIcon } from '@chakra-ui/icons';

export const HomePage = () => {
  const [progress, setProgress] = useState(null);
  const [percentage, setPercentage] = useState(0);
  return (
    <BasicLayout>
      <DWB
        progress={progress}
        setProgress={setProgress}
        setPercentage={setPercentage}
        percentage={percentage}
      />
      <Slogan />
      {progress === 'finished' && <DownloadFile />}
      {progress && <ProgressBar percentage={percentage} />}
    </BasicLayout>
  );
};

const ProgressBar = ({ percentage }) => {
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
        colorScheme="pink"
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
