type CodeTone = "keyword" | "component" | "string" | "prop" | "punct";

type CodeToken = {
  text: string;
  tone?: CodeTone;
};

const CODE_LINES: readonly (readonly CodeToken[])[] = [
  [
    { text: "export", tone: "keyword" },
    { text: " " },
    { text: "function", tone: "keyword" },
    { text: " " },
    { text: "Portfolio", tone: "component" },
    { text: "()", tone: "punct" },
    { text: " " },
    { text: "{", tone: "punct" },
  ],
  [
    { text: "  " },
    { text: "return", tone: "keyword" },
    { text: " " },
    { text: "(", tone: "punct" },
  ],
  [
    { text: "    " },
    { text: "<", tone: "punct" },
    { text: "Page", tone: "component" },
    { text: " " },
    { text: "author", tone: "prop" },
    { text: "=", tone: "punct" },
    { text: '"Lenin Alvarado"', tone: "string" },
    { text: ">", tone: "punct" },
  ],
  [
    { text: "      " },
    { text: "<", tone: "punct" },
    { text: "Hero", tone: "component" },
    { text: " " },
    { text: "role", tone: "prop" },
    { text: "=", tone: "punct" },
    { text: '"Desarrollador Full Stack"', tone: "string" },
    { text: " " },
    { text: "/>", tone: "punct" },
  ],
  [
    { text: "      " },
    { text: "<", tone: "punct" },
    { text: "Projects", tone: "component" },
    { text: " " },
    { text: "source", tone: "prop" },
    { text: "=", tone: "punct" },
    { text: '"GitHub Pages"', tone: "string" },
    { text: " " },
    { text: "/>", tone: "punct" },
  ],
  [
    { text: "    " },
    { text: "</", tone: "punct" },
    { text: "Page", tone: "component" },
    { text: ">", tone: "punct" },
  ],
  [
    { text: "  " },
    { text: ");", tone: "punct" },
  ],
  [{ text: "}", tone: "punct" }],
];

export function CodeWindow() {
  return (
    <div className="code-window-slot">
      <div className="code-window" aria-hidden="true">
        <div className="code-window__bar">
          <span className="code-window__dot code-window__dot--red" />
          <span className="code-window__dot code-window__dot--yellow" />
          <span className="code-window__dot code-window__dot--green" />
          <span className="code-window__file">Portfolio.tsx</span>
        </div>
        <pre className="code-window__body">
          <code>
            {CODE_LINES.map((line, lineIndex) => (
              <span className="code-window__line" key={lineIndex}>
                {line.map((token, tokenIndex) =>
                  token.tone ? (
                    <span
                      className={`code-window__tok code-window__tok--${token.tone}`}
                      key={tokenIndex}
                    >
                      {token.text}
                    </span>
                  ) : (
                    <span key={tokenIndex}>{token.text}</span>
                  ),
                )}
                {lineIndex === CODE_LINES.length - 1 ? (
                  <span className="code-window__cursor" />
                ) : null}
              </span>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
