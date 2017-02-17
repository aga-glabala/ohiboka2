import * as mongoose from 'mongoose';

export interface IBracelet extends mongoose.Document {
  name: string,
  strings: string,
  type: string,
  public: boolean,
  rows: Object[],
  author: {
    name: String,
    id: String
  },
  created: Date
};

export const BraceletSchema   = new mongoose.Schema({
    name: String,
    strings: [String],
    type: String,
    public: Boolean,
    rows: [],
    author: {
      name: String,
      id: String
    },
    created: { type: Date, default: Date.now }
});

export const Bracelet = mongoose.model<IBracelet>('Bracelet', BraceletSchema);
