import { Schema, model, Types } from "mongoose";
interface Iblog {
  title: String;
  author: String;
  date: String;
  content: String;
  tags: [String];
  comments: [
    {
      author: String;
      date: String;
      content: String;
    }
  ];
}
const schema = new Schema<Iblog>({
  title: {
    type: String,
    required: [true, "title is required"],
  },
  author: {
    type: String,
    required: [true, "author is required"],
  },
  date: String,
  content: {
    type: String,
    required: [true, "content is required"],
  },
  tags: [
    {
      type: String,
    },
  ],
  comments: [{ author: String, date: String, content: String }],
});

const blogModel = model<Iblog>("Blog", schema);
export default blogModel;
