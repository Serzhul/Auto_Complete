import { Item, ItemStore } from "./types";

export default class Store implements ItemStore {
  private items: Item[];

  constructor() {
    this.items = [];
  }

  getAllItems(): Item[] {
    return this.items;
  }

  getItem(id: number): Item {
    return this.items[id];
  }

  setAllItems(items: Item[]) {
    this.items = items;
  }
}
