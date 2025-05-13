import { Component, onCleanup, onMount } from "solid-js";
import { SplitText } from "gsap/dist/SplitText";
import { gsap } from "gsap";
import { ETHCity } from "~/assets/images";

const Section2: Component = () => {
  let ctx: gsap.Context;
  let wrapper!: HTMLDivElement;

  onMount(() => {
    ctx = gsap.context(() => {
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      const split1 = new SplitText(".text1", {
        type: "words",
        wordsClass: "word",
      });
      tl.from(
        split1.words,
        {
          y: 50,
          stagger: 0.1,
          autoAlpha: 0,
          duration: 1,
          ease: "back.out(1.7)",
        },
        0
      );
      tl.to({}, { duration: 1 }, 1);
      tl.to(
        split1.words,
        {
          y: -50,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 0.4,
          ease: "expo.in",
        },
        3
      );

      tl.to(split1.words, { duration: 2, display: "none" }, 4);

      const split2 = new SplitText(".text2", {
        type: "words",
        wordsClass: "word",
      });

      tl.from(
        split2.words,
        {
          y: 50,
          stagger: 0.1,
          autoAlpha: 0,
          duration: 5,
          ease: "back.out(1.7)",
          display: "none",
        },
        6
      );
      tl.to({}, { duration: 1 }, 11);
      tl.to(
        split2.words,
        {
          y: -50,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 0.4,
          ease: "expo.in",
        },
        12
      );
      tl.to(split2.words, { duration: 2, display: "none" }, 13);
      const split3 = new SplitText(".text3", {
        type: "words",
        wordsClass: "word",
      });
      tl.from(
        split3.words,
        {
          y: 50,
          stagger: 0.1,
          autoAlpha: 0,
          duration: 2,
          ease: "back.out(1.7)",
          display: "none",
        },
        15
      );
      tl.to({}, { duration: 1 }, 17);
      tl.to(
        split3.words,
        {
          y: -50,
          autoAlpha: 0,
          stagger: 0.1,

          duration: 0.4,
          ease: "expo.in",
        },
        18
      );
      tl.to(split3.words, { duration: 2, display: "none" }, 19);

      const split4 = new SplitText(".text4", {
        type: "words",
        wordsClass: "word",
      });
      tl.from(
        split4.words,
        {
          y: 50,
          stagger: 0.1,
          autoAlpha: 0,
          duration: 2,
          ease: "back.out(1.7)",
          display: "none",
        },
        21
      );
      tl.to({}, { duration: 1 }, 23);
      tl.to(
        split4.words,
        {
          y: -50,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 0.4,
          ease: "expo.in",
        },
        24
      );
      tl.to(split4.words, { duration: 2, display: "none" }, 25);

      const split5 = new SplitText(".text5", {
        type: "words",
        wordsClass: "word",
      });
      tl.from(
        split5.words,
        {
          y: 50,
          stagger: 0.1,
          autoAlpha: 0,
          duration: 1,
          ease: "back.out(1.7)",
          display: "none",
        },
        27
      );
      tl.to({}, { duration: 1 }, 28);
    }, wrapper);
  });

  onCleanup(() => {
    if (ctx) {
      ctx.revert();
    }
  });
  return (
    <div
      ref={wrapper}
      class={`w-full h-[100dvh] flex justify-between items-center snap-section !p-[50px] relative`}
    >
      <div class={`w-[48%] h-full`}>
        <picture>
          {Object.entries(ETHCity.sources).map(([type, srcset]) => (
            <source type={`image/${type}`} srcset={srcset} />
          ))}
          <img
            src={ETHCity.img.src}
            width={ETHCity.img.w}
            height={ETHCity.img.h}
            alt={`Ethereum City`}
            class={`transition-all duration-300 ease-in-out object-cover rounded-2xl`}
          />
        </picture>
      </div>

      <div class={`w-[48%] flex justify-center items-center h-full`}>
        <p class="text-[30px] text-neutral-700 font-bold text1 italic">
          "The M3tering Protocol is shifting energy infrastructure from
          centralized monopolies to a shared, open economy on Ethereum."
        </p>
        <p class="text-[30px] text-neutral-700 font-bold text2 italic">
          "Whether it's a neighborhood solar farm or a shared battery network,
          the protocol enables the energy assets to be tokenized and transformed
          into liquid assets onchain that anyone can own, trade, and earn from
          permissionlessly."
        </p>
        <p class="text-[30px] text-neutral-700 font-bold text3 italic">
          "Using the protocol, communities choose how their power is produced,
          allowing them to accelerate local clean energy adoption."
        </p>
        <p class="text-[30px] text-neutral-700 font-bold text4 italic">
          "This is more than infrastructure; it's a solarpunk movement to
          democratize both ownership and access to energy."
        </p>
        <p class="text-[30px] text-neutral-700 font-bold text5 italic">
          "It's literally and figuratively{" "}
          <span class="font-extrabold text-black">power to the people</span>."
        </p>
      </div>
    </div>
  );
};
export default Section2;
