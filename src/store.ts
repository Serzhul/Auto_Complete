import { Item, ItemStore } from "./types";

export default class Store implements ItemStore {
  private items: Item[];
  private curKeyword: string;

  constructor() {
    this.curKeyword = "";
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

  getCurKeyword(): string {
    return this.curKeyword;
  }

  setCurKeyword(keyword: string) {
    this.curKeyword = keyword;
  }
}
