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
  const basename = url
    .replace(/.+:\/\//, '')
    .replace(/\/$/, '')
    .replace(/[^a-zA-Z0-9]+\b/gm, '-');
  return `${basename}.html`;
};

export default makeFileNameByUrl;
