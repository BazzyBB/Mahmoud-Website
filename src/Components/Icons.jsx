import React from "react";

const base = {
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
  focusable: "false",
};

const paths = {
  message: <path d="M21 15a3 3 0 0 1-3 3H8l-5 4V6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3z" />,
  phone: <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
  arrowLeft: <><path d="M19 12H5" /><path d="m11 18-6-6 6-6" /></>,
  pencil: <><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /><path d="m15 5 3 3" /></>,
  tools: <><path d="M14.7 6.3a4 4 0 0 0 5 5l-9 9a2.1 2.1 0 0 1-3-3z" /><path d="m3 3 6 6" /><path d="m5 3-2 2 4 4 2-2" /><path d="m14 14 6 6" /></>,
  search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m20 20-4.8-4.8" /></>,
  people: <><circle cx="12" cy="7.5" r="3" /><circle cx="5" cy="9" r="2.2" /><circle cx="19" cy="9" r="2.2" /><path d="M6.5 20v-1.5A5.5 5.5 0 0 1 12 13a5.5 5.5 0 0 1 5.5 5.5V20" /><path d="M2 19.5v-1A3.5 3.5 0 0 1 5.5 15" /><path d="M22 19.5v-1a3.5 3.5 0 0 0-3.5-3.5" /></>,
  pin: <><path d="M12 22s7-6.1 7-12a7 7 0 0 0-14 0c0 5.9 7 12 7 12z" /><circle cx="12" cy="10" r="2.5" /></>,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  close: <><path d="M6 6l12 12" /><path d="M18 6 6 18" /></>,
  chevronLeft: <path d="m15 18-6-6 6-6" />,
  chevronRight: <path d="m9 18 6-6-6-6" />,
  plus: <><path d="M12 5v14" /><path d="M5 12h14" /></>,
  check: <path d="m5 12 5 5L20 7" />,
};

export default function Icon({ name, size = 24, className, strokeWidth }) {
  return (
    <svg {...base} width={size} height={size} className={className} strokeWidth={strokeWidth || base.strokeWidth}>
      {paths[name]}
    </svg>
  );
}

// Tree-ring mark used in the logo lockup and as a decorative motif.
export function RingMark({ size = 48, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <defs>
        <radialGradient id="ringFill" cx="45%" cy="42%" r="60%">
          <stop offset="0" stopColor="#e9c48f" />
          <stop offset="1" stopColor="#b9834b" />
        </radialGradient>
      </defs>
      <path d="M32 3c10 0 18.5 4 23.5 11.5S61 28 60 36s-5 15-12 20-15.5 6-23 4S10.5 52 6.5 44 2 27 6 19 22 3 32 3z" fill="url(#ringFill)" />
      <g fill="none" stroke="#5a3b22" strokeWidth="1.4" opacity="0.85">
        <path d="M32 9c8 0 14.5 3.4 18.4 9.2S55 30 54 36.5s-4.5 11.7-10 15.4-12 4.7-18 3.3-11.5-5.3-14.3-11S8.6 31 11.5 24.8 23 9 32 9z" />
        <path d="M32 15.5c6 0 10.8 2.6 13.7 7s3.7 9.2 2.9 14-3.6 8.5-7.7 11.1-9 3.3-13.4 2.2-8.3-4-10.2-8.2-2-9.4.3-13.9S25.5 15.5 32 15.5z" />
        <path d="M32 22c4.2 0 7.3 1.9 9.1 5s2.4 6.3 1.7 9.4-2.8 5.6-5.6 7.1-6 1.8-8.9.8-5.2-3-6.3-5.9-1-6.3.7-9.2S27.6 22 32 22z" />
        <path d="M32 28.5c2.3 0 4 1.1 4.8 2.9s.8 3.7-.2 5.3-2.8 2.4-4.6 2.3-3.4-1.1-4.1-2.8-.4-3.7.8-5.2 1.9-2.5 3.3-2.5z" />
      </g>
      <path d="M44 6c-2 6-6 10-9 17" stroke="#5a3b22" strokeWidth="1.2" fill="none" opacity="0.6" />
    </svg>
  );
}
