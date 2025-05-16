import { memo, useContext } from 'react';
import { CarouselContext } from '../context/CarouselContext';
import { SliderButton, type SliderButtonProps } from './SliderButton';

/**
 * A button component that allows the user to navigate to the next slide in the carousel.
 *
 * @component
 * @example
 * <NextButton onClick={handleNextButtonClick} className="custom-class">Next</NextButton>
 *
 * @param {ReactNode} children - The child components to be wrapped.
 * @param {Function} onClick - The callback function to be called when the button is clicked.
 * @param {string} className - An optional class name to be applied to the button.
 * @param {boolean} disabled - Whether the button is disabled.
 * @param {React.CSSProperties} style - The inline styles for the button.
 */
export const NextButton = memo((props: SliderButtonProps) => {
  const { children, style, ...restProps } = props;
  const { dispatch } = useContext(CarouselContext);

  return (
    <SliderButton
      action={() => dispatch({ action: 'next' })}
      style={style}
      {...restProps}
    >
      {children}
    </SliderButton>
  );
});
