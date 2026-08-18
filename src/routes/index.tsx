import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

import heroAsset from "@/assets/c-hero.png.asset.json";
import flexAsset from "@/assets/c-flex.png.asset.json";
import kingAsset from "@/assets/c-king.png.asset.json";
import laserAsset from "@/assets/c-laser.png.asset.json";
import redAsset from "@/assets/c-red.png.asset.json";
import rocketAsset from "@/assets/c-rocket.png.asset.json";
import glyphAsset from "@/assets/logo-glyph.png.asset.json";
import meme1Asset from "@/assets/meme-1.png.asset.json";
import meme2Asset from "@/assets/meme-2.png.asset.json";
import meme3Asset from "@/assets/meme-3.png.asset.json";
import meme4Asset from "@/assets/meme-4.png.asset.json";
import meme5Asset from "@/assets/meme-5.png.asset.json";
import meme6Asset from "@/assets/meme-6.png.asset.json";
import videoAsset from "@/assets/dildogate.mp4.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Green Dildo Coin — $DILDO" },
      {
        name: "description",
        content:
          "$DILDO: the green candle with sunglasses. Chart, memes, tokenomics and the tape — go green or go home.",
      },
      { property: "og:title", content: "Green Dildo Coin — $DILDO" },
      {
        property: "og:description",
        content: "The green candle with sunglasses. Memes, tape and tokenomics.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const CA = "So1anaDiLd0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

const NAV = [
  { href: "#tape", label: "The tape" },
  { href: "#story", label: "The story" },
  { href: "#armory", label: "Armory" },
  { href: "#tokenomics", label: "Tokenomics" },
  { href: "#memes", label: "Meme vault" },
  { href: "#community", label: "Community" },
];

const CREW = [
  { src: heroAsset.url, name: "The Green One", line: "Default state: printing." },
  { src: flexAsset.url, name: "Flex Candle", line: "Bought the dip with both arms." },
  { src: kingAsset.url, name: "King Candle", line: "Rules the daily close." },
  { src: laserAsset.url, name: "Laser Candle", line: "Eyes on one number only." },
  { src: rocketAsset.url, name: "Rocket Candle", line: "Exit liquidity? Never heard of her." },
  { src: redAsset.url, name: "The Red One", line: "Cries in 4-hour timeframe." },
];

const MEMES = [
  { src: meme1Asset.url, title: "THE GREEN ONE" },
  { src: meme2Asset.url, title: "AND THEN IT HAPPENED" },
  { src: meme3Asset.url, title: "STILL HOLDING" },
  { src: meme4Asset.url, title: "SEE YOU IN THE TRENCHES" },
  { src: meme5Asset.url, title: "GREEN CANDLES ONLY" },
  { src: meme6Asset.url, title: "GO GREEN OR GO HOME" },
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
        <div className="mx-auto flex w-[92vw] max-w-6xl items-center justify-between gap-4 py-3">
          <a href="#top" className="flex items-center gap-3">
            <img src={glyphAsset.url} alt="$DILDO pixel mascot" className="h-9 [image-rendering:pixelated]" />
            <span className="font-display text-2xl text-lime">$DILDO</span>
          </a>
          <nav className="hidden gap-6 lg:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="font-display text-sm tracking-widest text-dim uppercase transition-colors hover:text-lime"
              >
                {n.label}
              </a>
            ))}
          </nav>
          <a
            href="#buy"
            className="pixel-box font-display bg-lime px-4 py-2 text-sm tracking-widest text-black uppercase transition-transform hover:-translate-y-0.5"
          >
            Buy $DILDO
          </a>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Candles />
          </div>
          <div className="relative z-10 mx-auto grid w-[92vw] max-w-6xl items-center gap-10 py-20 md:grid-cols-2 md:py-28">
            <div>
              <p className="font-display text-sm tracking-[0.35em] text-lime uppercase">
                Green candle · sunglasses · no chill
              </p>
              <h1 className="font-display mt-3 text-6xl leading-[0.85] text-bone md:text-8xl">
                GO GREEN
                <br />
                <span className="text-lime">OR GO HOME</span>
              </h1>
              <p className="mt-6 max-w-md font-mono-read text-dim">
                We launched a coin, drew one absurdly long green candle, and the internet did the
                rest. $DILDO is a meme with a chart attached.
              </p>
              <div id="buy" className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#tape"
                  className="pixel-box font-display bg-lime px-6 py-3 tracking-widest text-black uppercase transition-transform hover:-translate-y-0.5"
                >
                  Buy now
                </a>
                <a
                  href="#memes"
                  className="pixel-box font-display bg-panel px-6 py-3 tracking-widest text-bone uppercase transition-transform hover:-translate-y-0.5"
                >
                  Steal the memes
                </a>
              </div>
              <button
                onClick={copy}
                className="pixel-box mt-6 flex w-full max-w-md items-center gap-3 bg-deep px-4 py-3 text-left"
              >
                <span className="font-display text-xs tracking-widest text-lime uppercase">CA</span>
                <code className="flex-1 truncate font-mono-read text-xs text-dim">{CA}</code>
                <span className="font-display text-xs tracking-widest text-bone uppercase">
                  {copied ? "Copied" : "Copy"}
                </span>
              </button>
            </div>
            <div className="flex justify-center">
              <img
                src={heroAsset.url}
                alt="Green pixel candle mascot wearing sunglasses"
                className="w-64 animate-[bob_3.6s_ease-in-out_infinite] md:w-80 [image-rendering:pixelated]"
              />
            </div>
          </div>
        </section>

        <Marquee />

        {/* TAPE */}
        <Section id="tape" eyebrow="Live-ish" title="The tape">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { k: "Price", v: "$0.0∞69", s: "+420.69%" },
              { k: "Holders", v: "13,370", s: "diamond handed" },
              { k: "Liquidity", v: "BURNED", s: "keys thrown away" },
            ].map((c) => (
              <div key={c.k} className="pixel-box bg-panel p-6">
                <p className="font-display text-xs tracking-[0.3em] text-dim uppercase">{c.k}</p>
                <p className="font-display mt-2 text-4xl text-lime">{c.v}</p>
                <p className="mt-1 font-mono-read text-xs text-dim">{c.s}</p>
              </div>
            ))}
          </div>
          <div className="pixel-box mt-6 flex items-end gap-2 overflow-hidden bg-deep p-6">
            {[26, 34, 30, 40, 28, 46, 38, 52, 44, 60, 54, 72, 66, 88, 120].map((h, i) => (
              <div key={i} className="flex flex-1 flex-col items-center">
                <div
                  className={`w-full border-2 border-black ${i > 8 ? "bg-lime" : i % 3 === 0 ? "bg-blood" : "bg-lime-deep"}`}
                  style={{ height: `${h * 1.6}px` }}
                />
              </div>
            ))}
          </div>
        </Section>

        {/* STORY */}
        <Section id="story" eyebrow="Receipts" title="What actually happened">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-5 font-mono-read text-dim">
              <p>
                It started as a joke in a group chat: what if the greenest candle on the chart had a
                face, sunglasses, and absolutely no self-awareness?
              </p>
              <p>
                Twelve hours later the mascot was everywhere. The red candles panicked. Somebody made
                a video. Then the timeline made it a whole thing.
              </p>
              <p className="text-bone">
                No presale. No team allocation. No roadmap written by a consultant. Just a green
                candle that refuses to sit down.
              </p>
              <div className="pixel-box bg-panel p-5">
                <p className="font-display text-xs tracking-[0.3em] text-lime uppercase">
                  Don&apos;t get rugged
                </p>
                <ul className="mt-3 space-y-2 font-mono-read text-sm text-dim">
                  <li>▸ One contract address. The one above. Nothing else.</li>
                  <li>▸ We will never DM you first.</li>
                  <li>▸ Anyone promising an airdrop for your seed phrase is a red candle.</li>
                </ul>
              </div>
            </div>
            <div className="pixel-box overflow-hidden bg-black">
              <video
                src={videoAsset.url}
                controls
                playsInline
                poster={meme2Asset.url}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </Section>

        {/* ARMORY */}
        <Section id="armory" eyebrow="Meet the cast" title="The Armory">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CREW.map((c) => (
              <div key={c.name} className="pixel-box bg-panel p-5 transition-transform hover:-translate-y-1">
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
                  <div key={k} className="flex items-center justify-between gap-4 border-b-2 border-black/60 pb-3">
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
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              ["Telegram", "The group chat that never sleeps.", "https://t.me"],
              ["X", "Daily candles and zero shame.", "https://x.com"],
              ["DexScreener", "Watch the tape in real time.", "https://dexscreener.com"],
            ].map(([t, d, href]) => (
              <a
                key={t}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="pixel-box bg-panel p-6 transition-transform hover:-translate-y-1"
              >
                <p className="font-display text-2xl text-lime">{t}</p>
                <p className="mt-2 font-mono-read text-sm text-dim">{d}</p>
              </a>
            ))}
          </div>
        </Section>
      </main>

      <Marquee />

      <footer className="relative z-10 mx-auto w-[92vw] max-w-6xl py-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={glyphAsset.url} alt="" className="h-8 [image-rendering:pixelated]" />
            <span className="font-display text-xl text-lime">$DILDO</span>
          </div>
          <p className="font-mono-read text-xs text-dim">
            $DILDO is a meme coin with no intrinsic value or expectation of financial return. Nothing
            here is financial advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
