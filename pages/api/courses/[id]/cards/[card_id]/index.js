import dbConnect from "@/db/connection";
import Course from "@/db/models/Course";
import Card from "@/db/models/Card";

// Backend: Card

export default async function handler(request, response) {
  // ist das gleiche wie:
  // const id = request.query.id;
  console.log("###################", request.query);
  const { id, card_id } = request.query;

  try {
    await dbConnect();
    // Daten von Datenbank lesen
    if (request.method === "GET") {
      const cardFound = await Card.findById(card_id);
      if (!cardFound) {
        return response.status(404).json({ status: "Not Found" });
      }
      return response.status(200).json(cardFound);
    }

    // Daten von Datenbank bearbeiten
    if (request.method === "PUT") {
      const cardToUpdate = await Card.findByIdAndUpdate(card_id, request.body);
      response.status(200).json(cardToUpdate);
    }

    // Daten von Datenbank löschen
    if (request.method === "DELETE") {
      await Card.findByIdAndDelete(card_id);
      response.status(260).json("Card deleted");
    }
  } catch (e) {
    console.log(e);
  }
}
