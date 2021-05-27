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
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { DownloadIcon } from '@chakra-ui/icons';
import { RadioButtons } from './RadioButtons/RadioButtons';
import { validateURL, validateFormat } from '../../../utils/validation';
import styled from 'styled-components';
import { getDownload } from '../../../api/fetch';

export const DWB = () => {
  const submitForm = (values, actions) => {
    const formData = JSON.stringify(values, null, 2);
    
    actions.setSubmitting(false);
    (async () => {
      const result = await getDownload(formData);
  
    })()
    

  };
  return (
    <Stack
      direction={{ base: 'column', lg: 'row' }}
      justifyContent={{ md: 'center', lg: 'space-around' }}
      alignItems="center"
      w="50%"
      spacing={4}
    >
      <Logo />
      <FormikForm submitForm={submitForm} />
    </Stack>
  );
};

const Logo = () => {
  const StyledText = styled.h1`
    font-family: 'Pacifico', cursive !important;
    font-size: 8.5rem !important;
    color: #041c29;
  `;
  return (
    <Stack justifyContent="center" alignItems="center">
      <Text as={StyledText}>dwb</Text>
    </Stack>
  );
};

const FormikForm = ({ submitForm }) => {
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
      {(props) => (
        <Stack as={Form} w={{ sm: '80%', md: '80%', lg: '40%' }}>
          <Field name="url" validate={validateURL}>
            {({ field, form }) => (
              <>
                <FormControl
                  bg="whiteAlpha.500"
                  color="black"
                  isInvalid={form.errors.url && form.touched.url}
                >
                  <Input
                    {...field}
                    type="text"
                    placeholder="https://youtube..."
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

          <Button
            type="submit"
            bg="whatsapp.500"
            w="100%"
            boxShadow="lg"
            isLoading={props.isSubmitting}
          >
            <Icon as={DownloadIcon} />
            <Text>Download</Text>
          </Button>
        </Stack>
      )}
    </Formik>
  );
};
