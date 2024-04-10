// TextInput.tsx
import { SendButton } from '@/components/SendButton';
import { isMobile } from '@/utils/isMobileSignal';
import { createEffect, createSignal, onMount } from 'solid-js';
import { ShortTextInput } from './ShortTextInput';

type Props = {
  placeholder?: string;
  backgroundColor?: string;
  textColor?: string;
  sendButtonColor?: string;
  defaultValue?: string;
  fontSize?: number;
  disabled?: boolean;
  onSubmit: (value: string) => void;
};

const defaultBackgroundColor = '#ffffff';
const defaultTextColor = '#303235';

export const TextInput = (props: Props) => {
  const [inputValue, setInputValue] = createSignal(props.defaultValue ?? '');
  let textareaRef: HTMLTextAreaElement | undefined;

  const handleInput = (inputValue: string) => setInputValue(inputValue);

  const checkIfInputIsValid = () => inputValue() !== '' && textareaRef?.reportValidity();

  const submit = () => {
    if (checkIfInputIsValid()) props.onSubmit(inputValue());
    setInputValue('');
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    // Check if IME composition is in progress
    const isIMEComposition = e.isComposing;

    if (e.key === 'Enter' && !isIMEComposition) {
      if (e.shiftKey) {
        // Create a new line when 'Shift + Enter' is pressed
        setInputValue((prevValue) => prevValue + '\n');
      } else {
        // Prevent the default behavior of 'Enter' key
        e.preventDefault();
        submit();
      }
    }
  };

  createEffect(() => {
    if (!props.disabled && !isMobile() && textareaRef) textareaRef.focus();
  });

  onMount(() => {
    if (!isMobile() && textareaRef) textareaRef.focus();
  });

  return (
    <div
      class={'flex items-end justify-between chatbot-input'}
      data-testid="input"
      style={{
        'border-top': '1px solid #eeeeee',
        position: 'absolute',
        left: '20px',
        right: '20px',
        bottom: '40px',
        margin: 'auto',
        'z-index': 1000,
        'background-color': props.backgroundColor ?? defaultBackgroundColor,
        color: props.textColor ?? defaultTextColor,
      }}
    >
      <ShortTextInput
        ref={textareaRef}
        onInput={handleInput}
        value={inputValue()}
        fontSize={props.fontSize}
        disabled={props.disabled}
        placeholder={props.placeholder ?? 'Type your question'}
        onKeyDown={handleKeyDown}
      />
      <SendButton
        sendButtonColor={props.sendButtonColor}
        type="button"
        isDisabled={props.disabled || inputValue() === ''}
        class="my-2 ml-2"
        on:click={submit}
      >
        <span style={{ 'font-family': 'Poppins, sans-serif' }}>Send</span>
      </SendButton>
    </div>
  );
};
