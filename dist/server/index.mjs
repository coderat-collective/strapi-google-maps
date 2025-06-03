const accessActions = [
  {
    section: "plugins",
    displayName: "View / Edit Configuration",
    uid: "config",
    pluginName: "google-maps"
  }
];
const bootstrap = async ({ strapi: strapi2 }) => {
  await strapi2.admin.services.permission.actionProvider.registerMany(
    accessActions
  );
};
const register = ({ strapi: strapi2 }) => {
  strapi2.customFields.register({
    name: "location-picker",
    plugin: "google-maps",
    type: "json"
  });
};
const schema = {
  kind: "singleType",
  collectionName: "google_maps_configs",
  info: {
    singularName: "config",
    pluralName: "configs",
    displayName: "Google Maps Config"
  },
  options: {
    draftAndPublish: false
  },
  pluginOptions: {
    "content-manager": {
      visible: false
    },
    "content-type-builder": {
      visible: false
    }
  },
  attributes: {
    googleMapsKey: {
      type: "string",
      default: "",
      required: true,
      configurable: false
    },
    defaultLatitude: {
      type: "string",
      default: "",
      required: true,
      configurable: false
    },
    defaultLongitude: {
      type: "string",
      default: "",
      required: true,
      configurable: false
    }
  }
};
function sanitizeConfigInput(data, ctx) {
  return strapi.contentAPI.sanitize.input(data, schema, { auth: ctx.state.auth });
}
const contentTypes = {
  config: { schema }
};
const config$1 = ({ strapi: strapi2 }) => ({
  async index(ctx) {
    let config2 = await strapi2.plugin("google-maps").service("config").retrieve();
    if (config2.googleMapsKey == "" && process.env.GOOGLE_MAPS_API_KEY) {
      config2.googleMapsKey = process.env.GOOGLE_MAPS_API_KEY;
    }
    ctx.body = config2;
  },
  async update(ctx) {
    const data = await sanitizeConfigInput(ctx.request.body, ctx);
    const config2 = await strapi2.plugin("google-maps").service("config").update(data);
    ctx.body = config2;
  }
});
const controllers = {
  config: config$1
};
const contentAPIRoutes = [
  {
    method: "GET",
    path: "/config",
    // name of the controller file & the method.
    handler: "config.index",
    config: {
      // TODO - Fix this
      // policies: ['admin::isAuthenticatedAdmin'],
      policies: [],
      auth: false
    }
  },
  {
    method: "PUT",
    path: "/config",
    handler: "config.update",
    config: {
      // TODO - Fix this
      // policies: [
      //     'admin::isAuthenticatedAdmin',
      //     {
      //         name: 'admin::hasPermissions',
      //         config: {
      //             actions: ['plugin::google-maps.config'],
      //         },
      //     },
      // ],
      policies: [],
      auth: false
    }
  }
];
const routes = {
  "content-api": {
    type: "content-api",
    routes: contentAPIRoutes
  }
};
const uid = "plugin::google-maps.config";
const fields = ["googleMapsKey", "defaultLatitude", "defaultLongitude"];
const config = ({ strapi: strapi2 }) => ({
  async retrieve() {
    let config2;
    config2 = await strapi2.entityService.findMany(uid, {
      fields
    });
    if (!config2) {
      config2 = await strapi2.db.query(uid).create({
        data: {},
        select: fields
      });
    }
    return config2;
  },
  async update({ data }) {
    let config2 = await this.retrieve();
    config2 = await strapi2.db.query(uid).update({
      where: {
        id: config2.id
      },
      data: {
        ...data,
        fields
      }
    });
    return config2;
  }
});
const services = {
  config
};
const index = {
  register,
  bootstrap,
  controllers,
  routes,
  services,
  contentTypes
};
export {
  index as default
};
