-   @todo 如何测试
-   https://www.learnrxjs.io/learn-rxjs/recipes/progressbar

## 2021-02-23 18:07:34

-   @todo https://stackblitz.com/edit/react-global-state1

-   @ques dropdown 应该放在 PcDatePicker 中

    -   days
    -   months
    -   year

## 2020-11-26 15:21:40

-   @ques react concurrency

    -   如何开启...

-   @ques react-mobile-datepicker

### end

-   @ques jss 插件 运行性能消耗

    -   能不能直接用 webpack 转化...

-   px to rem

    -   自己写一个 plugin
    -   margin: 10px 20px 这个有没有用
        -   。。。

-   @material-ui/styles px to rem

    -   https://github.com/cssinjs/jss/blob/master/docs/jss-plugin-default-unit.md
    -   https://material-ui.com/zh/customization/spacing/

-   @ques theme

    -   用 context 包一下 就可以了

## 2020-11-25 09:36:08

-   @test preFix 有没有用

    -   什么属性需要 autoPrefix
    -   也许自带的已经可以了

-   @todo jss

    -   @todo theme
    -   plugin:> https://cssinjs.org/plugins/?v=v10.5.0
        -   https://github.com/cssinjs/jss/tree/master/docs

autoprefix:> jss-plugin-vendor-prefixer | inline-style-prefixer

```ts
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const fontSize = 14; // px
// Tell Material-UI what's the font-size on the html element.
// 16px is the default font-size used by browsers.
const htmlFontSize = 16;
const coef = fontSize / 14;

const theme = createMuiTheme({
    typography: {
        pxToRem: (size) => `${(size / htmlFontSize) * coef}rem`,
    },
});
```

### end

-   @ques 能不能支持 父亲的 传进来的 class advance

    -   @material-ui/styles "combine" props classes
    -   https://material-ui.com/zh/styles/advanced/#makestyles

react-pro jss

-   @ques todo 直接实用 react-jss

## 2020-11-05 22:00:20

-   (react-datepicker)[https://github.com/Hacker0x01/react-datepicker/]

    -   多了 300k
    -   dateRange

## 2020-11-24 11:05:54

### end

-   ts-lint -> es-lint

    -   https://www.robertcooper.me/using-eslint-and-prettier-in-a-typescript-project

-   react 17

-   @todo turn off Missing return type on function

-   @ques 国际化没用 可能是 webpack 的配置有问题
    -   https://codesandbox.io/s/date-picker-4ppwh -> 线上有用
    -   为什么我的样式都需要而外引入 js
    -   demo 里面直接就可以显示...
    -   因为库就不一样
    -

### end

-   @todo 国际化...
-   @ques /en/ 怎么无法匹配

-   https://cssinjs.org/?v=v10.0.0

-   @todo 国际化
-   @todo node 本地服务器

### end

-   service

## 2020-11-03 15:59:31

-   @ques 如果不 ignore node_modules 就会出现 require is not defined
    -   应该是 babel 的某些组件被转化的问题 只使用 ts-loader 不会出现错误

### end

-   @ques React.Suspense 是干什么

-   @todo eslint @ques
-   @ques analyze 怎么没有 react 库的大小

-   @todo webpack analyze + typeCheck
-   @ques React.StrictMode
-   @note routeConfig
-   webpack 使用 ts 配置

-   `__webpack_public_path__`

-   @ques devServer react-router
