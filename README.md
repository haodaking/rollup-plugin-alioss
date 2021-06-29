# rollup-plugin-alioss

Rollup 上传文件到 Ali-OSS 的插件

## Install

Using npm:

```console
npm install rollup-plugin-alioss --save-dev
```

## Usage

Create a `rollup.config.js` [configuration file](https://www.rollupjs.org/guide/en/#configuration-files) and import the plugin:

```js
import alioss from 'rollup-plugin-alioss'

export default {
  input: 'src/index.js',
  output: {
    dir: 'output',
    format: 'es'
  },
  plugins: [
    alioss({
      oss: {
        region: '<oss region>',
        accessKeyId: '<Your accessKeyId>',
        accessKeySecret: '<Your accessKeySecret>',
        bucket: '<Your bucket name>'
      },
      src: '要上传的本地目录',
      dest: '上传到OSS的目标目录'
    })
  ]
}
```
