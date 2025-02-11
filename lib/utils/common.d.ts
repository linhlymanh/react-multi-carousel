import { CarouselInternalState, CarouselProps } from "../types";
declare function getInitialState(state: CarouselInternalState, props: CarouselProps): {
    shouldRenderOnSSR: boolean;
    flexBisis: number | string | undefined;
    domFullyLoaded: boolean;
    partialVisibilityGutter: number | undefined;
    shouldRenderAtAll: boolean;
};
declare function getIfSlideIsVisbile(index: number, state: CarouselInternalState): boolean;
declare function getTransformForCenterMode(state: CarouselInternalState, props: CarouselProps): number;
declare function getTransformForPartialVsibile(state: CarouselInternalState, partialVisibilityGutter: number | undefined, props: CarouselProps): number;
declare function isInLeftEnd({ currentSlide }: CarouselInternalState): boolean;
declare function isInRightEnd({ currentSlide, totalItems, slidesToShow, }: CarouselInternalState): boolean;
declare function notEnoughChildren(state: CarouselInternalState, props: CarouselProps, items?: number | undefined): boolean;
declare function getSlidesToSlide(state: CarouselInternalState, props: CarouselProps): number;
export { isInLeftEnd, isInRightEnd, getInitialState, getIfSlideIsVisbile, getTransformForCenterMode, getTransformForPartialVsibile, notEnoughChildren, getSlidesToSlide };
