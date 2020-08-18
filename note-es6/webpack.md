
## 主要配置简介



## entry配置
```js
```


## output配置
```js
```


## louder配置


## plugins配置


## sourceMap
+ 背景：业务代码出错时，控制台报错信息只会展示打包输出后的文件的行，而不会展示源文件代码的出错行；
+ 作用：sourceMap是一个映射关系；打包输出文件的出错行对应的源文件代码的第几行的映射关系
+ 使用：`devtools：source-map | inline-source-map | cheap-inline-source-map | cheap-inline-source-map | eval`
```js
// 配置 devtools：source-map
1. 在dist目录下会生成 `main.js.map` 文件，`main.js.map`文件包含对应的映射关系

// 配置 devtools：inline-source-map 
2. 将生成的映射关系64位的串放在打包输出文件的最后一行展示，不会多生成`main.js.map` 文件; 并且inline-source-map会准确定位到出错代码的行和第几列，有点耗费性能

// 配置 devtools：cheap-inline-source-map
3. cheap-inline-source-map将生成的映射关系64位的串放在打包输出文件的最后一行展示，不会多生成`main.js.map` 文件; cheap-inline-source-map不会定位的出错的列也就是那个字符出错，只会定位到哪一行出错

// 配置 devtools：cheap-moudle-inline-source-map
4. cheap-moudle-inline-source-map：cheap-inline-source-map只会定位到业务代码，不包含第三方，cheap-moudle-inline-source-map定位比较全，会管业务代码和loader或者第三方

// 
5. eval方式是将代码用eval执行的生成映射关系 srcURL直接指向源文件；打包速度快，但是文件大的话，可能不全；

6. cheap-moudle-eval-source-map: 快并且全

// 两个环境
1. prod： cheap-moudle-source-map
2. dev： cheap-moudle-eval-source-map
```

## webpack-dev-server
+ 提升开发效率
```js
// 3种方式
1. 命令配置 webpack --watch： 监听文件变化，不需要每次手动执行编译构建，只要文件变化，手动刷新浏览器就可以

2. webpack配置dev-server： 可以监听文件变化之外还可以自动刷新浏览器，不需要手动刷新了
devServer: {
    contentBase: '',  
    open: true,     // 默认自动打开浏览器
}

3. 使用webpackDevMiddleWare+node的epress
```

## HotMoudleReplacementPlugin