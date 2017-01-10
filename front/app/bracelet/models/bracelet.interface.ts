import {Row} from './row.model';

export interface BraceletInterface {
  name: string;
  public: boolean;
  rows: Row[];
  strings: string[];
  id: string;

  addRowAtBegining(): void;
  addRowAtEnd(): void;
  removeFirstRow(): boolean;
  removeLastRow(): boolean;
  addFirstString(): void;
  addLastString(): void;
  removeFirstString(): boolean;
  removeLastString(): boolean;

  getColors(): string[];
  getStringsNumber(): number;

  toJson(): {};
  isTextType(): {};
}
