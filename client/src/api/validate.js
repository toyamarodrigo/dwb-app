import validator from 'validator';

export const validate = (url, itag, setError) => {
  const validURL = validator.isURL(url, { require_protocol: true });
  const validItag = validator.isEmpty(itag);
  let errors = [];
  let isValid = true;

  if (!validURL) {
    console.log(
      'Please ensure this URL is correct and includes the https protocol'
    );
    errors.push('url');
    isValid = false;
  }
  if (validItag) {
    console.log('Please select format');
    errors.push('itag');
    isValid = false;
  }

  setError(errors);

  return isValid;
};
