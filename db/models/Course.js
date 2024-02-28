import mongoose from "mongoose";
import "./Card";

const { Schema } = mongoose;

const courseSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: false },
  cards: { type: [Schema.Types.ObjectId], ref: "Card" },
});
const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);
console.log("Course", Course);

export default Course;
