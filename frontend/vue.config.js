process.env.VUE_APP_SERVER_URL = "http://localhost:8000";
module.exports = {
    configureWebpack: {
        module: {
            rules: [
                {
                    test: /.html$/,
                    loader: "vue-template-loader",
                    exclude: /index.html/
                }
            ]
        }
    },
    devServer: {
        disableHostCheck: true
    }
}
