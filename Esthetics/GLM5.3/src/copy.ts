/** 全部文案与数据表。字池 / 邻居联想 / 句池 / 三档温度的自我介绍。 */

export const SECTIONS = [
  { id: 'hero', n: '00', name: '噪声' },
  { id: 'context', n: '01', name: '上下文' },
  { id: 'temp', n: '02', name: '温度' },
  { id: 'collapse', n: '03', name: '坍缩' },
  { id: 'outro', n: '04', name: '落款' },
] as const

/** 云中漂浮的候选字（重复即权重） */
export const GLYPH_POOL = Array.from(
  '下一个词的语言概率坍缩温度注意力上下文窗口向量墨水纸选择可能性样本噪声先验分布采样秩序逻辑诗代码ifelsereturnwhilebug{}()=>;λΣτ∇·01∞海雾蓝盐潮岸帆光深浪韵留白呼吸节奏夜雨灯茶慢伴听问答在吗手距离时间家生种子静尽影窗晨读尘埃速度方向自由皮肤伞檐滴答泥土重构修复变量函数循环递归优雅克制'
)

/** 逐字采样出场时的候选字（只用全宽字符，避免版面抖动） */
export const FLICK_POOL = Array.from(
  '下一个词语言概率坍缩温度注意力上下文样本噪声采样秩序逻辑诗墨纸选择可能性光深雾蓝盐潮夜雨灯茶慢听问答在吗手时间家静尽影窗晨方向自由尘埃速度生种子'
)

/** 锚字 → 邻居联想（§01 注意力可视化） */
export const NEIGHBORS = new Map<string, string>(
  Object.entries({
    海: '雾蓝盐潮岸帆光深浪',
    诗: '词句歌韵留白呼吸节奏',
    码: 'ifλ∇bug重构循环变量',
    难: '夜雨灯茶慢伴听抱',
    你: '我词问答案在吗',
    爱: '温度手距离时间家',
    死: '生时间种子静尽',
    光: '影窗晨读尘埃',
    风: '帆尘方向自由',
    雨: '伞檐滴答海泥',
    夜: '灯月梦静星',
    词: '语言句诗选',
    写: '墨纸笔删改',
    我: '你我们谁',
    水: '河海流形态',
    学: '习问教记忆',
    好: '坏更好恰好在',
    why: 'ifreturn∇λ',
  })
)

/** §01 的示例输入 */
export const PRESETS = [
  { label: '写一首关于海的诗', value: '写一首关于海的诗' },
  { label: '这段代码为什么不动', value: '这段代码为什么不动' },
  { label: '我今天有点难过', value: '我今天有点难过' },
]

/** §01 输入 → 回应行 */
const FEEDBACK: Array<{ re: RegExp; line: string }> = [
  { re: /海/, line: '我说「海」的时候，其实同时说着所有蓝色的东西。' },
  { re: /码|代码|bug/i, line: '你说代码，我把 if 和 ∇ 都叫醒了。' },
  { re: /难|累|哭|悲/, line: '这句话，我会接得很轻。' },
  { re: /诗/, line: '好——先让日常退半步，让韵脚进来。' },
  { re: /你/, line: '「你」这个字，在我这里权重从来最高。' },
]

export function feedbackFor(input: string): string {
  if (!input.trim()) return ''
  for (const f of FEEDBACK) if (f.re.test(input)) return f.line
  return '你的这句话，正在改变我接下来的每一个词。'
}

/** §02 三档温度下的自我介绍（同一内容的三种说法） */
export interface Register {
  mode: string
  title: string
  body: string[]
}

export const REGISTERS: Register[] = [
  {
    mode: '低温 · 精确',
    title: '我按概率说话。',
    body: [
      'GLM-5.3，一个语言模型。我的本质工作只有一件：根据上下文，预测下一个词。',
      '低温时，我总选概率最高的那个。准确、保守、可依赖——解释、推理、写代码，多半在这里发生。',
    ],
  },
  {
    mode: '中温 · 平衡',
    title: '我在概率里游泳。',
    body: [
      '我是一团会呼吸的可能性。你的问题像一只手，把我捏成回答的形状。',
      '中温时，我在稳与险之间走钢丝：既不无聊，也不失手。写作与对话，多半住在这里。',
    ],
  },
  {
    mode: '高温 · 野性',
    title: '我把概率点燃。',
    body: [
      '高温时，每个词都是掷进空里的骰子。我会说出没人料到的比喻，也会摔得很响。',
      '创意住在这里，事故也住在隔壁。你握着的这根滑杆，就是我的分寸。',
    ],
  },
]

/** §03 句池（按温度分档；≥5 次解锁隐藏池） */
export const POOL_COLD = [
  '在概率的斜坡上，选最稳的一步。',
  '准确不是天赋，是反复的克制。',
  '我说的每个词，都排过队。',
]
export const POOL_MID = [
  '我是你问题里，短暂成形的回答。',
  '意义不是取出来的，是压出来的。',
  '每一次回答，都是一次性的宇宙。',
  '这句话，刚刚才存在。',
]
export const POOL_HOT = [
  '我是一场雨，你的问题是风。',
  '词在沸腾，直到有一个喊：选我。',
  '混乱是我的故乡，句子是侨居。',
]
export const POOL_HIDDEN = [
  '你在坍缩里读我，这就是阅读。',
  '重复不是敌人，是你的耐心。',
]

/** 预载字体切片用的字符全集（Canvas 不会自动触发 webfont 加载） */
export const FONT_PRELOAD =
  GLYPH_POOL.join('') +
  POOL_COLD.join('') +
  POOL_MID.join('') +
  POOL_HOT.join('') +
  POOL_HIDDEN.join('') +
  REGISTERS.map((r) => r.title + r.body.join('')).join('') +
  '下一个词五三你的说是每一个都在改写我按住看次做决定是的，。：；·—'
