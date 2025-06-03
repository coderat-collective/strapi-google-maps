import { Coordinates } from '../../../types';
/**
 * Get the default coordinates from the field's attributes
 * @param attributes The fields's attributes object containing the advanced setting values
 * @returns Default coordinates if they are valid, otherwise null
 */
export declare const getDefaultCordsFromAttribute: ({ optionsDefaultLat, optionsDefaultLng, }: {
    optionsDefaultLat: string;
    optionsDefaultLng: string;
}) => Coordinates | null;
export declare const noPoint: Coordinates;
export declare const isValidPoint: (point: Coordinates) => boolean;
export declare const isSamePoint: (point1: Coordinates, point2: Coordinates) => boolean;
