import makeFileNameByUrl from '../src/file';

test('makeFileNameByUrl with valid url', () => {
  const url1 = 'https://www.google.com/';
  const url2 = 'https://www.google.com';
  const expected1n2 = 'www-google-com.html';
  expect(makeFileNameByUrl(url1)).toBe(expected1n2);
  expect(makeFileNameByUrl(url2)).toBe(expected1n2);

  const url3 = 'https://mail.google.com/mail/u/0/?tab=wm&ogbl#inbox';
  const expected3 = 'mail-google-com-mail-u-0-tab-wm-ogbl-inbox.html';
  expect(makeFileNameByUrl(url3)).toBe(expected3);
});

test('makeFileNameByUrl with not valid url', () => {
  const url1 = '';
  const url2 = 'www.google.com';
  expect(makeFileNameByUrl(url1)).toBe(null);
  expect(makeFileNameByUrl(url2)).toBe(null);
});
