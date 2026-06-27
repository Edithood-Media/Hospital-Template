/* eslint-disable @next/next/no-img-element */
import React from "react";

import {
  getYouTubeEmbedUrl,
  isRichContentDocument,
  isSafeBase64Webp,
  isSafeLink,
  type RichContentNode,
} from "@/lib/rich-content";

export function RichBlogContent({ contentJson, fallbackContent }: { contentJson: unknown; fallbackContent: string }) {
  if (!isRichContentDocument(contentJson)) {
    const paragraphs = fallbackContent.split(/\n+/).filter(Boolean);
    return (
      <div className="rich-blog-content">
        {paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
    );
  }

  return <div className="rich-blog-content">{contentJson.content?.map((node, index) => renderNode(node, index))}</div>;
}

function renderNode(node: RichContentNode, key: React.Key): React.ReactNode {
  const children = node.content?.map((child, index) => renderNode(child, index));
  const style = getAlignmentStyle(node);

  switch (node.type) {
    case "text":
      return renderText(node, key);
    case "paragraph":
      return <p key={key} style={style}>{children}</p>;
    case "heading":
      return node.attrs?.level === 3
        ? <h3 key={key} style={style}>{children}</h3>
        : <h2 key={key} style={style}>{children}</h2>;
    case "bulletList":
      return <ul key={key}>{children}</ul>;
    case "orderedList":
      return <ol key={key}>{children}</ol>;
    case "listItem":
      return <li key={key}>{children}</li>;
    case "blockquote":
      return <blockquote key={key}>{children}</blockquote>;
    case "horizontalRule":
      return <hr key={key} />;
    case "hardBreak":
      return <br key={key} />;
    case "image":
      return renderImage(node, key);
    case "youtube":
      return renderYoutube(node, key);
    case "table":
      return <div key={key} className="rich-table-wrap"><table><tbody>{children}</tbody></table></div>;
    case "tableRow":
      return <tr key={key}>{children}</tr>;
    case "tableHeader":
      return <th key={key}>{children}</th>;
    case "tableCell":
      return <td key={key}>{children}</td>;
    default:
      return null;
  }
}

function renderText(node: RichContentNode, key: React.Key) {
  let content: React.ReactNode = node.text ?? "";

  for (const mark of node.marks ?? []) {
    if (mark.type === "bold") content = <strong>{content}</strong>;
    if (mark.type === "italic") content = <em>{content}</em>;
    if (mark.type === "underline") content = <u>{content}</u>;
    if (mark.type === "link" && isSafeLink(mark.attrs?.href)) {
      content = <a href={String(mark.attrs?.href)} target="_blank" rel="noreferrer">{content}</a>;
    }
  }

  return <React.Fragment key={key}>{content}</React.Fragment>;
}

function renderImage(node: RichContentNode, key: React.Key) {
  const src = node.attrs?.src;
  if (!isSafeBase64Webp(src)) return null;

  return (
    <figure key={key}>
      <img src={String(src)} alt={typeof node.attrs?.alt === "string" ? node.attrs.alt : ""} loading="lazy" />
    </figure>
  );
}

function renderYoutube(node: RichContentNode, key: React.Key) {
  const embedUrl = getYouTubeEmbedUrl(node.attrs?.src);
  if (!embedUrl) return null;

  return (
    <div key={key} className="rich-youtube">
      <iframe
        src={embedUrl.replace("www.youtube.com", "www.youtube-nocookie.com")}
        title="Embedded YouTube video"
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        sandbox="allow-scripts allow-same-origin allow-presentation"
      />
    </div>
  );
}

function getAlignmentStyle(node: RichContentNode): React.CSSProperties | undefined {
  const textAlign = node.attrs?.textAlign;
  return typeof textAlign === "string" ? { textAlign: textAlign as React.CSSProperties["textAlign"] } : undefined;
}
