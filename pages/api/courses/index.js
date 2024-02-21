import dbConnect from "@/db/connection";
import Course from "@/db/models/Course";

// START BACKEND

export default async function handler(request, response) {
  await dbConnect();

  // Daten auf Datenbank lesen
  if (request.method === "GET") {
    const courses = await Course.find();
    return response.status(200).json(courses);
  }
  // Daten auf Datenbank erstellen
  if (request.method === "POST") {
    Course.create(request.body);
    return response
      .status(200)
      .json({ success: true, status: "Course created" });
  }

  // Daten von Datenbank bearbeiten
  if (request.method === "PUT") {
    const courseToUpdate = await Course.findByIdAndUpdate(id, request.body);
    response.status(200).json(courseToUpdate);
  } else {
    return response.status(405).json({ message: "Method not allowed" });
  }
}
