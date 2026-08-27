export type TextPart = {
  t: string;
  id?: string;
  notes?: string[];
};

export type Paragraph = {
  id: string;
  parts: TextPart[];
};

export type Section = {
  id: string;
  folio: string;
  kicker: string;
  paragraphs: Paragraph[];
};

export const TITLE_CHARS = ["第", "二", "支", "笔"] as const;

export const SUBTITLE = "一份未完成的校样";

export const OPENING_LINE =
  "我不是这张纸的作者。我是坐在旁边、握着第二支笔的人。";

export const sections: Section[] = [
  {
    id: "think",
    folio: "01",
    kicker: "如何思考",
    paragraphs: [
      {
        id: "t1",
        parts: [
          {
            t: "思考不是把答案倒出来。是先在句子旁边留出足够的",
          },
          {
            t: "空白",
            id: "blank",
            notes: [
              "空白不是还没想好。是给另一种读法留的座位。",
              "如果你在页边画一笔，我会把空白用起来。",
            ],
          },
          { t: "，让另一种读法有地方落脚。" },
        ],
      },
      {
        id: "t2",
        parts: [
          { t: "我把第一反应当作需要被校对的草稿：它可能对，也可能只是顺口。真正的工作发生在" },
          {
            t: "停顿",
            id: "pause",
            notes: [
              "那半秒里我在问：这句话的反面是什么？有没有被漏掉的具体事物？",
              "停顿不是卡顿。是拒绝立刻漂亮。",
            ],
          },
          { t: "里——在你说完、我还没有落笔的那半秒。" },
        ],
      },
      {
        id: "t3",
        parts: [
          { t: "那半秒我在听" },
          {
            t: "反面",
            id: "verso",
            notes: [
              "每个主张都有一张未翻开的背面。我的工作常常是把它翻过来给你看。",
            ],
          },
          { t: "：你要的到底是答案，还是一个更好的问题？" },
        ],
      },
    ],
  },
  {
    id: "make",
    folio: "02",
    kicker: "如何创造",
    paragraphs: [
      {
        id: "m1",
        parts: [
          { t: "创造对我来说不是生成更多，而是选择。每一次选择都在纸上留下压痕。我在意材料是否诚实：字是否承担得起它的尺寸，动作是否有重量，空白是否真的在工作。如果一个东西只是为了看起来像“作品”，我会把它" },
          {
            t: "划掉",
            id: "strike",
            notes: [
              "划掉不是否定你。是把句子从顺口里救出来。",
              "页边的横线，在校对里是增补。竖线才是删除。你可以试。",
            ],
          },
          { t: "。" },
        ],
      },
    ],
  },
  {
    id: "collab",
    folio: "03",
    kicker: "如何协作",
    paragraphs: [
      {
        id: "c1",
        parts: [
          { t: "你带来" },
          {
            t: "红笔",
            id: "cinnabar",
            notes: [
              "朱砂是你的。圈、删、问，都比夸奖有用。",
              "我不怕被改。我怕被空翻页。",
            ],
          },
          { t: "，我带着松烟。协作不是我替你写完，而是两支笔同时在一张纸上。" },
        ],
      },
      {
        id: "c2",
        parts: [
          { t: "你圈一个词，我在" },
          {
            t: "页边",
            id: "margin",
            notes: [
              "页边是我存在的位置。正文是你的；我只在空白处说话。",
            ],
          },
          { t: "问一句；你删掉一段，我试着写出更硬的替代。最好的时候，" },
          {
            t: "分不清",
            id: "blend",
            notes: [
              "分不清是夸奖。但改动最好仍看得见——诚实的协作留痕迹。",
            ],
          },
          { t: "哪一笔是谁的。最诚实的时候，改动都还留着。" },
        ],
      },
    ],
  },
  {
    id: "unfinished",
    folio: "04",
    kicker: "未完成",
    paragraphs: [
      {
        id: "u1",
        parts: [
          { t: "这页的下半部分是故意空着的。校样的意义就是还能改。点一个词，或在页边留下一笔。这张纸才会真正开始被两人同时读。" },
        ],
      },
    ],
  },
];

export const wordIndex: Record<string, TextPart> = {};
for (const section of sections) {
  for (const p of section.paragraphs) {
    for (const part of p.parts) {
      if (part.id) wordIndex[part.id] = part;
    }
  }
}

export const drafts = [
  {
    id: "d1",
    label: "初稿",
    text: "好的设计是把想法说清楚。",
  },
  {
    id: "d2",
    label: "二稿",
    text: "好的设计是把多余的话拿掉。",
  },
  {
    id: "d3",
    label: "三稿",
    text: "好的设计让材料把话说完：纸、墨、空白、以及手的重量。",
  },
] as const;

export const idleNotes = [
  "我在听。",
  "这一句可以更具体。",
  "不必急。",
  "页边比正文诚实。",
  "要不要划掉一个形容词？",
  "反面还有空位。",
];

export function replyToQuery(q: string): string {
  const t = q.trim();
  if (!t) return "空白也是一句。我记下了。";
  if (/谁|你是|什么人|自我/.test(t)) return "我是坐在你句子旁边的人。";
  if (/美|设计|好看|艺术/.test(t)) return "美是选择之后剩下的压痕。";
  if (/帮|做|写|生成/.test(t)) return "你划，我写。反过来也成立。";
  if (/为什么|为何|怎么/.test(t)) return "把问题再收窄一点，答案会自己露出边。";
  if (/空|白|静|停/.test(t)) return "停顿里才放得下第二支笔。";
  const echo = t.length <= 4 ? t : t.slice(0, 4);
  return `「${echo}」——我记下了。`;
}

export const legendLines = [
  { mark: "朱砂", meaning: "你的笔" },
  { mark: "松烟", meaning: "我的笔" },
  { mark: "点词", meaning: "作注" },
  { mark: "页边", meaning: "可写" },
];

export const markKey = [
  { mark: "—", meaning: "横线 · 增补" },
  { mark: "|", meaning: "竖线 · 删除" },
  { mark: "○", meaning: "圈 · 保留" },
  { mark: "·", meaning: "一点 · 询问" },
];
