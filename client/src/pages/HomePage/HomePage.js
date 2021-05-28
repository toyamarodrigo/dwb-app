import React, { useState } from 'react';
import { Stack, Text, Progress } from '@chakra-ui/react';
import { DWB } from './DWB';
import { BasicLayout } from '../../layout';

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
