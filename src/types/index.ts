export interface Item {
  readonly id: number;
  text: string;
}

export interface ItemStore {
  getAllItems: () => Item[];
  getItem: (id: number) => Item;
  setAllItems: (items: Item[]) => void;
}
export interface Store {
  items: Item[];
}
