import { createGlobalState } from 'react-hooks-global-state';

const { setGlobalState, useGlobalState } = createGlobalState({
  data: [],
});

export const setErrorMessage = (s) => {
  setGlobalState('errorMessage', s);
};

export { useGlobalState };