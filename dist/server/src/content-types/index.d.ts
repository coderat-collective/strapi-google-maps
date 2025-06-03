declare const _default: {
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
export default _default;
