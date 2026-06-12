# Curriculum Pipeline — the repeatable path from a raw curriculum to the product

This is **the method** for turning any grade's official curriculum (منهج عين)
into structured, navigable, tool-linked content in daleely. Grade 5 is the first
run; every later grade follows the exact same steps.

---

## The seam

```
RAW (owner)                STRUCTURE (this pipeline)            PRODUCT
books (عين PDFs)  ──▶  ingest ──▶ render-verify ──▶ structure ──▶ classify ──▶ surface ──▶ gap report
                       (txt)      (visual)         (typed data)  (productType) (hub)      (tool backlog)
```

The owner places full curricula under `docs/curriculum/<grade>/` (gitignored —
raw PDFs + `_raw/*.txt` extractions). The pipeline converts them to the product.

## Steps

1. **Ingest** *(owner)* — extract raw text per book with `docs/curriculum/<grade>/_tools/extract.py`
   (RTL word-sort, PyMuPDF). Output: `<subject>/_raw/*.txt` with `===== [PDF p.X/Y] =====` markers.
2. **Render-verify** — the `_raw` text carries minor glyph artifacts, so the
   **reliable** source of structure is the rendered page. Render each book's
   فهرس (TOC) pages to PNG (`fitz ... get_pixmap(dpi≈130)`) and read them visually.
   Parallelize across subjects (one reader per subject).
3. **Structure** — capture each subject's **scope & sequence** (units → lesson
   titles, in order) into a typed module `lib/curriculum/<grade>.ts`
   (`GradeCurriculum`, see `lib/curriculum/types.ts`). Register it in
   `lib/curriculum/index.ts`.
4. **Classify** — tag each lesson's `productType`:
   - `interactive` + `toolSlug` — a tool already covers the skill (drill with feedback);
   - `practice` — drillable but its tool isn't built yet (a gap);
   - `lesson` — learn/read content (concept + key terms), not a drill.
   Subjects carry a `defaultProductType` (math → `practice`, content subjects → `lesson`);
   only the exceptions are annotated, so the data stays terse.
5. **Surface** — the reusable hub `app/curriculum/[grade]/page.tsx` renders any
   registered grade: subjects → units → lessons, linking interactive lessons to
   their tools and badging the rest. No per-grade UI work.
6. **Gap report** — list the `practice` lessons grouped into buildable tools as a
   prioritized backlog (`docs/CURRICULUM_GRADE5_GAP.md`). Each new tool is then
   built via `docs/TOOL_PLAYBOOK.md` in its own PR — the same engine + primitives
   + a11y + gamification, content aligned to the book.

## Why this scales

Structure is cheap and uniform; tools are built where the drill model adds value.
A new grade = run steps 2–6 (the owner already did step 1). The hub and the tool
playbook are written once and reused, so each grade is mostly data + a focused set
of new tools from its gap report.
