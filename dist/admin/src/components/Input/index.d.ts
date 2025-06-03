interface InputProps {
    attribute: any;
    onChange: (event: any) => void;
    value: any;
    name: string;
    required?: boolean;
    label?: string;
    placeholder?: string;
    hint?: string;
    disabled?: boolean;
    intlLabel?: {
        id: string;
        defaultMessage: string;
    };
}
export default function Input({ attribute, onChange, value, name, required, label, intlLabel }: InputProps): import("react/jsx-runtime").JSX.Element;
export {};
