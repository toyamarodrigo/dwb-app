import validator from 'validator';
const ytdl = require('ytdl-core');

export const validate = (url, itag, setError) => {
  const validItag = validator.isEmpty(itag);
  const validYTUrl = ytdl.validateURL(url);

  let errors = [];
  let isValid = true;

  if (!validYTUrl) {
    errors.push('url');
    isValid = false;
  }
  if (validItag) {
    errors.push('itag');
    isValid = false;
  }

  setError(errors);

  console.log('isValid ' + isValid);
  return isValid;
};
