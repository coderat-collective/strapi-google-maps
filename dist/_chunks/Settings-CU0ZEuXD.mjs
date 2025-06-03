import { jsxs, jsx } from "react/jsx-runtime";
import { Page, Layouts } from "@strapi/strapi/admin";
import { P as PLUGIN_ID } from "./index-CnayrqMg.mjs";
import { useState, useEffect } from "react";
import { Button, Loader, Box, TextInput, Grid, Link } from "@strapi/design-system";
import { Check } from "@strapi/icons";
import { u as useConfig } from "./useConfig-DEC7oP4E.mjs";
function Settings() {
  const [saveConfig, setSaveConfig] = useState();
  const [inputFields, setInputFields] = useState();
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const config = useConfig("", saveConfig);
  useEffect(() => {
    if (!!config) {
      setInputFields(config);
    }
  }, [config]);
  useEffect(() => {
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
  return /* @__PURE__ */ jsxs(Page.Main, { "aria-busy": config === void 0, children: [
    /* @__PURE__ */ jsx(
      Layouts.Header,
      {
        primaryAction: /* @__PURE__ */ jsx(
          Button,
          {
            startIcon: /* @__PURE__ */ jsx(Check, {}),
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
    /* @__PURE__ */ jsx(Layouts.Content, { children: config === null ? /* @__PURE__ */ jsx(Page.Error, {}) : config === void 0 || !inputFields ? /* @__PURE__ */ jsx("div", { style: { display: "flex", justifyContent: "center" }, children: /* @__PURE__ */ jsx(Loader, {}) }) : /* @__PURE__ */ jsxs(
      Box,
      {
        shadow: "tableShadow",
        background: "neutral0",
        paddingTop: 6,
        paddingLeft: 7,
        paddingRight: 7,
        paddingBottom: 6,
        hasRadius: true,
        children: [
          /* @__PURE__ */ jsx(
            TextInput,
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
          /* @__PURE__ */ jsxs(Grid.Root, { children: [
            /* @__PURE__ */ jsx(Grid.Item, { col: 2, padding: 0, children: /* @__PURE__ */ jsx(
              TextInput,
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
            /* @__PURE__ */ jsx(Grid.Item, { col: 2, padding: 2, children: /* @__PURE__ */ jsx(
              TextInput,
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
          /* @__PURE__ */ jsxs(Grid.Root, { children: [
            /* @__PURE__ */ jsx(Grid.Item, { col: 5, padding: 2, children: /* @__PURE__ */ jsx(
              Link,
              {
                href: "https://developers.google.com/maps/documentation/javascript/cloud-setup",
                isExternal: true,
                children: "Get your Google Maps API key"
              }
            ) }),
            /* @__PURE__ */ jsx(Grid.Item, { col: 5, padding: 2, children: /* @__PURE__ */ jsx(
              Link,
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
const permissions = [{ action: `plugin::${PLUGIN_ID}.config`, subject: null }];
const SettingsPage = () => {
  return /* @__PURE__ */ jsx(Page.Protect, { permissions, children: /* @__PURE__ */ jsx(Settings, {}) });
};
export {
  SettingsPage as default
};
