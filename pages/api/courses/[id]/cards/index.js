import dbConnect from "@/db/connection";
import Course from "@/db/models/Course";
import Card from "@/db/models/Card";

// Backend: Card

export default async function handler(request, response) {
  // ist das gleiche wie:
  // const id = request.query.id;
  const { id } = request.query;

  try {
    await dbConnect();

    // Daten von datenbank erstellen hier werden die CARDS erstellt
    if (request.method === "POST") {
      try {
        const newCard = await Card.create(request.body);
        await Course.findByIdAndUpdate(
          id,
          { $push: { cards: newCard._id } },
          { new: true }
        );
        response.status(200).json({ success: "card uploaded" });
      } catch (e) {
        response.status(500).json({ error: "error uploading card" });
        console.log(e);
      }
    }
  } catch (e) {
    console.log(e);
  }
}
