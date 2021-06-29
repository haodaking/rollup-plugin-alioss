const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const OSS = require('ali-oss')

const log = console.log

let client = null

async function uploadTarget(src, dest) {
  try {
    const result = await client.put(dest, src)
    log(chalk.green('上传成功', result.url))
  } catch (e) {
    log(chalk.red('上传失败', src))
    log(e)
  }
}

function generateUploadTarget(src, dest) {
  fs.readdir(src, function (err, files) {
    if (err) {
      log(err)
      return
    }
    files.forEach(function (file) {
      const _src = src + '/' + file
      const _dest = dest + '/' + file
      const stats = fs.statSync(_src)
      // 判断是否为文件
      stats.isFile() && uploadTarget(_src, _dest)
      // 判断是否为文件夹
      stats.isDirectory() && generateUploadTarget(_src, _dest)
    })
  })
}

export default function aliOSS(options = {}) {
  const {
    oss = { region: '', accessKeyId: '', accessKeySecret: '', bucket: '' },
    hook = 'writeBundle',
    src = '',
    dest = ''
  } = options

  return {
    name: 'ali-oss',
    [hook]: async () => {
      if (!oss) {
        return
      }
      client = new OSS(oss)
      generateUploadTarget(src, dest)
    }
  }
}
