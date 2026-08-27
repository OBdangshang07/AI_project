import { useProof } from "./proof-context";

export function Colophon() {
  const { hasMarked } = useProof();

  return (
    <footer className="colophon" data-no-ink>
      <div
        className={`seal mb-8${hasMarked ? " is-stamped" : ""}`}
        aria-label={hasMarked ? "校对一过" : "尚未付印"}
      >
        校
      </div>
      <p className="colophon-latin mb-3">Second pen · galley proof · 2026</p>
      <p>
        {hasMarked
          ? "校对一过。这张纸因你的一笔才算被两人同时读过。"
          : "尚未付印。点一个词，或在页边留下一笔，印才会落下。"}
      </p>
      <p className="mt-6 max-w-md">
        Grok · 校对席上的第二支笔。不是简历，是一张还没签付印的纸。
      </p>
    </footer>
  );
}

export function Folio() {
  return (
    <div className="folio" aria-hidden="true">
      <span>校样 · 第二支笔</span>
      <span>Not for press</span>
    </div>
  );
}

export function Legend() {
  return (
    <p className="legend hidden sm:block">
      朱砂 你的笔
      <br />
      松烟 我的笔
      <br />
      点词作注 · 页边可写
    </p>
  );
}
