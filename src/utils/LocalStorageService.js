import { EMAIL_ID_KEY, NAME_KEY, ACCESS_TOKEN_KEY } from './localStorageConstants';

// Setter function to save emailId to Local Storage
export const setEmailId = (emailId) => {
  localStorage.setItem(EMAIL_ID_KEY, emailId);
};

// Setter function to save name to Local Storage
export const setName = (name) => {
  localStorage.setItem(NAME_KEY, name);
};

// Setter function to save accessToken to Local Storage
export const setAccessToken = (accessToken) => {
  localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
};

// Getter function to retrieve data from Local Storage
export const getUserData = () => {
  const emailId = localStorage.getItem(EMAIL_ID_KEY);
  const name = localStorage.getItem(NAME_KEY);
  const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

  return { emailId, name, accessToken };
};

// Clear all data from Local Storage
export const clearUserData = () => {
  localStorage.removeItem(EMAIL_ID_KEY);
  localStorage.removeItem(NAME_KEY);
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};
