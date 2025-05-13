import { Component, onCleanup, onMount } from "solid-js";
import { gsap } from "gsap";
import Particles from "../Particles";

const Hero: Component = () => {
  let ctx: gsap.Context;
  let hero!: HTMLDivElement;

  onMount(() => {
    ctx = gsap.context(() => {
      let tl = gsap.timeline();
      tl.fromTo(
        ".hero-text",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          ease: "power2.out",
        }
      );
    }, hero);
  });

  onCleanup(() => {
    if (ctx) {
      ctx.revert();
    }
  });
  return (
    <div
      ref={hero}
      class={`w-full h-[100dvh] flex justify-center items-center snap-section bg-blue-600 relative`}
    >
      <Particles />
      <div class="w-[90%] sm:w-[50%] text-white">
        <div class="w-full heroText1">
          <h1 class="text-2xl text-start md:text-3xl font-bold mb-4 hero-text">
            <span class="inline-block transition-all duration-700 ease-out playwrite-hr">
              Introducing
            </span>
          </h1>
          <h1 class="text-6xl md:text-8xl font-bold mb-4 hero-text">
            <span
              class="inline-block transition-all duration-700 ease-out june-expt-variable"
              style={{
                "font-variation-settings": "'STYL' 60",
              }}
            >
              M3tering
            </span>
          </h1>
        </div>
        <div class="heroText2 w-full">
          <h1 class="text-6xl text-end md:text-8xl font-bold hero-text">
            <span
              class="inline-block transition-all duration-700 ease-out june-expt-variable"
              style={{
                "font-variation-settings": "'STYL' 60",
              }}
            >
              Protocol
            </span>
          </h1>
          <h1 class="text-2xl text-end md:text-3xl font-bold hero-text">
            <span class="inline-block transition-all duration-700 ease-out playwrite-hr">
              V2
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
};
export default Hero;
