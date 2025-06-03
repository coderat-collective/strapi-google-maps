import { useState, useEffect } from "react";
import { useFetchClient } from "@strapi/strapi/admin";
import { P as PLUGIN_ID } from "./index-CnayrqMg.mjs";
const endpoint = `/api/${PLUGIN_ID}/config`;
function useConfig(token = "", newConfig) {
  const [config, setConfig] = useState();
  const { get, put } = useFetchClient();
  const onResponse = ({ data }) => setConfig(data);
  const onError = (error) => {
    console.error(error);
    setConfig(null);
  };
  useEffect(() => {
    get(endpoint).then(onResponse).catch(onError);
  }, []);
  useEffect(() => {
    if (newConfig) {
      setConfig(void 0);
      put(endpoint, { data: newConfig }).then(onResponse).catch(onError);
    }
  }, [newConfig]);
  return config;
}
export {
  useConfig as u
};
