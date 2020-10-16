import validator from 'validator';

export const validate = (url, itag, setError) => {
  const validURL = validator.isURL(url, { require_protocol: true });
  const validItag = validator.isEmpty(itag);
  let errors = [];
  let isValid = true;

  if (!validURL) {
    errors.push('url');
    isValid = false;
  }
  if (validItag) {
    errors.push('itag');
    isValid = false;
  }

  setError(errors);

  return isValid;
};
