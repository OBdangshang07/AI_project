import { useEffect, useState, type FormEvent } from "react";
import { markKey, sections } from "@/lib/proof/content";
import { DraftRewrite } from "./draft-rewrite";
import { useProof } from "./proof-context";

function Word({
  id,
  text,
}: {
  id: string;
  text: string;
}) {
  const { annotate, annotations, registerWord } = useProof();
  const on = Boolean(annotations[id]);

  return (
    <button
      type="button"
      data-word={id}
      data-no-ink
      className={`word-mark${on ? " is-on" : ""}`}
      aria-pressed={on}
      aria-label={`批注「${text}」`}
      onClick={() => annotate(id)}
      ref={(el) => registerWord(id, el)}
    >
      {text}
    </button>
  );
}

function Note({ wordId }: { wordId: string }) {
  const { annotations, registerNote } = useProof();
  const ann = annotations[wordId];
  if (!ann) return null;
  return (
    <aside
      className="note"
      data-note={wordId}
      ref={(el) => registerNote(wordId, el)}
    >
      {ann.note}
    </aside>
  );
}

function ParagraphBlock({
  parts,
}: {
  parts: { t: string; id?: string }[];
}) {
  const ids = parts.filter((p) => p.id).map((p) => p.id!) ;

  return (
    <div className="proof-block">
      <p className="proof-p" data-no-ink>
        {parts.map((part, i) =>
          part.id ? (
            <Word key={part.id} id={part.id} text={part.t} />
          ) : (
            <span key={`t-${i}`}>{part.t}</span>
          ),
        )}
      </p>
      <div className="min-w-0">
        {ids.map((id) => (
          <Note key={id} wordId={id} />
        ))}
      </div>
    </div>
  );
}

function Composer() {
  const { query, submitQuery, reduced } = useProof();
  const [value, setValue] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("second-pen-query");
      if (raw && !query) {
        const parsed = JSON.parse(raw) as { q: string; a: string };
        if (parsed?.q && parsed?.a) submitQuery(parsed.q);
      }
    } catch {
      /* ignore */
    }
    // restore once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!value.trim()) submitQuery("");
    else submitQuery(value);
    setValue("");
  };

  return (
    <form className="mt-10" onSubmit={onSubmit} data-no-ink>
      <div className="query-row">
        <label htmlFor="proof-q">Q.</label>
        <input
          id="proof-q"
          name="q"
          maxLength={40}
          autoComplete="off"
          placeholder="在此写下你的一句"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          suppressHydrationWarning
        />
      </div>
      {query ? (
        <p className="answer" style={{ animation: reduced ? "none" : undefined }}>
          A. {query.a}
        </p>
      ) : null}
    </form>
  );
}

function InkPad() {
  const { padEl, idleNote } = useProof();
  return (
    <div
      data-ink-pad
      data-draw="true"
      id="ink-pad"
      className="ink-pad"
      ref={(el) => {
        padEl.current = el;
      }}
      role="application"
      aria-label="页边书写区。在此拖拽留下一笔，我会用校对符号回应。"
    >
      <span className="ink-pad-caption">页边 · 在此留下一笔</span>
      {idleNote ? (
        <p className="note absolute right-4 bottom-4 m-0 max-w-40 border-0 p-0">
          {idleNote}
        </p>
      ) : null}
    </div>
  );
}

export function Galley() {
  const { replyKind } = useProof();
  const think = sections.find((s) => s.id === "think")!;
  const make = sections.find((s) => s.id === "make")!;
  const collab = sections.find((s) => s.id === "collab")!;
  const unfinished = sections.find((s) => s.id === "unfinished")!;

  return (
    <article id="galley" className="galley">
      <section aria-labelledby="k-think">
        <h2 id="k-think" className="section-kicker">
          {think.kicker}
        </h2>
        {think.paragraphs.map((p) => (
          <ParagraphBlock key={p.id} parts={p.parts} />
        ))}
      </section>

      <DraftRewrite />

      <section aria-labelledby="k-make">
        <h2 id="k-make" className="section-kicker">
          压痕
        </h2>
        {make.paragraphs.map((p) => (
          <ParagraphBlock key={p.id} parts={p.parts} />
        ))}
      </section>

      <section aria-labelledby="k-collab">
        <h2 id="k-collab" className="section-kicker">
          {collab.kicker}
        </h2>
        {collab.paragraphs.map((p) => (
          <ParagraphBlock key={p.id} parts={p.parts} />
        ))}
        <ul className="colophon-latin mb-10 mt-6 list-none space-y-1 p-0 text-ink-soft">
          {markKey.map((m) => (
            <li key={m.mark}>
              {m.mark}　{m.meaning}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="k-unfinished">
        <h2 id="k-unfinished" className="section-kicker">
          {unfinished.kicker}
        </h2>
        {unfinished.paragraphs.map((p) => (
          <ParagraphBlock key={p.id} parts={p.parts} />
        ))}
        <InkPad />
        <Composer />
      </section>

      {replyKind ? (
        <p className="mark-toast" role="status">
          {labelForKind(replyKind)}
        </p>
      ) : null}
    </article>
  );
}

function labelForKind(kind: string) {
  switch (kind) {
    case "query":
      return "询问";
    case "caret":
      return "增补";
    case "delete":
      return "删除";
    case "stet":
      return "保留";
    case "check":
      return "收到";
    default:
      return "记下";
  }
}
