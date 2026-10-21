import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { PreviewCard, WikiLinkPreview } from "./WikiLinkPreview";

describe("wiki-link preview card", () => {
  it("shows title, path, snippet and tags", () => {
    const html = renderToStaticMarkup(
      <PreviewCard
        path="notes/alpha.md"
        state={{
          status: "ready",
          preview: { path: "notes/alpha.md", title: "Alpha", snippet: "First words of the page", tags: ["ops"] },
        }}
      />,
    );
    expect(html).toContain("Alpha");
    expect(html).toContain("notes/alpha.md");
    expect(html).toContain("First words of the page");
    expect(html).toContain("#ops");
  });

  it("shows a skeleton while loading", () => {
    const html = renderToStaticMarkup(<PreviewCard path="notes/alpha.md" state={{ status: "loading" }} />);
    expect(html).toContain('aria-busy="true"');
    expect(html).toContain("animate-pulse");
  });

  it("says when the target is missing", () => {
    const html = renderToStaticMarkup(<PreviewCard path="nope.md" state={{ status: "missing" }} />);
    expect(html).toContain("Page not found");
    expect(html).toContain("nope.md");
  });

  it("renders only the link until hovered", () => {
    const html = renderToStaticMarkup(
      <WikiLinkPreview path="notes/alpha.md">
        <a href="/page/notes/alpha.md" className="wiki-link">Alpha</a>
      </WikiLinkPreview>,
    );
    expect(html).toBe('<a href="/page/notes/alpha.md" class="wiki-link" data-state="closed">Alpha</a>');
  });
});
