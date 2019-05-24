import { CodeAction, TextChange } from "./common";

export interface CharacterStyle {
  letter: string;
  fg: string;
}

export interface PopupItem {
  word: string;
  user_data: number;
}

export interface Vim {
  log: (message: string) => void;
  error: (message: string, ...rest: any[]) => void;
  setStatus: (message: string) => Promise<void>;
  openPopupMenu: (items: PopupItem[]) => void;
  getBuffer: () => Promise<string>;
  confirm: (question: string) => Promise<boolean>;
  confirmTextChange: (action: CodeAction) => Promise<void>;
  applyTextChanges: (textChanges: TextChange[]) => Promise<any[]>;
  insertText: (change: TextChange) => void;
  deleteText: (change: TextChange) => void;
}
