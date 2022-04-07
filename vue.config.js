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

module.exports = defineConfig({
  transpileDependencies: true,
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
          image: resolve("public/img/sprite-robots.png"),
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
          cssImageRef: "~/public/img/sprite-robots.png",
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
});
