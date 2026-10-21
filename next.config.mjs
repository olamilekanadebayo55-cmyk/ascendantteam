const security = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];
export default {
  poweredByHeader: false,
  // The homepage route reads this file; make sure it ships with the server bundle.
  outputFileTracingIncludes: { "/": ["./src/site/index.html"] },
  async headers() { return [{ source: "/:path*", headers: security }]; },
};
