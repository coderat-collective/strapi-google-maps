import React from 'react';
import { Config, Coordinates, SetPointAction } from '../../../../types';
export default function MapView({ children, config, focusPoint, currentAddress, onCoordsChange, onAddressChange, }: {
    children: React.ReactNode;
    config?: Config;
    focusPoint?: Coordinates;
    currentAddress: string;
    onCoordsChange: (action: SetPointAction) => void;
    onAddressChange: (address: string) => void;
}): import("react/jsx-runtime").JSX.Element;
