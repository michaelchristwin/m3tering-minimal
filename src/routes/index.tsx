import { For, lazy, onMount } from "solid-js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap/dist/SplitText";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { Title, Meta } from "@solidjs/meta";
const Hero = lazy(() => import("~/components/sections/Hero"));
const Section2 = lazy(() => import("~/components/sections/Section2"));
const Section3 = lazy(() => import("~/components/sections/Section3"));
const sections = [Hero, Section2, Section3];
gsap.registerPlugin(ScrollTrigger, SplitText);

function Smooth() {
  let container!: HTMLElement;

  onMount(() => {
    const lenis = new Lenis({ wrapper: container });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    ScrollTrigger.defaults({
      scroller: container,
    });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  });

  return (
    <>
      <Title>Home</Title>
      <Meta name="description" content="Welcome to M3tering Protocol" />
      <main
        class="h-[100dvh] overflow-y-auto overflow-x-hidden"
        ref={container}
      >
        <For each={sections}>{(Component) => <Component />}</For>
      </main>
    </>
  );
}
export default Smooth;
