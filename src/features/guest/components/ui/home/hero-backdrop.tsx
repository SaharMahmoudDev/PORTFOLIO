export function HeroBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(53,212,130,0.07) 0 1px, transparent 1px 60px), repeating-linear-gradient(90deg, rgba(53,212,130,0.07) 0 1px, transparent 1px 60px)",
          maskImage:
            "radial-gradient(65% 75% at 72% 46%, #000 20%, transparent 82%)",
          WebkitMaskImage:
            "radial-gradient(65% 75% at 72% 46%, #000 20%, transparent 82%)",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(55% 50% at 78% 28%, rgba(53,212,130,0.22), transparent 70%), radial-gradient(40% 40% at 6% 96%, rgba(53,212,130,0.08), transparent 70%)",
        }}
      />

      <svg className="absolute inset-0 h-full w-full opacity-[0.05] mix-blend-overlay">
        <filter id="hero-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-grain)" />
      </svg>

      <svg
        className="text-primary absolute inset-0 h-full w-full"
        viewBox="0 0 1440 850"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M 0 210 H 420 L 480 270 H 900"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.14"
        />
        <path
          d="M 0 640 H 300 L 360 580 H 860 L 920 520"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.12"
        />
        <path
          d="M 180 70 V 190 L 240 250 V 470"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.1"
        />
        <path
          d="M 900 520 L 960 460 H 1180"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.2"
        />
        <path
          d="M 920 520 V 700 H 1240"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.16"
        />
        <circle cx="420" cy="210" r="3" fill="currentColor" opacity="0.3" />
        <circle cx="900" cy="270" r="3" fill="currentColor" opacity="0.26" />
        <circle cx="360" cy="580" r="3" fill="currentColor" opacity="0.26" />
        <circle cx="1180" cy="460" r="3.5" fill="currentColor" opacity="0.36" />
        <circle cx="1240" cy="700" r="3" fill="currentColor" opacity="0.26" />
        <circle cx="240" cy="250" r="3" fill="currentColor" opacity="0.22" />
      </svg>
    </div>
  );
}
