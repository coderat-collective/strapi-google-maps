import { Place } from '../../../../types';
export default function Search({ userCoords, currentAddress, onPlaceSelected, onAddressEdited, }: {
    userCoords?: GeolocationCoordinates;
    currentAddress: string;
    onPlaceSelected: (place: Place) => void;
    onAddressEdited: (address: string) => void;
}): import("react/jsx-runtime").JSX.Element;
