module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: ["> 0.25%", "not dead"]
        },
        modules: false,
        useBuiltIns: "usage",
        corejs: {
          version: "3.8",
          proposals: true
        }
      }
    ],
    "@babel/preset-typescript",
    "@babel/preset-react"
  ]
};