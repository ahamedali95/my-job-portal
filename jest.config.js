module.exports = {
  displayName: 'Unit Tests',
  testEnvironment: "jsdom",
  collectCoverageFrom: [
    "**/*.{ts,tsx}"
  ],
  coveragePathIgnorePatterns: [
    "layout",
    "service-worker.ts",
    "custom.d.ts",
    "index.tsx",
    "types.ts",
    "wdyr.ts",
    "api",
    "index.ts",
    "Route.tsx"
  ],
  coverageDirectory: "coverage",
  errorOnDeprecated: true,
  testMatch: [
    "**/__tests__/**/*.(spec).{ts,tsx}"
  ],
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json"
  ],
  moduleNameMapper: {
    "^lodash-es$": "lodash",
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/__mocks__/fileMock.ts",
    "\\.(css|scss)$": "identity-obj-proxy",
    "@components/forms": "components/forms",
    "@components/notifications": "components/notifications",
    "@hooks": "hooks",
    "@api/queries": "api/queries",
    "@api/mutations": "api/mutations",
    "@assets": "assets"
  },
  moduleDirectories: ["node_modules", "src"],
  rootDir: "src",
  setupFilesAfterEnv: [
    "./jest-setup.js"
  ],
  verbose: true
};
