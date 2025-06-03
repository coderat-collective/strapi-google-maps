"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const admin = require("@strapi/strapi/admin");
const index = require("./index-DWm9Idrb.js");
const react = require("react");
const designSystem = require("@strapi/design-system");
const icons = require("@strapi/icons");
const useConfig = require("./useConfig-VnyFZ-mQ.js");
function Settings() {
  const [saveConfig, setSaveConfig] = react.useState();
  const [inputFields, setInputFields] = react.useState();
  const [unsavedChanges, setUnsavedChanges] = react.useState(false);
  const config = useConfig.useConfig("", saveConfig);
  react.useEffect(() => {
    if (!!config) {
      setInputFields(config);
    }
  }, [config]);
  react.useEffect(() => {
    if (!inputFields || !config) return;
    const inputFieldChanged = Object.entries(inputFields).some(
      ([key, value]) => value !== config[key]
    );
    setUnsavedChanges(inputFieldChanged);
  }, [inputFields]);
  const onSave = () => {
    setUnsavedChanges(false);
    setSaveConfig(inputFields);
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(admin.Page.Main, { "aria-busy": config === void 0, children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      admin.Layouts.Header,
      {
        primaryAction: /* @__PURE__ */ jsxRuntime.jsx(
          designSystem.Button,
          {
            startIcon: /* @__PURE__ */ jsxRuntime.jsx(icons.Check, {}),
            loading: config === void 0,
            disabled: !unsavedChanges,
            onClick: onSave,
            children: "Save"
          }
        ),
        title: "Google Maps Configuration",
        subtitle: "Configure your Google Maps API key and other settings"
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsx(admin.Layouts.Content, { children: config === null ? /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Error, {}) : config === void 0 || !inputFields ? /* @__PURE__ */ jsxRuntime.jsx("div", { style: { display: "flex", justifyContent: "center" }, children: /* @__PURE__ */ jsxRuntime.jsx(designSystem.Loader, {}) }) : /* @__PURE__ */ jsxRuntime.jsxs(
      designSystem.Box,
      {
        shadow: "tableShadow",
        background: "neutral0",
        paddingTop: 6,
        paddingLeft: 7,
        paddingRight: 7,
        paddingBottom: 6,
        hasRadius: true,
        children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            designSystem.TextInput,
            {
              type: "password",
              id: "apiKey",
              name: "apiKey",
              placeholder: "Paste your Google Maps API key here",
              label: "API Key",
              value: inputFields.googleMapsKey,
              onChange: (e) => {
                setInputFields({
                  ...inputFields,
                  googleMapsKey: e.target.value
                });
              }
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid.Root, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 2, padding: 0, children: /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.TextInput,
              {
                type: "text",
                id: "defaultLatitude",
                name: "defaultLatitude",
                placeholder: "Default Latitude",
                label: "Default Latitude",
                value: inputFields.defaultLatitude,
                onChange: (e) => {
                  setInputFields({
                    ...inputFields,
                    defaultLatitude: e.target.value
                  });
                }
              }
            ) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 2, padding: 2, children: /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.TextInput,
              {
                type: "text",
                id: "defaultLongitude",
                name: "defaultLongitude",
                placeholder: "Default Longitude",
                label: "Default Longitude",
                value: inputFields.defaultLongitude,
                onChange: (e) => {
                  setInputFields({
                    ...inputFields,
                    defaultLongitude: e.target.value
                  });
                }
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsxs(designSystem.Grid.Root, { children: [
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 5, padding: 2, children: /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.Link,
              {
                href: "https://developers.google.com/maps/documentation/javascript/cloud-setup",
                isExternal: true,
                children: "Get your Google Maps API key"
              }
            ) }),
            /* @__PURE__ */ jsxRuntime.jsx(designSystem.Grid.Item, { col: 5, padding: 2, children: /* @__PURE__ */ jsxRuntime.jsx(
              designSystem.Link,
              {
                href: "https://developers.google.com/maps/documentation/javascript/places",
                isExternal: true,
                children: "Grant your API key access to the Google Places API"
              }
            ) })
          ] })
        ]
      }
    ) })
  ] });
}
const permissions = [{ action: `plugin::${index.PLUGIN_ID}.config`, subject: null }];
const SettingsPage = () => {
  return /* @__PURE__ */ jsxRuntime.jsx(admin.Page.Protect, { permissions, children: /* @__PURE__ */ jsxRuntime.jsx(Settings, {}) });
};
exports.default = SettingsPage;
