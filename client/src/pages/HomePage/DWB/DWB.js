import React from 'react';
import {
  Stack,
  Text,
  Input,
  FormControl,
  Button,
  Icon,
  useRadioGroup,
  FormErrorMessage,
  useColorModeValue,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { DownloadIcon, CheckIcon } from '@chakra-ui/icons';
import { RadioButtons } from './RadioButtons/RadioButtons';
import { validateURL, validateFormat } from '../../../utils/validation';
import styled from 'styled-components';
import { startDownload } from '../../../api/fetch';
import { motion } from 'framer-motion';

const MotionButton = motion(Button);

const StyledText = styled.h1`
  font-family: 'Pacifico', cursive !important;
  font-size: 8.5rem !important;
`;

export const DWB = ({ color, progress, setProgress, setPercentage }) => {
  const submitForm = (values, actions) => {
    setProgress(null);
    setPercentage(0);
    const formData = JSON.stringify(values, null, 2);
    actions.setSubmitting(false);
    startDownload(formData, setProgress, setPercentage);
  };

  return (
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      justifyContent={{ md: 'center', lg: 'space-around' }}
      alignItems="center"
      w={{ base: '300px', sm: '330px', md: '400px', lg: '600px' }}
      spacing={{ base: 0, sm: 0, md: 5, lg: 10 }}
    >
      <Logo color={color} />
      <FormikForm submitForm={submitForm} progress={progress} />
    </Stack>
  );
};

const Logo = ({ color }) => {
  return (
    <Stack justifyContent="center" alignItems="center">
      <Text as={StyledText} color={color}>
        dwb
      </Text>
    </Stack>
  );
};

const FormikForm = ({ submitForm, progress }) => {
  const options = ['mp3', 'mp4'];

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'format',
  });

  const group = getRootProps();

  return (
    <Formik
      initialValues={{ url: '', format: '' }}
      onSubmit={(values, actions) => submitForm(values, actions)}
      validateOnChange={false}
      validateOnBlur={false}
    >
      <Stack as={Form} w={{ base: '100%', sm: '80%', md: '80%', lg: '100%' }}>
        <Field name="url" validate={validateURL}>
          {({ field, form }) => (
            <>
              <FormControl
                color="blackAlpha.900"
                borderRadius={'0.375rem'}
                isInvalid={form.errors.url && form.touched.url}
              >
                <Input
                  {...field}
                  type="text"
                  placeholder="https://youtube..."
                  autoFocus={true}
                  color="blackAlpha.900"
                  bg="whiteAlpha.900"
                />
                <FormErrorMessage>{form.errors.url}</FormErrorMessage>
              </FormControl>
              <Stack
                as={FormControl}
                direction="column"
                justifyContent="center"
                w="100%"
                isInvalid={form.errors.format && form.touched.format}
                {...group}
              >
                <Stack direction="row">
                  {options.map((value, index) => {
                    const radio = getRadioProps({ value });
                    return (
                      <Field
                        key={index}
                        name="format"
                        as="label"
                        style={{ width: '100%' }}
                        validate={validateFormat}
                      >
                        <RadioButtons {...radio} form={form}>
                          {value.toUpperCase()}
                        </RadioButtons>
                      </Field>
                    );
                  })}
                </Stack>
                <FormErrorMessage>{form.errors.format}</FormErrorMessage>
              </Stack>
            </>
          )}
        </Field>

        {progress === 'in-progress'}
        <MotionButton
          type="submit"
          colorScheme="green"
          w="100%"
          boxShadow="lg"
          isLoading={progress === 'in-progress'}
          isDisabled={progress === 'in-progress'}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon
            as={progress === 'finished' ? CheckIcon : DownloadIcon}
            mr={2}
          />
          <Text>{progress === 'finished' ? 'Done' : 'Download'}</Text>
        </MotionButton>
      </Stack>
    </Formik>
  );
};
