"use strict";
const react = require("react");
const jsxRuntime = require("react/jsx-runtime");
const __variableDynamicImportRuntimeHelper = (glob, path, segs) => {
  const v = glob[path];
  if (v) {
    return typeof v === "function" ? v() : Promise.resolve(v);
  }
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(
      reject.bind(
        null,
        new Error(
          "Unknown variable dynamic import: " + path + (path.split("/").length !== segs ? ". Note that variables only represent file names one level deep." : "")
        )
      )
    );
  });
};
const PLUGIN_ID = "google-maps";
const Initializer = ({ setPlugin }) => {
  const ref = react.useRef(setPlugin);
  react.useEffect(() => {
    ref.current(PLUGIN_ID);
  }, []);
  return null;
};
const CustomInputIcon = () => {
  return /* @__PURE__ */ jsxRuntime.jsxs("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
    /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M14.5 2.25H1.5C0.809644 2.25 0.25 2.80964 0.25 3.5V12.5C0.25 13.1904 0.809644 13.75 1.5 13.75H14.5C15.1904 13.75 15.75 13.1904 15.75 12.5V3.5C15.75 2.80964 15.1904 2.25 14.5 2.25Z", fill: "#EAFBE7", stroke: "#C6F0C2", "stroke-width": "0.5" }),
    /* @__PURE__ */ jsxRuntime.jsx("g", { "clip-path": "url(#clip0_498_201)", children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M9.591 9.34098L8 10.932L6.409 9.34098C6.09434 9.02631 5.88005 8.6254 5.79323 8.18894C5.70642 7.75249 5.75098 7.30009 5.92127 6.88896C6.09157 6.47782 6.37996 6.12642 6.74997 5.87919C7.11998 5.63196 7.55499 5.5 8 5.5C8.44501 5.5 8.88002 5.63196 9.25003 5.87919C9.62004 6.12642 9.90843 6.47782 10.0787 6.88896C10.249 7.30009 10.2936 7.75249 10.2068 8.18894C10.12 8.6254 9.90567 9.02631 9.591 9.34098ZM8 8.24998C8.13261 8.24998 8.25979 8.1973 8.35355 8.10353C8.44732 8.00977 8.5 7.88259 8.5 7.74998C8.5 7.61737 8.44732 7.4902 8.35355 7.39643C8.25979 7.30266 8.13261 7.24998 8 7.24998C7.86739 7.24998 7.74022 7.30266 7.64645 7.39643C7.55268 7.4902 7.5 7.61737 7.5 7.74998C7.5 7.88259 7.55268 8.00977 7.64645 8.10353C7.74022 8.1973 7.86739 8.24998 8 8.24998Z", fill: "#328048" }) }),
    /* @__PURE__ */ jsxRuntime.jsx("defs", { children: /* @__PURE__ */ jsxRuntime.jsx("clipPath", { id: "clip0_498_201", children: /* @__PURE__ */ jsxRuntime.jsx("rect", { width: "6", height: "6", fill: "white", transform: "translate(5 5)" }) }) })
  ] });
};
const PluginIcon = () => /* @__PURE__ */ jsxRuntime.jsx(CustomInputIcon, {});
const index = {
  register(app) {
    app.createSettingSection(
      {
        id: PLUGIN_ID,
        intlLabel: {
          id: "settings.section-label",
          defaultMessage: "Google Maps"
        }
      },
      // Section to create
      [
        // links
        {
          intlLabel: {
            id: "settings.link-label",
            defaultMessage: "Configuration"
          },
          id: PLUGIN_ID,
          to: `/settings/${PLUGIN_ID}`,
          Component: () => Promise.resolve().then(() => require("./Settings-DqcbXwW9.js")),
          permissions: [
            { action: `plugin::${PLUGIN_ID}.config`, subject: null }
          ]
        }
      ]
    );
    app.customFields.register({
      name: "location-picker",
      pluginId: PLUGIN_ID,
      type: "json",
      intlLabel: {
        id: "input.label",
        defaultMessage: "Location Picker"
      },
      intlDescription: {
        id: "input.description",
        defaultMessage: "Pick your location"
      },
      icon: PluginIcon,
      components: {
        Input: () => Promise.resolve().then(() => require("./index-C4X_IPtj.js"))
      },
      options: {
        advanced: [
          {
            name: "optionsDefaultLat",
            type: "string",
            intlLabel: {
              id: "attribute.item.default-lat",
              defaultMessage: "Default latitude"
            }
          },
          {
            name: "optionsDefaultLng",
            type: "string",
            intlLabel: {
              id: "attribute.item.default-lng",
              defaultMessage: "Default longitude"
            }
          },
          {
            sectionTitle: {
              id: "global.settings",
              defaultMessage: "Settings"
            },
            items: [
              {
                name: "required",
                type: "checkbox",
                intlLabel: {
                  id: "form.attribute.item.required-field",
                  defaultMessage: "Required field"
                },
                description: {
                  id: "form.attribute.item.required-field.description",
                  defaultMessage: "You won't be able to create an entry if this field is empty"
                }
              }
            ]
          }
        ]
      }
    });
    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID
    });
  },
  async registerTrads({ locales }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await __variableDynamicImportRuntimeHelper(/* @__PURE__ */ Object.assign({ "./translations/en.json": () => Promise.resolve().then(() => require("./en-DH4VOzN9.js")) }), `./translations/${locale}.json`, 3);
          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  }
};
exports.PLUGIN_ID = PLUGIN_ID;
exports.index = index;
