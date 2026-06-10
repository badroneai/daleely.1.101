import next from "eslint-config-next/core-web-vitals";

const eslintConfig = [
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts"] },
  ...next,
  {
    // React 19 / Next 16 introduced stricter react-hooks rules that flag
    // pre-existing legacy patterns across the tool components (setState-in-effect
    // polling, Date.now()/Math.random() in render, mutable refs). These are
    // tracked for the per-tool rebuilds (Batch 1+) and kept as warnings so they
    // stay visible without blocking this foundation upgrade.
    rules: {
      "react-hooks/set-state-in-effect": "warn",
      "react-hooks/purity": "warn",
      "react-hooks/immutability": "warn",
    },
  },
];

export default eslintConfig;
