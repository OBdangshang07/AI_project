# SOLARIS Vue 3

`GPT5.6Sol_V2.html` 的 Vue 3 + Vite 重构版本。项目保留原始 Three.js 0.160.0 渲染管线、程序化着色器、轨道动力学、后期处理、搜索、测距、导览、跟随、时间导航和自适应画质。

## 技术结构

- Vue 3 Composition API 与 `<script setup>` 负责应用生命周期和界面组件。
- 原生 Three.js 服务负责高频场景状态，避免响应式代理进入逐帧渲染路径。
- CSS 保持源页面的原始样式规则，确保玻璃面板、标签和响应式布局一致。

## 运行

```bash
pnpm install
pnpm dev
```

生产构建与本地预览：

```bash
pnpm build
pnpm preview
```
