# React Project

---

## 使用方法

```bash
# 启动命令
npm start

# 切换环境
npm start --qa # qa 环境

# 构建命令
npm run build
```

## 功能

- antd 主题修改
- editorconfig 文件规范
- prettier 代码规范
- eslint
- stylelint
- babel@7
- postcss
- webpack@4
- api proxy 支持环境切换
- mobx
- sourceMap 地址替换
- git commit msg 规范
- dll 支持

## 配置切换的文件

`tools/swtich.config.js`

## 注意

- 为了方便跨机调试，项目默认使用局域网 ip 访问方式，如需要支持 `localhost` 或 `127.0.0.1` 访问，请更改 `devServer.host`

## 禁止用户访问 map 文件的 nginx 配置

```nginx
server {
	# 禁止访问 txt、sh、map 文件
	location ~* \.(txt|sh|map)$ {
		deny all;
	}
}
```

## TODO

[TODO.md](./TODO.md)
