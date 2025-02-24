export const BASE_URL_API = process.env.NEXT_PUBLIC_API_URL;
export const BASE_URL_UPLOADCHAPTER_API =
  process.env.NEXT_PUBLIC_API_UPLOADCHAPTER_URL;
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH;

const prefixStorageKey = "educhain_books";
export const LOCAL_STORAGE_KEY = {
  accessToken: `${prefixStorageKey}_access_token`,
  currentUser: `${prefixStorageKey}_current_user`,
};
