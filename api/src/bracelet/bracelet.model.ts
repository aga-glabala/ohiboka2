import * as mongoose from 'mongoose';

export interface IBracelet extends mongoose.Document {
  name: string,
  strings: string,
  type: string,
  public: boolean,
  rows: Object[],
  created: Date
};

export const BraceletSchema   = new mongoose.Schema({
    name: String,
    strings: [String],
    type: String,
    public: Boolean,
    rows: [],
    created: { type: Date, default: Date.now }
});

export const Bracelet = mongoose.model<IBracelet>('Bracelet', BraceletSchema);
