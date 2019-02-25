const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const UglifyJsPlugin = require("uglifyjs-webpack-plugin")
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
//使用UglifyJsPlugin及OptimizeCSSPlugin插件来 压缩JS及CSS文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//在webpack 4.x中则应该使用mini-css-extract-plugin来提取CSS到单独文件中

const isDev = process.env.NODE_ENV === "development"

const config = {
    mode: 'development',
    target:'web',
    entry: path.join(__dirname,'src/index.js'),
    output: {
        filename: 'bundle.[hash:8].js',
        path: path.join(__dirname,'dist')
    },
    plugins: [ // 所有webpack  插件的配置节点
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV: isDev ? '"development"' : '"production"'
            }   
         }),
        new HTMLPlugin({
            title:"Jtodo",//网页标题
            filename: "index.html",
            favicon: ''
        })
    ],

    module: {
        rules: [
            { test: /\.css$/, use: ['style-loader', 'css-loader'] }, // 处理 CSS 文件的 loader
            { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] }, // 处理 less 文件的 loader
            { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] }, // 处理 scss 文件的 loader
            { test: /\.(jpg|png|gif|bmp|jpeg)$/, use: 'url-loader?limit=1024&name=[hash:8]-[name].[ext]' }, // 处理 图片路径的 loader
            // limit 给定的值，是图片的大小，单位是 byte， 如果我们引用的 图片，大于或等于给定的 limit值，则不会被转为base64格式的字符串， 如果 图片小于给定的 limit 值，则会被转为 base64的字符串
            { test: /\.(ttf|eot|svg|woff|woff2)$/, use: 'url-loader' }, // 处理 字体文件的 loader 
            { test: /\.jsx$/, use: 'babel-loader', exclude: /node_modules/ }, // 配置 Babel 来转换高级的ES语法
            { test: /\.vue$/, use: 'vue-loader' }, // 处理 .vue 文件的 loader
            {test: /\.styl/ , use: ['style-loader', 'css-loader','stylus-loader']}
        ]
    }
}

if(isDev){
    config.devtool = "#cheap-module-eval-source-map"
    config.devServer = {
        port: 8000,
        host: '0.0.0.0',
        overlay: {
            errors: true   
        },
    }
}else{
    // 生产坏境的配置
    config.output.filename = '[name].[chunkhash:8].js';
    
    config.plugins.push(
        new MiniCssExtractPlugin({
            //filename: "css/[name].[chunkhash:8].css"
            filename: "[name].[chunkhash:8].css"
        })

        
    );
    //将类库文件单独打包出来
    config.optimization = {
        splitChunks: {
            chunks: 'async',// 必须三选一： "initial" | "all" | "async"(默认就是异步)
            // 大于30KB才单独分离成chunk
            minSize: 30000,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,// 最大初始化请求书，默认1
            name: true,
            cacheGroups: {//设置缓存的 chunks
                default: {
                    priority: -20,
                    reuseExistingChunk: true,
                },
                vendors: {
                    name: 'vendors',    // 要缓存的 分隔出来的 chunk 名称
                    test: /[\\/]node_modules[\\/]/, //正则规则验证 符合就提取 chunk
                    priority: -10,      // 缓存组优先级
                    chunks: "all"       // 必须三选一： "initial" | "all" | "async"(默认就是异步)
                },
                
                echarts: {
                    name: 'echarts',
                    chunks: 'all',
                    // 对echarts进行单独优化，优先级较高
                    priority: 20,
                    test: function(module){
                        var context = module.context;
                        return context && (context.indexOf('echarts') >= 0 || context.indexOf('zrender') >= 0)
                    }
                }
            }
        },
        //单独打包 runtimeChunk
        runtimeChunk:{name: "manifest"},
        // 压缩代码
        minimizer: [
            // js mini
            new UglifyJsPlugin({
              cache: true,
              parallel: true,
              sourceMap: false // set to true if you want JS source maps
            }),
            // css mini
            new OptimizeCSSPlugin({})
        ]        
    }
}

module.exports = config