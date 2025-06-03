import { Core } from '@strapi/strapi';
import { Config } from 'src/interface';
declare const _default: ({ strapi }: {
    strapi: Core.Strapi;
}) => {
    retrieve(): Promise<Config>;
    update({ data }: {
        data: any;
    }): Promise<Config>;
};
export default _default;
