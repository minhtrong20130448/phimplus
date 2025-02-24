import cookies from "js-cookie";

export const getLocalStorage = <T>(key: string): T | null => {
  if (typeof window === "undefined" || !key) return null;
  const result = window.localStorage.getItem(key);
  if (!result) return null;
  return JSON.parse(result);
};

export const setLocalStorage = <T>(key: string, data: T) => {
  if (typeof window === "undefined" || !key || !data) return;

  return window.localStorage.setItem(key, JSON.stringify(data));
};

export const removeLocalStorage = (key: string) => {
  if (typeof window === "undefined") return;

  return window.localStorage.removeItem(key);
};
export const getSessionStorage = <T>(key: string): T | null => {
  if (typeof window === "undefined" || !key) return null;
  const result = window.sessionStorage.getItem(key);
  if (!result) return null;
  return JSON.parse(result);
};

export const setSessionStorage = <T>(key: string, data: T) => {
  if (typeof window === "undefined" || !key || !data) return;

  return window.sessionStorage.setItem(key, JSON.stringify(data));
};

export const removeSessionStorage = (key: string) => {
  if (typeof window === "undefined") return;

  return window.sessionStorage.removeItem(key);
};

export function getCookie<T>(key: string): T | null {
  const result = cookies.get(key);
  if (result) {
    return JSON.parse(result);
  }

  return null;
}

export function setCookie<T>(key: string, value: T, expires = 31536000) {
  const expiredTime = new Date(new Date().getTime() + expires * 1000);
  return cookies.set(key, JSON.stringify(value), {
    expires: expiredTime,
    sameSite: "none",
    secure: true,
  });
}

export function expireCookie(key: string) {
  return cookies.remove(key, {
    path: window.location.pathname,
    domain: window.location.host,
  });
}
export function removeCookie(key: string) {
  return cookies.remove(key);
}

// export const addCachingTiming = (key: string): void => {
//   if (!key) return;

//   const cacheTiming = getUnixTime(
//     add(new Date(), { seconds: RESEND_OTP_COUNTING })
//   );
//   setLocalStorage(key, cacheTiming);
// };

// export const getTimingSecondCache = (key: string): number => {
//   if (!key) return RESEND_OTP_COUNTING;

//   const cacheTiming = getLocalStorage<number>(key) || 0;
//   const now = getUnixTime(new Date());

//   if (!cacheTiming || now - cacheTiming > RESEND_OTP_COUNTING)
//     return RESEND_OTP_COUNTING;

//   return -(now - cacheTiming);
// };

// export const checkCachingTime = (key: string): boolean => {
//   if (!key) return false;

//   const cacheTiming = getTimingSecondCache(key);
//   if (cacheTiming > RESEND_OTP_COUNTING) removeLocalStorage(key);

//   if (cacheTiming < RESEND_OTP_COUNTING) return true;
//   return false;
// };
