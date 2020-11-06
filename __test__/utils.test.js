import { convertUrlToBaseName } from '../src/utils';

test.each([
  ['https://www.google.com/', 'www-google-com'],
  ['https://www.google.com', 'www-google-com'],
  ['https://mail.google.com/mail/u/0/?tab=wm&ogbl#inbox', 'mail-google-com-mail-u-0-tab-wm-ogbl-inbox'],
])('convertUrlToBaseName with %s', (url, expected) => {
  expect(convertUrlToBaseName(url)).toBe(expected);
});
