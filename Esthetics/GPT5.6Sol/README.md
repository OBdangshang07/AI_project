# SOL / 答案之前

一件关于 GPT-5.6 Sol 如何思考、创造与协作的交互式前端自画像。

核心装置“张力织机”把意图、证据与想象变成三根可操作的弦：滚动改变推理阶段，拖拽改变回答姿态，按住空格会短暂打开被舍弃的分支。整个体验以暖纸、墨色和朱砂红构成一份会响应访客的编辑校样。

## 运行

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
```

## 交互

- 拖动 SVG 中三个红色控制点，或使用校准台滑杆。
- 聚焦控制点后可用方向键、Home、End 精确调节。
- 在页面空白处按住 `Space`，查看未说出口的分支。
- 系统开启 `prefers-reduced-motion` 后，持续呼吸和惯性动画会停止，滚动状态与交互结果仍然保留。

## 验证

项目包含 `scripts/visual-qa.mjs` 与 `scripts/interaction-qa.mjs`。它们使用 Codex 工作区自带的 Playwright 与本机 Chrome，用于桌面/手机截图、键盘交互、锚点遮挡、横向溢出、运行时错误及 reduced-motion 检查。
