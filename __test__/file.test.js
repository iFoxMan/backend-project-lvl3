import makeFileNameByUrl from '../src/file';

test('makeFileNameByUrl with valid url', () => {
  const url = 'https://mail.google.com/mail/u/0/?tab=wm&ogbl#inbox';
  const expected = 'mail-google-com-mail-u-0-tab-wm-ogbl-inbox.html';
  expect(makeFileNameByUrl(url)).toBe(expected);
});

test('makeFileNameByUrl with not valid url', () => {
  const url1 = '';
  const url2 = 'mail.google.com/mail/u/0/?tab=wm&ogbl#inbox';
  const url3 = 'mail.google.com/mail/гыыы/u/0/?tab=wm&ogbl#inbox';
  expect(makeFileNameByUrl(url1)).toBe(null);
  expect(makeFileNameByUrl(url2)).toBe(null);
  expect(makeFileNameByUrl(url3)).toBe(null);
});
