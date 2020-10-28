const isValidUrl = (url) => {
  try {
    // eslint-disable-next-line no-new
    new URL(url);
  } catch {
    return false;
  }
  return true;
};

const makeFileNameByUrl = (url) => {
  if (!isValidUrl(url)) {
    return null;
  }
  const urlWithoutProtocol = url.replace(/.+:\/\//, '');
  const basename = urlWithoutProtocol.replace(/[^a-zA-Z0-9]+/gm, '-');
  return `${basename}.html`;
};

export default makeFileNameByUrl;
