const isValidUrl = (url) => {
  try {
    // eslint-disable-next-line no-new
    new URL(url);
  } catch {
    return false;
  }
  return true;
};

const convertUrlToBaseName = (url) => url
  .replace(/.+:\/\//, '')
  .replace(/\/$/, '')
  .replace(/[^a-zA-Z0-9]+\b/gm, '-');

export const makeFileNameByUrl = (url, extname) => {
  if (!isValidUrl(url)) {
    return null;
  }
  const basename = convertUrlToBaseName(url);
  return `${basename}.${extname}`;
};

export const makeDirNameByUrl = (url) => {
  if (!isValidUrl(url)) {
    return null;
  }
  const basename = convertUrlToBaseName(url);
  return `${basename}_files`;
};
