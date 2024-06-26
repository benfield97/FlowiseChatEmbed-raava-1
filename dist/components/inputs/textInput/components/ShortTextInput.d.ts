import { JSX } from 'solid-js/jsx-runtime';
type ShortTextInputProps = {
    ref: HTMLTextAreaElement | undefined;
    onInput: (value: string) => void;
    onKeyDown?: (e: KeyboardEvent) => void;
    fontSize?: number;
    disabled?: boolean;
} & Omit<JSX.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onInput'>;
export declare const ShortTextInput: (props: ShortTextInputProps) => JSX.Element;
export {};
//# sourceMappingURL=ShortTextInput.d.ts.map