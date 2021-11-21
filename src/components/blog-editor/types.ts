import { Descendant } from "slate";
import { Element as SlateElement } from "slate";

export type LinkElement = { type: "link"; url: string; children: Descendant[] };
export interface ElementProps {
  attributes: { [key: string]: string };
  children: React.ReactNode;
  element: SlateElement;
}
export interface UrlInputProps {
  url: unknown | string;
  onChange: (e: any) => void;
}
