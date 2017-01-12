import * as mongoose from 'mongoose';

export interface IBracelet extends mongoose.Document {
  name: string,
  strings: string[],
  type: string,
  public: boolean,
  rows: Object[]
};

export const BraceletSchema   = new mongoose.Schema({
    name: String,
    strings: Array,
    type: String,
    public: Boolean,
    rows: Array
});

export const Bracelet = mongoose.model<IBracelet>('Bracelet', BraceletSchema);
