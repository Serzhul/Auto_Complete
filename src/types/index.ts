export interface Item {
  readonly id: number;
  text: string;
}

export interface ItemStore {
  getAllItems: () => Item[];
  getItem: (id: number) => Item;
  setAllItems: (items: Item[]) => void;
  getCurKeyword: () => string;
  setCurKeyword: (keyword: string) => void;
}
export interface Store {
  items: Item[];
}

export type NodeType = Document | Element | HTMLElement;
