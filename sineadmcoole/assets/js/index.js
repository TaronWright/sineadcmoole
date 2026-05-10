import { setupTweenScale } from "./EmblaCarouselTweenScale.js";
import { addDotBtnsAndClickHandlers } from "./EmblaCarouselDotButton.js";
import { addPrevNextBtnsClickHandlers } from "./EmblaCarouselArrowButtons.js";

const OPTIONS = { loop: true };

const emblaNode = document.querySelector(".embla");

if (emblaNode) {
  const viewportNode = emblaNode.querySelector(".embla__viewport");
  if (viewportNode) {
    const prevBtn = emblaNode.querySelector(".embla__button--prev");
    const nextBtn = emblaNode.querySelector(".embla__button--next");
    const dotsNode = document.querySelector(".embla__dots");

    const emblaApi = EmblaCarousel(viewportNode, OPTIONS);
    const removeTweenScale = setupTweenScale(emblaApi);

    const removePrevNextBtnsClickHandlers = addPrevNextBtnsClickHandlers(
      emblaApi,
      prevBtn,
      nextBtn,
    );
    const removeDotBtnsAndClickHandlers = addDotBtnsAndClickHandlers(
      emblaApi,
      dotsNode,
    );

    emblaApi
      .on("destroy", removeTweenScale)
      .on("destroy", removePrevNextBtnsClickHandlers)
      .on("destroy", removeDotBtnsAndClickHandlers);
  }
}
