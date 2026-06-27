export type RichContentNode = {
  type?: string;
  text?: string;
  attrs?: Record<string, unknown>;
  marks?: RichContentNode[];
  content?: RichContentNode[];
};

export type RichContentDocument = {
  type: "doc";
  content?: RichContentNode[];
};

export const MAX_RICH_CONTENT_LENGTH = 8 * 1024 * 1024;
export const MAX_RICH_IMAGE_LENGTH = 900_000;
export const MAX_RICH_IMAGE_COUNT = 10;

const allowedNodes = new Set([
  "doc",
  "paragraph",
  "text",
  "heading",
  "bulletList",
  "orderedList",
  "listItem",
  "blockquote",
  "horizontalRule",
  "hardBreak",
  "image",
  "youtube",
  "table",
  "tableRow",
  "tableCell",
  "tableHeader",
]);

const allowedMarks = new Set(["bold", "italic", "underline", "link"]);
const allowedAlignments = new Set(["left", "center", "right", "justify"]);

export function parseRichContent(value: string) {
  if (!value.trim()) return null;
  if (value.length > MAX_RICH_CONTENT_LENGTH) return null;

  try {
    const parsed = JSON.parse(value) as unknown;
    return isRichContentDocument(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function isRichContentDocument(value: unknown): value is RichContentDocument {
  if (!isRecord(value) || value.type !== "doc") return false;
  const stats = { images: 0 };
  return validateNode(value, stats);
}

export function extractPlainTextFromRichContent(document: RichContentDocument | null | undefined) {
  if (!document?.content) return "";
  return document.content.map(extractNodeText).join("\n").replace(/\n{3,}/g, "\n\n").trim();
}

export function textToRichContentDocument(value: string): RichContentDocument {
  const paragraphs = value.split(/\n+/).map((paragraph) => paragraph.trim()).filter(Boolean);

  return {
    type: "doc",
    content: paragraphs.length > 0
      ? paragraphs.map((paragraph) => ({ type: "paragraph", content: [{ type: "text", text: paragraph }] }))
      : [{ type: "paragraph" }],
  };
}

export function isSafeLink(value: unknown) {
  if (typeof value !== "string" || value.length > 1000) return false;

  try {
    const url = new URL(value);
    return ["http:", "https:", "mailto:", "tel:"].includes(url.protocol);
  } catch {
    return value.startsWith("/") && !value.startsWith("//");
  }
}

export function isSafeYouTubeUrl(value: unknown) {
  if (typeof value !== "string" || value.length > 1000) return false;

  try {
    const url = new URL(value);
    return ["youtube.com", "www.youtube.com", "youtu.be", "www.youtu.be"].includes(url.hostname);
  } catch {
    return false;
  }
}

export function getYouTubeEmbedUrl(value: unknown) {
  if (!isSafeYouTubeUrl(value)) return null;
  const url = new URL(value as string);

  if (url.hostname.includes("youtu.be")) {
    const id = url.pathname.replace(/^\//, "");
    return id ? `https://www.youtube.com/embed/${id}` : null;
  }

  if (url.pathname.startsWith("/embed/")) {
    return `https://www.youtube.com${url.pathname}`;
  }

  const id = url.searchParams.get("v");
  return id ? `https://www.youtube.com/embed/${id}` : null;
}

export function isSafeBase64Webp(value: unknown) {
  return typeof value === "string" && value.startsWith("data:image/webp;base64,") && value.length <= MAX_RICH_IMAGE_LENGTH;
}

function validateNode(node: unknown, stats: { images: number }): node is RichContentNode {
  if (!isRecord(node) || typeof node.type !== "string" || !allowedNodes.has(node.type)) return false;

  if (node.type === "text" && typeof node.text !== "string") return false;
  if (typeof node.text === "string" && node.text.length > 20_000) return false;
  if (!validateAttrs(node.type, node.attrs)) return false;

  if (node.type === "image") {
    stats.images += 1;
    if (stats.images > MAX_RICH_IMAGE_COUNT) return false;
  }

  if (node.marks !== undefined) {
    if (!Array.isArray(node.marks)) return false;
    for (const mark of node.marks) {
      if (!validateMark(mark)) return false;
    }
  }

  if (node.content !== undefined) {
    if (!Array.isArray(node.content)) return false;
    for (const child of node.content) {
      if (!validateNode(child, stats)) return false;
    }
  }

  return true;
}

function validateAttrs(type: string, attrs: unknown) {
  if (attrs === undefined) return true;
  if (!isRecord(attrs)) return false;

  const textAlign = attrs.textAlign;
  if (textAlign !== undefined && textAlign !== null && (typeof textAlign !== "string" || !allowedAlignments.has(textAlign))) return false;

  if (type === "heading") {
    return attrs.level === 2 || attrs.level === 3;
  }

  if (type === "image") {
    return isSafeBase64Webp(attrs.src) && optionalString(attrs.alt, 180) && optionalString(attrs.title, 180);
  }

  if (type === "youtube") {
    return isSafeYouTubeUrl(attrs.src);
  }

  return true;
}

function validateMark(mark: unknown) {
  if (!isRecord(mark) || typeof mark.type !== "string" || !allowedMarks.has(mark.type)) return false;
  if (mark.type !== "link") return true;
  if (!isRecord(mark.attrs)) return false;
  return isSafeLink(mark.attrs.href);
}

function extractNodeText(node: RichContentNode): string {
  if (node.text) return node.text;
  if (node.type === "image") return "[Image]";
  if (node.type === "youtube") return "[YouTube video]";
  return node.content?.map(extractNodeText).join(" ").trim() ?? "";
}

function optionalString(value: unknown, maxLength: number) {
  return value === undefined || value === null || (typeof value === "string" && value.length <= maxLength);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
