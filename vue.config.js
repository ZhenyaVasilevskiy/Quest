const path = require("path");

module.exports = {
    assetsDir: "",
    configureWebpack: {
        output: {
            filename: "vue/js/[name].[hash].js",
            chunkFilename: "vue/js/[name].[hash].js"
        }
    },
    chainWebpack: (config) => {
        config.module
            .rule("images")
            .use("url-loader")
            .tap(function(options) {
                options.fallback.options.name = "vue/images/[name].[hash].[ext]";
                return options;
            });

        config.module
            .rule("svg")
            .use("file-loader")
            .tap(function(options) {
                options.name = "vue/images/[name].[hash].[ext]";
                return options;
            });
    },
    css: {
        extract: {
            filename: "vue/css/[name].[hash].css",
            chunkFilename: "vue/css/[name].[hash].css"
        }
    }
};
