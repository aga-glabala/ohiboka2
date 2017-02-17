import {Row} from './row.model';
import {User} from '../../users/user.model';

export interface BraceletInterface {
  name: string;
  public: boolean;
  rows: Row[];
  strings: string[];
  id: string;
  created: Date;
  author: User;

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
