import dbConnect from "@/db/connection";
import Course from "@/db/models/Course";
import Card from "@/db/models/Card";

// Backend: Course

export default async function handler(request, response) {
  // ist das gleiche wie:
  // const id = request.query.id;
  const { id } = request.query;

  try {
    await dbConnect();
    // Daten von Datenbank lesen
    if (request.method === "GET") {
      const courseFound = await Course.findById(id).populate("cards");
      if (!courseFound) {
        return response.status(404).json({ status: "Not Found" });
      }
      return response.status(200).json(courseFound);
    }

    // Daten von Datenbank bearbeiten
    if (request.method === "PUT") {
      const courseToUpdate = await Course.findByIdAndUpdate(id, request.body);
      response.status(200).json(courseToUpdate);
    }

    // Daten von Datenbank löschen
    if (request.method === "DELETE") {
      const courseToDelete = await Course.findByIdAndDelete(id);
      await Card.deleteMany({ _id: { $in: courseToDelete.cards } });
      response.status(260).json("Course deleted");
    }

    // // Daten von datenbank erstellen hier werden die CARDS erstellt
    // if (request.method === "POST") {
    //   try {
    //     const newCard = await Card.create(request.body);
    //     await Course.findByIdAndUpdate(
    //       id,
    //       { $push: { cards: newCard._id } },
    //       { new: true }
    //     );
    //     response.status(200).json({ success: "card uploaded" });
    //   } catch (e) {
    //     response.status(500).json({ error: "error uploading card" });
    //     console.log(e);
    //   }
    // }

    // // CARDS Daten von Datenbank bearbeiten
    // if (req.method === "PUT") {
    //   try {
    //     const { courseId, cardId } = req.query; // Annahme: Die Kurs- und Karten-IDs werden über die Anfrage-URL bereitgestellt

    //     const updatedCard = await Course.findOneAndUpdate(
    //       { _id: courseId, "cards._id": cardId }, // Suche nach dem Kurs mit der gegebenen ID und der Karte mit der gegebenen ID im Array "cards"
    //       {
    //         $set: {
    //           "cards.$.question": req.body.question,
    //           "cards.$.answer": req.body.answer,
    //         },
    //       }, // Aktualisierung der Frage und Antwort der Karte
    //       { new: true } // Option, um das aktualisierte Dokument zurückzugeben
    //     );

    //     if (!updatedCard) {
    //       return res.status(404).json({ error: "Course or Card not found" });
    //     }

    //     res.status(200).json({ success: "Card updated", updatedCard });
    //   } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: "Error updating card" });
    //   }
    // } else {
    //   res.status(405).json({ error: "Method not allowed" }); // Fehler, wenn die Methode nicht erlaubt ist
    // }
  } catch (e) {
    console.log(e);
  }
}
