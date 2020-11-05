import { makeFileNameByUrl, makeDirNameByUrl } from '../src/name';

test.each([
  ['https://www.google.com/', 'www-google-com.html'],
  ['https://www.google.com', 'www-google-com.html'],
  ['https://mail.google.com/mail/u/0/?tab=wm&ogbl#inbox', 'mail-google-com-mail-u-0-tab-wm-ogbl-inbox.html'],
  ['www.google.com', null],
  ['', null],
])('makeFileNameByUrl with %s', (url, expected) => {
  expect(makeFileNameByUrl(url, 'html')).toBe(expected);
});

test.each([
  ['https://www.google.com/', 'www-google-com_files'],
  ['https://www.google.com', 'www-google-com_files'],
  ['https://mail.google.com/mail/u/0/?tab=wm&ogbl#inbox', 'mail-google-com-mail-u-0-tab-wm-ogbl-inbox_files'],
  ['www.google.com', null],
  ['', null],
])('makeDirNameByUrl with %s', (url, expected) => {
  expect(makeDirNameByUrl(url)).toBe(expected);
});
