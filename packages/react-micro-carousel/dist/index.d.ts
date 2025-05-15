import { Context } from 'react';
import { Dispatch } from 'react';
import { JSX as JSX_2 } from 'react/jsx-runtime';
import { MemoExoticComponent } from 'react';
import { ReactNode } from 'react';

/**
 * A simple headless carousel
 *
 * @param {ReactNode} children The children of the carousel
 * @param {string} wrapperClassName An optional class to be applied to the wrapper div
 * @param {string} carouselClassName An optional class to be applied to the carousel div
 */
export declare const Carousel: MemoExoticComponent<({ children, wrapperClassName, carouselClassName }: CarouselProps) => JSX_2.Element>;

declare type CarouselAction = 'next' | 'prev' | 'setCurrentIndex' | 'setConfig';

export declare const CarouselContext: Context<CarouselContextProps>;

export declare type CarouselContextProps = {
    dispatch: CarouselReduceDispatch;
    state: CarouselState;
};

declare type CarouselProps = {
    children: ReactNode;
    wrapperClassName?: string;
    carouselClassName?: string;
};

/**
 * A provider component for the Carousel context.
 *
 * @param {ReactNode} children - The child components to be wrapped by the Carousel context.
 * @param {number} total - The total number of slides in the carousel.
 * @param {boolean} lazy - Whether the carousel should lazy load images.
 * @param {boolean} autoPlay - Whether the carousel should automatically play.
 * @param {number} autoPlayDelay - The delay between each slide transition in auto play mode.
 * @param {number} slidesVisible - The number of slides visible at a time.
 * @param {boolean} infinite - Whether the carousel should loop infinitely.
 * @param {number} step - The number of slides to move when navigating.
 * @param {number} slideHeight - The number of slide height in pixels.
 */
export declare function CarouselProvider({ children, ...configProps }: Props): JSX_2.Element;

declare type CarouselReduceDispatch = Dispatch<DispatchOpts>;

export declare type CarouselState = {
    slideHeight: number;
    total: number;
    currentIndex: number;
    threshold: number;
    disableTouch: boolean;
    slidesVisible: number;
    step: number;
    autoPlayDelay: number;
    autoPlay: boolean;
    infinite: boolean;
    lazy: boolean;
};

/**
 * Renders a counter component that displays the current slide number and total number of slides.
 *
 * @param {string} className - The class name for the counter.
 */
export declare const Counter: ({ className }: CounterProps) => JSX_2.Element;

declare type CounterProps = {
    className?: string;
};

declare type DispatchOpts = {
    action: CarouselAction;
    value?: number;
    config?: Partial<CarouselState>;
};

/**
 * Dot component for the carousel.
 *
 * @param {number} index - The index of the dot.
 * @param {string} className - The class name for the dot.
 * @param {string} colorActive - The class name for the active dot.
 * @param {string} colorInactive - The class name for the inactive dot.
 * @param {boolean} disabled - Whether the dot is disabled.
 * @param {Function} onClick - The callback function to be called when the button is clicked.
 */
export declare const Dot: MemoExoticComponent<({ index, disabled, onClick, colorActive, colorInactive, className, }: DotProps) => JSX_2.Element>;

declare type DotProps = {
    index: number;
    className?: string;
    colorActive?: string;
    colorInactive?: string;
    disabled?: boolean;
    onClick?: (event: React.MouseEvent) => void;
};

/**
 * DotsGroup component for the carousel.
 *
 * @param {string} className - The class name for the dots group.
 * @param {string} dotClassName - The class name for the single dot.
 * @param {string} colorActive - The class name for the active dot.
 * @param {string} colorInactive - The class name for the inactive dot.
 * @param {Function} onClick - The callback function to be called when the button is clicked.
 */
export declare const DotsGroup: MemoExoticComponent<({ onClick, colorActive, colorInactive, dotClassName, className, }: DotsGroupProps) => JSX_2.Element>;

declare type DotsGroupProps = {
    className?: string;
    dotClassName?: string;
    colorActive?: string;
    colorInactive?: string;
    onClick?: (event: React.MouseEvent) => void;
};

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
 */
export declare const NextButton: MemoExoticComponent<({ onClick, className, children }: SliderButtonProps) => JSX_2.Element>;

/**
 * A button component that allows the user to navigate to the prev slide in the carousel.
 *
 * @component
 * @example
 * <PrevButton onClick={handlePrevButtonClick} className="custom-class">Prev</PrevButton>
 *
 * @param {ReactNode} children - The child components to be wrapped.
 * @param {Function} onClick - The callback function to be called when the button is clicked.
 * @param {string} className - An optional class name to be applied to the button.
 */
export declare const PrevButton: MemoExoticComponent<({ onClick, className, children }: SliderButtonProps) => JSX_2.Element>;

declare type Props = Partial<CarouselState> & Pick<CarouselState, 'total' | 'slideHeight'> & {
    children: ReactNode;
};

/**
 * A single slide in a carousel.
 *
 * @component
 * @param {ReactNode} children - The content of the slide.
 * @param {number} index - Slide index
 * @param {string} className - Additional CSS classes for the slide.
 * @param {() => void} onClick - Callback function when the slide is clicked.
 */
export declare const Slide: MemoExoticComponent<({ children, index, className, onClick }: SlideProps) => JSX_2.Element>;

declare type SlideProps = {
    children: ReactNode;
    index: number;
    className?: string;
    onClick?: () => void;
};

declare type SliderButtonProps = {
    children: ReactNode;
    action?: () => void;
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
};

export { }
