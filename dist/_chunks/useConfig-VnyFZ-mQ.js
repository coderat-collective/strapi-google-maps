"use strict";
const react = require("react");
const admin = require("@strapi/strapi/admin");
const index = require("./index-DWm9Idrb.js");
const endpoint = `/api/${index.PLUGIN_ID}/config`;
function useConfig(token = "", newConfig) {
  const [config, setConfig] = react.useState();
  const { get, put } = admin.useFetchClient();
  const onResponse = ({ data }) => setConfig(data);
  const onError = (error) => {
    console.error(error);
    setConfig(null);
  };
  react.useEffect(() => {
    get(endpoint).then(onResponse).catch(onError);
  }, []);
  react.useEffect(() => {
    if (newConfig) {
      setConfig(void 0);
      put(endpoint, { data: newConfig }).then(onResponse).catch(onError);
    }
  }, [newConfig]);
  return config;
}
exports.useConfig = useConfig;
