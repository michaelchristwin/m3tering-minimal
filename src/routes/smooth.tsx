import { Meta, Title } from "@solidjs/meta";
import { createSignal, For, lazy, onCleanup, onMount } from "solid-js";
const Section1 = lazy(() => import("~/components/sections/Hero"));
const Section2 = lazy(() => import("~/components/sections/Section2"));
const Section3 = lazy(() => import("~/components/sections/Section3"));

const sections = [Section1, Section2, Section3];

export default function Home() {
  let container!: HTMLElement;
  const [currentIndex, setCurrentIndex] = createSignal(0);
  const [previousIndex, setPreviousIndex] = createSignal<number | null>(null);
  const [isTransitioning, setIsTransitioning] = createSignal(false);
  const [touchStart, setTouchStart] = createSignal<number | null>(null);
  const [touchEnd, setTouchEnd] = createSignal<number | null>(null);

  const nextSlide = () => {
    if (!isTransitioning() && currentIndex() < sections.length - 1) {
      setIsTransitioning(true);
      setPreviousIndex(currentIndex());
      setCurrentIndex((prev) => prev + 1);
      setTimeout(() => setIsTransitioning(false), 800);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning() && currentIndex() > 0) {
      setIsTransitioning(true);
      setPreviousIndex(currentIndex());
      setCurrentIndex((prev) => prev - 1);
      setTimeout(() => setIsTransitioning(false), 800);
    }
  };

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    if (e.deltaY > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  };

  const handleTouchStart = (e: TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!touchStart() || !touchEnd()) return;

    const distance = (touchStart() as number) - (touchEnd() as number);
    const isSignificantSwipe = Math.abs(distance) > 50;

    if (isSignificantSwipe) {
      if (distance > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  onMount(() => {
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }
  });

  onCleanup(() => {
    if (container) {
      container.removeEventListener("wheel", handleWheel);
    }
  });

  return (
    <>
      <Title>Smooth</Title>
      <Meta name="description" content="Welcome to testing for lenis" />
      <main
        class="h-screen w-full overflow-hidden relative"
        ref={container}
        ontouchstart={handleTouchStart}
        ontouchend={handleTouchEnd}
        ontouchmove={handleTouchMove}
      >
        <div
          class="transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateY(-${currentIndex() * 100}%)` }}
        >
          <For each={sections}>{(Component) => <Component />}</For>
        </div>
      </main>
    </>
  );
}
