# ai-vue-tiny

基于 `pnpm + Vue 3 + TypeScript + Vite` 初始化，已集成：

- [OpenTiny TinyVue](https://github.com/opentiny/tiny-vue)
- TailwindCSS (v4)
- GitHub Pages 自动部署工作流
- Docker 镜像打包与运行配置

## 本地开发

```bash
pnpm install
pnpm dev
```

## 构建

```bash
pnpm build
```

## GitHub Pages

仓库已包含工作流：`.github/workflows/deploy-pages.yml`

- 触发条件：`push` 到 `main`（以及手动触发）
- 构建产物：`dist/`
- 部署方式：GitHub Actions -> Pages

> 首次使用请在仓库 Settings -> Pages 中确认 Source 为 **GitHub Actions**。

`vite.config.ts` 已根据 `GITHUB_REPOSITORY` 自动设置 `base`，适配仓库名路径。

## Docker 镜像

构建镜像：

```bash
pnpm docker:build
```

运行镜像：

```bash
pnpm docker:run
```

访问：`http://localhost:8080`
