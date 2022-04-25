import { atom, selector } from 'recoil';

export const loggedUserInfoState = atom({
  key: 'loggedUserInfoState',
  default: null
});

export const isLoggedInSelector = selector({
  key: 'isLoggedInSelector',
  get: ({ get }) => Boolean(get(loggedUserInfoState))
});
