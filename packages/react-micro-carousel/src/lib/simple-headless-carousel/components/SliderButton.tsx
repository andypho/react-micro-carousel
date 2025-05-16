import type { ReactNode } from 'react';

export type SliderButtonProps = {
  action?: () => void;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
};

/**
 * Renders a slider button component.
 *
 * @param {ReactNode} children - The child components to be wrapped.
 * @param {Function} props.onClick - The click event handler.
 * @param {Function} props.action - The action to be performed when the button is clicked.
 * @param {string} [props.className] - The additional CSS class for the button.
 * @param {boolean} [props.disabled] - Whether the button is disabled.
 * @param {React.CSSProperties} [props.style] - The inline styles for the button.
 * @return {JSX.Element} The rendered slider button component.
 */
export function SliderButton(props: SliderButtonProps) {
  const { action, children, className, disabled, onClick, style } = props;

  return (
    <button
      className={className}
      style={style}
      type="button"
      onClick={(e) => {
        action?.();
        onClick?.(e);
      }}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
