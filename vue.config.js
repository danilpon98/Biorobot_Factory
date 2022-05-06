const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const spritesmithPlugin = require("webpack-spritesmith");
const resolve = (dir) => path.resolve(__dirname, dir);

const templateFunction = function (data) {
  const shared = ".sprite { background-image: url(I); display: block;}".replace(
    "I",
    data.sprites[0].image
  );

  const perSprite = data.sprites
    .map(function (sprite) {
      return ".sprite-N { background-position: X% Y%; padding-bottom: P%; background-size: SX% SY%;}"
        .replace("N", sprite.name)
        .replace("X", (sprite.x / (sprite.total_width - sprite.width)) * 100)
        .replace("Y", (sprite.y / (sprite.total_height - sprite.height)) * 100)
        .replace("P", (sprite.height / sprite.width) * 100)
        .replace("SX", (sprite.total_width / sprite.width) * 100)
        .replace("SY", (sprite.total_height / sprite.height) * 100);
    })
    .join("\n");

  return shared + "\n" + perSprite;
};

const configSVGIcon = function (config) {
  // Exclude SVG sprite directory from default svg rule
  config.module.rule("svg").exclude.add(resolve("src/assets/svg-icons")).end();

  // Options used by svgo-loader to optimize SVG files
  // https://github.com/svg/svgo#what-it-can-do
  const options = {
    plugins: [
      { name: "cleanupAttrs" },
      { name: "cleanupEnableBackground" },
      { name: "cleanupIDs" },
      { name: "cleanupListOfValues" },
      { name: "cleanupNumericValues" },
      { name: "collapseGroups" },
      { name: "convertColors" },
      { name: "convertPathData" },
      { name: "convertShapeToPath" },
      { name: "convertStyleToAttrs" },
      { name: "convertTransform" },
      { name: "mergePaths" },
      { name: "removeComments" },
      { name: "removeDesc" },
      { name: "removeDimensions" },
      { name: "removeDoctype" },
      { name: "removeEditorsNSData" },
      { name: "removeEmptyAttrs" },
      { name: "removeEmptyContainers" },
      { name: "removeEmptyText" },
      { name: "removeHiddenElems" },
      { name: "removeMetadata" },
      { name: "removeNonInheritableGroupAttrs" },
      { name: "removeRasterImages" },
      { name: "removeTitle" },
      { name: "removeUnknownsAndDefaults" },
      { name: "removeUselessDefs" },
      { name: "removeUnusedNS" },
      { name: "removeUselessStrokeAndFill" },
      {
        name: "removeAttrs",
        params: {
          attrs: ["fill"],
        },
      },
      { name: "removeXMLProcInst" },
      { name: "removeStyleElement" },
      { name: "removeUnknownsAndDefaults" },
      { name: "sortAttrs" },
    ],
  };

  // Include only SVG sprite directory for new svg-icon rule
  // Use svg-sprite-loader to build SVG sprite
  // Use svgo-loader to optimize SVG files
  config.module
    .rule("svg-icon")
    .test(/\.svg$/)
    .include.add(resolve("src/assets/svg-icons"))
    .end()
    .use("svg-sprite-loader")
    .loader("svg-sprite-loader")
    .options({
      symbolId: "icon-[name]",
    })
    .end()
    .use("svgo-loader")
    .loader("svgo-loader")
    .options(options)
    .end();
};

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath:
    process.env.NODE_ENV === "production" ? "/Biorobot_Factory/" : "/",
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/scss/_variables.scss";
        `,
      },
    },
  },
  configureWebpack: {
    target: "web",
    plugins: [
      new spritesmithPlugin({
        src: {
          cwd: resolve("src/assets/sprite-robots"),
          glob: "*.png",
        },
        target: {
          image: resolve("src/assets/img/sprite-robots.png"),
          css: [
            [
              resolve("src/scss/modules/sprites/sprite-robots.scss"),
              {
                format: "function_based_template",
              },
            ],
          ],
        },
        apiOptions: {
          cssImageRef: "~/src/assets/img/sprite-robots.png",
        },
        spritesmithOptions: {
          padding: 0,
        },
        customTemplates: {
          function_based_template: templateFunction,
        },
      }),
    ],
  },
  chainWebpack: (config) => {
    configSVGIcon(config);
  },
});
