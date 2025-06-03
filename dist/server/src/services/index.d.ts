declare const _default: {
    config: ({ strapi }: {
        strapi: import("@strapi/types/dist/core").Strapi;
    }) => {
        retrieve(): Promise<import("../interface").Config>;
        update({ data }: {
            data: any;
        }): Promise<import("../interface").Config>;
    };
};
export default _default;
