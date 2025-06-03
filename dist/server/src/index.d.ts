declare const _default: {
    register: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => void;
    bootstrap: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => Promise<void>;
    controllers: {
        config: ({ strapi }: {
            strapi: import("@strapi/types/dist/core").Strapi;
        }) => {
            index(ctx: any): Promise<void>;
            update(ctx: any): Promise<void>;
        };
    };
    routes: {
        'content-api': {
            type: string;
            routes: {
                method: string;
                path: string;
                handler: string;
                config: {
                    policies: any[];
                    auth: boolean;
                };
            }[];
        };
    };
    services: {
        config: ({ strapi }: {
            strapi: import("@strapi/types/dist/core").Strapi;
        }) => {
            retrieve(): Promise<import("./interface").Config>;
            update({ data }: {
                data: any;
            }): Promise<import("./interface").Config>;
        };
    };
    contentTypes: {
        config: {
            schema: {
                kind: string;
                collectionName: string;
                info: {
                    singularName: string;
                    pluralName: string;
                    displayName: string;
                };
                options: {
                    draftAndPublish: boolean;
                };
                pluginOptions: {
                    'content-manager': {
                        visible: boolean;
                    };
                    'content-type-builder': {
                        visible: boolean;
                    };
                };
                attributes: {
                    googleMapsKey: {
                        type: string;
                        default: string;
                        required: boolean;
                        configurable: boolean;
                    };
                    defaultLatitude: {
                        type: string;
                        default: string;
                        required: boolean;
                        configurable: boolean;
                    };
                    defaultLongitude: {
                        type: string;
                        default: string;
                        required: boolean;
                        configurable: boolean;
                    };
                };
            };
        };
    };
};
export default _default;
