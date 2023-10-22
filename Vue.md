1: 通过在文件夹下触发终端,来初始化项目,可以搭建出模板

node_modules文件夹:项目依赖文件夹

public文件夹: 一般放置一些静态资源(图片), 放在public中的文件夹中的静态资源,webpack进行打包的时候,会原封不动打包到**dist**文件夹中

src文件夹:(程序员源代码文件夹)
    assets文件夹: 存放静态资源(多个组件共用的静态资源), 
    放置在assets文件夹里面静态资源,在webpack打包的时候,webpack会把静态资源当作一个模块,打包在**JS**文件里面

    components文件夹: 一般放置的是非路由组件(全局组件)

    App.vue: 唯一的根组件,vue当中的组件. 

    main.js:程序的入口文件,整个程序最先执行的文件

babel.config.js: 配置文件

package.json文件: 认为项目'身份证',记录项目叫做什么,项目中有哪些依赖,怎末运行.

package-lock.json: 缓存文件

2: 声明变量但是没有使用eslink校验工具报错,在vue.config.js中配置为false

3: 项目中路由 vue-router
key: url(地址栏中的路径)
value: 相应上中下结构

路由组件:
 
 