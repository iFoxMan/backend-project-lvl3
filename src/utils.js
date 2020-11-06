// eslint-disable-next-line import/prefer-default-export
export const convertUrlToBaseName = (url) => url
  .replace(/.+:\/\//, '')
  .replace(/\/$/, '')
  .replace(/[^a-zA-Z0-9]+\b/gm, '-');
