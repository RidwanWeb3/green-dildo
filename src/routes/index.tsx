import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import heroAsset from "@/assets/c-hero.png";
import flexAsset from "@/assets/c-flex.png";
import kingAsset from "@/assets/c-king.png";
import laserAsset from "@/assets/c-laser.png";
import redAsset from "@/assets/c-red.png";
import rocketAsset from "@/assets/c-rocket.png";
import glyphAsset from "@/assets/logo-glyph.png";
import meme1Asset from "@/assets/meme-1.png";
import meme2Asset from "@/assets/meme-2.png";
import meme3Asset from "@/assets/meme-3.png";
import meme4Asset from "@/assets/meme-4.png";
import meme5Asset from "@/assets/meme-5.png";
import meme6Asset from "@/assets/meme-6.png";

const videoAsset = "/__l5e/assets-v1/cbe8fae7-09dc-4812-85f0-f0c39a496a81/dildogate.mp4";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Green Dildo Coin — $DILDO" },
      {
        name: "description",
        content:
          "$DILDO: the green candle with sunglasses. The tape, the chart, the memes and the tokenomics — go green or go home.",
      },
      { property: "og:title", content: "Green Dildo Coin — $DILDO" },
      {
        property: "og:description",
        content: "The green candle with sunglasses. The tape, the chart and the memes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const CA = "comingsoon";
const CHART_URL = "https://radardex.pro";
const X_URL = "https://x.com";

const CREW = [
  { src: heroAsset, name: "The Green One", line: "Default state: printing." },
  { src: flexAsset, name: "Flex Candle", line: "Bought the dip with both arms." },
  { src: kingAsset, name: "King Candle", line: "Rules the daily close." },
  { src: laserAsset, name: "Laser Candle", line: "Eyes on one number only." },
  { src: rocketAsset, name: "Rocket Candle", line: "Exit liquidity? Never heard of her." },
  { src: redAsset, name: "The Red One", line: "Cries in 4-hour timeframe." },
];

const MEMES = [
  { src: meme1Asset, title: "THE GREEN ONE" },
  { src: meme2Asset, title: "AND THEN IT HAPPENED" },
  { src: meme3Asset, title: "STILL HOLDING" },
  { src: meme4Asset, title: "SEE YOU IN THE TRENCHES" },
  { src: meme5Asset, title: "GREEN CANDLES ONLY" },
  { src: meme6Asset, title: "GO GREEN OR GO HOME" },
];

const QUOTES = [
  "It was never about the object. It was about the culture around it.",
  "Memes are the gateway drug to crypto.",
  "The joke is the distribution. The distribution was always the point.",
  "We launched a coin and the timeline did the marketing for free.",
];

function Marquee() {
  const items = [
    "GO GREEN OR GO HOME",
    "$DILDO",
    "GREEN CANDLE SUPREMACY",
    "MEMES ARE THE GATEWAY DRUG",
    "NO PRESALE",
    "LP BURNED",
  ];
  return (
    <div className="overflow-hidden border-y-4 border-black bg-lime py-2">
      <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-8 pr-8">
        {[0, 1].map((k) => (
          <div key={k} className="flex gap-8">
            {items.map((t) => (
              <span
                key={t}
                className="font-display text-lg tracking-widest whitespace-nowrap text-black uppercase"
              >
                {t} <span className="text-void">◆</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Candles() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    let raf = 0;
    let t = 0;
    const resize = () => {
      cv.width = cv.offsetWidth;
      cv.height = cv.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const draw = () => {
      t += 1;
      ctx.clearRect(0, 0, cv.width, cv.height);
      const w = 14;
      const count = Math.ceil(cv.width / (w + 8)) + 2;
      for (let i = 0; i < count; i++) {
        const seed = Math.sin((i + t * 0.01) * 12.9898) * 43758.5453;
        const r = seed - Math.floor(seed);
        const up = r > 0.42;
        const h = 22 + r * 120;
        const x = i * (w + 8) - ((t * 0.4) % (w + 8));
        const y = cv.height * 0.62 - h / 2 + Math.sin(i * 0.6 + t * 0.01) * 60;
        ctx.fillStyle = up ? "rgba(120,235,70,0.5)" : "rgba(220,60,70,0.4)";
        ctx.fillRect(x, y, w, h);
        ctx.fillRect(x + w / 2 - 1, y - 14, 2, h + 28);
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 h-full w-full opacity-60" />;
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative z-10 mx-auto w-[92vw] max-w-6xl py-20 md:py-28">
      <p className="font-display text-sm tracking-[0.3em] text-lime uppercase">{eyebrow}</p>
      <h2 className="font-display mt-2 text-4xl leading-none text-bone md:text-6xl">{title}</h2>
      <div className="mt-8">{children}</div>
    </section>
  );
}

function Sticker({
  text,
  tone = "gold",
  className = "",
}: {
  text: string;
  tone?: "gold" | "lime" | "blood" | "bone";
  className?: string;
}) {
  const tones = {
    gold: "bg-gold text-black",
    lime: "bg-lime text-black",
    blood: "bg-blood text-bone",
    bone: "bg-bone text-black",
  } as const;
  return (
    <span
      className={`pixel-box font-display px-3 py-1 text-xs tracking-widest uppercase ${tones[tone]} ${className}`}
    >
      {text}
    </span>
  );
}

function HeroChart() {
  const bars = [
    [54, 1],
    [70, 0],
    [62, 1],
    [50, 1],
    [58, 0],
    [66, 0],
    [74, 1],
    [60, 1],
    [999, 1],
    [68, 1],
    [52, 1],
    [72, 0],
    [58, 1],
    [64, 0],
    [48, 1],
    [56, 0],
    [66, 1],
    [44, 0],
  ] as const;
  return (
    <div className="relative">
      <div className="flex items-end justify-center gap-2 md:gap-3">
        {bars.map(([h, up], i) => {
          const big = h === 999;
          return (
            <div
              key={i}
              className={`w-3 border-2 border-black md:w-6 ${
                big ? "bg-lime shadow-[0_0_40px_rgba(140,255,110,0.5)]" : up ? "bg-lime-deep" : "bg-blood"
              }`}
              style={{ height: big ? "320px" : `${h * 2.2}px` }}
            />
          );
        })}
      </div>
      <img
        src={glyphAsset}
        alt="$DILDO mascot riding the green candle"
        className="pointer-events-none absolute top-[38%] left-1/2 w-10 -translate-x-1/2 md:w-14 [image-rendering:pixelated]"
      />
      <Sticker text="Programmed" tone="blood" className="absolute top-6 left-0 -rotate-6" />
      <Sticker text="We made a trend" tone="bone" className="absolute right-0 bottom-16 rotate-3" />
    </div>
  );
}

function Index() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(CA);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="scanlines relative min-h-screen overflow-x-hidden bg-void text-bone">
      <div className="grid-bg pointer-events-none fixed inset-0 z-0" />
      <div className="pointer-events-none fixed inset-0 z-0 bg-[radial-gradient(ellipse_80%_65%_at_50%_45%,transparent_45%,rgba(0,0,0,0.8)_100%)]" />

      <header className="sticky top-0 z-50 border-b-4 border-black bg-deep/90 backdrop-blur">
        <div className="mx-auto flex w-[92vw] max-w-6xl flex-wrap items-center justify-between gap-3 py-3">
          <div className="flex items-center gap-3">
            <a href="#top" className="flex items-center gap-2">
              <img
                src={glyphAsset}
                alt="$DILDO pixel mascot"
                className="h-8 [image-rendering:pixelated]"
              />
              <span className="font-display text-2xl text-lime">$DILDO</span>
            </a>
            <button
              onClick={copy}
              className="font-display text-xs tracking-widest text-dim uppercase transition-colors hover:text-lime"
            >
              CA <span className="text-lime">{copied ? "copied" : CA}</span>
            </button>
            <span className="font-display hidden items-center gap-2 text-xs tracking-widest text-dim uppercase sm:flex">
              <span className="inline-block h-2 w-2 animate-[flicker_1.4s_ease-in-out_infinite] bg-lime" />
              Live chart
            </span>
          </div>
          <nav className="flex items-center gap-2">
            <a
              href="#tape"
              className="pixel-box font-display bg-panel px-3 py-2 text-xs tracking-widest text-bone uppercase"
            >
              The tape
            </a>
            <a
              href={X_URL}
              target="_blank"
              rel="noreferrer"
              className="pixel-box font-display bg-panel px-3 py-2 text-xs tracking-widest text-bone uppercase"
            >
              X
            </a>
            <a
              href={CHART_URL}
              target="_blank"
              rel="noreferrer"
              className="pixel-box font-display bg-lime px-3 py-2 text-xs tracking-widest text-black uppercase"
            >
              Chart
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Candles />
          </div>
          <div className="relative z-10 mx-auto w-[92vw] max-w-6xl py-16 text-center md:py-24">
            <div className="mb-6 flex justify-between">
              <Sticker text="As seen on TV" tone="gold" className="-rotate-6" />
              <Sticker text="Not random" tone="lime" className="rotate-6" />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <h1 className="font-display text-6xl leading-none text-lime drop-shadow-[0_6px_0_#000] md:text-9xl">
                $DILDO
              </h1>
              <img
                src={heroAsset}
                alt="Green pixel candle mascot wearing sunglasses"
                className="w-20 animate-[bob_3.6s_ease-in-out_infinite] md:w-32 [image-rendering:pixelated]"
              />
            </div>
            <p className="font-display mt-4 text-2xl text-bone md:text-4xl">Go Green or Go Home!</p>
            <p className="mx-auto mt-4 max-w-xl font-mono-read text-sm text-dim">
              One absurdly long green candle, sunglasses, and a timeline that never recovered.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="#tape"
                className="pixel-box font-display bg-lime px-6 py-3 tracking-widest text-black uppercase transition-transform hover:-translate-y-0.5"
              >
                ▶ Watch the tape
              </a>
              <a
                href={CHART_URL}
                target="_blank"
                rel="noreferrer"
                className="pixel-box font-display bg-panel px-6 py-3 tracking-widest text-bone uppercase transition-transform hover:-translate-y-0.5"
              >
                View chart
              </a>
              <a
                href={X_URL}
                target="_blank"
                rel="noreferrer"
                className="pixel-box font-display bg-panel px-6 py-3 tracking-widest text-bone uppercase transition-transform hover:-translate-y-0.5"
              >
                Follow on X
              </a>
            </div>

            <button
              onClick={copy}
              className="pixel-box mx-auto mt-8 flex w-full max-w-md items-center gap-3 bg-deep px-4 py-3 text-left"
            >
              <span className="font-display text-xs tracking-widest text-lime uppercase">CA</span>
              <code className="flex-1 truncate font-mono-read text-xs text-dim">{CA}</code>
              <span className="font-display text-xs tracking-widest text-bone uppercase">
                {copied ? "Copied" : "Copy"}
              </span>
            </button>
          </div>
        </section>

        <Marquee />

        {/* CHART */}
        <Section id="chart" eyebrow="The candle" title="One green candle">
          <HeroChart />
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={CHART_URL}
              target="_blank"
              rel="noreferrer"
              className="pixel-box font-display bg-lime px-6 py-3 tracking-widest text-black uppercase"
            >
              Buy on RadarDex
            </a>
            <a
              href={CHART_URL}
              target="_blank"
              rel="noreferrer"
              className="pixel-box font-display bg-panel px-6 py-3 tracking-widest text-bone uppercase"
            >
              Live chart
            </a>
          </div>
        </Section>

        {/* TAPE */}
        <Section id="tape" eyebrow="You've seen us. You just didn't realise." title="The tape">
          <p className="max-w-xl font-mono-read text-dim">
            National television explaining us, to you, for free. Ad spend: zero.
          </p>
          <div className="pixel-box mt-8 overflow-hidden bg-black">
            <video
              src={videoAsset}
              controls
              playsInline
              poster={meme2Asset}
              className="h-full w-full object-cover"
            />
          </div>
        </Section>

        {/* STORY */}
        <Section id="story" eyebrow="Receipts" title="What actually happened">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="space-y-5 font-mono-read text-dim">
              <p>
                Neon green hit a WNBA floor. The game stopped. Then it went multi‑sport, and every
                anchor in America had to say the word on air with a straight face.
              </p>
              <p className="text-bone">
                They thought they were covering it. They were running it.
              </p>
              <blockquote className="pixel-box bg-deep p-6 md:p-8">
                <p className="font-mono-read text-lg text-bone md:text-2xl">
                  &ldquo;We launched a coin and we created a trend. It&apos;s extremely powerful for a
                  small group of people to be able to go and influence the world.&rdquo;
                </p>
                <footer className="font-display mt-4 text-xs tracking-[0.3em] text-lime uppercase">
                  From the tape
                </footer>
              </blockquote>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                ["27,000%", "Peak move. Their number."],
                ["Prime time", "And everyone who copied it."],
                ["Multi-sport", "It would not stay in one arena."],
                ["$0", "Media budget."],
              ].map(([k, v]) => (
                <div key={k} className="pixel-box bg-panel p-5">
                  <p className="font-display text-2xl text-gold">{k}</p>
                  <p className="mt-2 font-mono-read text-xs text-dim uppercase">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* WHY */}
        <Section id="why" eyebrow="It was never about the object" title="Why we did it">
          <div className="space-y-5">
            {QUOTES.map((q) => (
              <blockquote key={q} className="pixel-box bg-deep p-6 md:p-8">
                <p className="font-mono-read text-lg text-bone md:text-2xl">&ldquo;{q}&rdquo;</p>
                <footer className="font-display mt-4 text-xs tracking-[0.3em] text-lime uppercase">
                  From the tape
                </footer>
              </blockquote>
            ))}
          </div>
        </Section>

        {/* ARMORY */}
        <Section id="armory" eyebrow="Meet the cast" title="The Armory">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CREW.map((c) => (
              <div
                key={c.name}
                className="pixel-box bg-panel p-5 transition-transform hover:-translate-y-1"
              >
                <div className="flex h-40 items-center justify-center bg-deep">
                  <img src={c.src} alt={c.name} className="h-36 [image-rendering:pixelated]" />
                </div>
                <p className="font-display mt-4 text-xl text-lime">{c.name}</p>
                <p className="mt-1 font-mono-read text-sm text-dim">{c.line}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* TOKENOMICS */}
        <Section id="tokenomics" eyebrow="The numbers" title="Tokenomics & flywheel">
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="pixel-box bg-panel p-6">
              <dl className="space-y-4">
                {[
                  ["Total supply", "1,000,000,000"],
                  ["Buy / sell tax", "0% / 0%"],
                  ["Liquidity", "Burned forever"],
                  ["Team allocation", "None. Zero. Nihil."],
                  ["Contract", "Ownership renounced"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-center justify-between gap-4 border-b-2 border-black/60 pb-3"
                  >
                    <dt className="font-mono-read text-sm text-dim">{k}</dt>
                    <dd className="font-display text-xl text-lime">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <ol className="space-y-4">
              {[
                ["Phase 1", "Launch, burn the LP, post the candle."],
                ["Phase 2", "Meme saturation. Every timeline turns green."],
                ["Phase 3", "Listings, trackers, and the group chat going feral."],
                ["Phase 4", "Go green or go home. Repeat forever."],
              ].map(([p, d], i) => (
                <li key={p} className="pixel-box flex gap-4 bg-deep p-5">
                  <span className="font-display text-3xl text-gold">0{i + 1}</span>
                  <div>
                    <p className="font-display text-lg text-bone">{p}</p>
                    <p className="font-mono-read text-sm text-dim">{d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Section>

        {/* MEMES */}
        <Section id="memes" eyebrow="Free ammo" title="The Meme Vault">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {MEMES.map((m) => (
              <figure key={m.title} className="pixel-box bg-panel p-4">
                <img src={m.src} alt={m.title} className="w-full [image-rendering:pixelated]" />
                <figcaption className="mt-4 flex items-center justify-between gap-3">
                  <span className="font-display text-lg text-bone">{m.title}</span>
                  <a
                    href={m.src}
                    download
                    className="pixel-box font-display bg-lime px-3 py-2 text-xs tracking-widest text-black uppercase"
                  >
                    Download
                  </a>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-6 font-mono-read text-sm text-dim">
            Take them. Post them. Attribution is for red candles.
          </p>
        </Section>

        {/* COMMUNITY */}
        <Section id="community" eyebrow="Where we live" title="Join the green">
          <div className="grid gap-5 sm:grid-cols-2">
            <a
              href={X_URL}
              target="_blank"
              rel="noreferrer"
              className="pixel-box bg-panel p-6 transition-transform hover:-translate-y-1"
            >
              <p className="font-display text-2xl text-lime">X</p>
              <p className="mt-2 font-mono-read text-sm text-dim">
                Our only social. Daily candles and zero shame.
              </p>
            </a>
            <a
              href={CHART_URL}
              target="_blank"
              rel="noreferrer"
              className="pixel-box bg-panel p-6 transition-transform hover:-translate-y-1"
            >
              <p className="font-display text-2xl text-lime">RadarDex</p>
              <p className="mt-2 font-mono-read text-sm text-dim">Chart and buy — radardex.pro</p>
            </a>
          </div>
        </Section>
      </main>

      <Marquee />

      <footer className="relative z-10 mx-auto w-[92vw] max-w-6xl py-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={glyphAsset} alt="" className="h-8 [image-rendering:pixelated]" />
            <span className="font-display text-xl text-lime">$DILDO</span>
          </div>
          <p className="max-w-md font-mono-read text-xs text-dim">
            $DILDO is a meme coin with no intrinsic value or expectation of financial return. Nothing
            here is financial advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
