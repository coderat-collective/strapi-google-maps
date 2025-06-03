import React, { ReactNode } from 'react';
import { Config } from '../../../../types';
interface GoogleMapsContextType {
    isLoaded: boolean;
    loadError: boolean;
}
export declare const useGoogleMaps: () => GoogleMapsContextType;
interface GoogleMapsProviderProps {
    children: ReactNode;
    config?: Config;
}
export declare const GoogleMapsProvider: React.FC<GoogleMapsProviderProps>;
export {};
