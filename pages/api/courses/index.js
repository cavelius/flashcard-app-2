import dbConnect from "@/db/connection";
import Course from "@/db/models/Course";

// START BACKEND

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const courses = await Course.find();
    return response.status(200).json(courses);
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
