import { Stack, Text } from '@chakra-ui/react';
import { DWB } from './DWB';
import { BasicLayout } from '../../layout';

export const HomePage = () => {
  return (
    <BasicLayout>
      <DWB />
      <Slogan />
    </BasicLayout>
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
