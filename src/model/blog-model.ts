import { Schema, model, Types } from "mongoose";
interface Iblog {
  title: String;
  date: Date;
  content: String;
  tags: [String];
  createdBy: Types.ObjectId | String;
  comments: [
    {
      author: String;
      date: Date;
      content: String;
    }
  ];
  imageUrl: String;
}
const schema = new Schema<Iblog>({
  title: {
    type: String,
    required: [true, "title is required"],
  },
  date: {
    type: Date,
    default: new Date(),
  },
  content: {
    type: String,
    required: [true, "content is required"],
  },
  tags: [
    {
      type: String,
      enum: {
        values: ["sport", "fashion", "politics", "entertainment"],
        message:
          "a tag can only have sport, fashion, politics or entertainment",
      },
    },
  ],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  comments: [
    {
      author: { name: String },
      date: { type: Date, default: new Date() },
      content: String,
    },
  ],
  imageUrl: {
    type: String,
  },
});

const blogModel = model<Iblog>("Blog", schema);
export default blogModel;
