"use client";

/**
 * https://redux-toolkit.js.org/usage/nextjs
 */
import { useState, useEffect } from "react";
import { Provider } from "react-redux";
import reduxStore from "./redux-store/configure-store";

export const StoreProvider = (props: React.PropsWithChildren) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <Provider store={reduxStore}>{props.children}</Provider>;
};
