import { useRouter } from "next/router";
import FormAddCard from "../../../components/FormAddCard";
import useSWR from "swr";

export default function CreateCard() {
  const router = useRouter();
  const { id } = router.query;
  const { data, mutate } = useSWR(`/api/courses/${id}/cards`);

  console.log("data:", data);

  // Neue Card erstellen
  async function addCard(cardData) {
    console.log(cardData);
    const response = await fetch(`/api/courses/${id}/cards`, {
      method: "POST",
      body: JSON.stringify(cardData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      await response.json();
      router.push(`/courses/${id}`);
    }
  }

  return (
    <>
      <div id="add-place" className="create-course">
        <div className="create-course">
          <FormAddCard
            onSubmit={addCard}
            formName={"add-place"}
            cancel={`/courses/${id}`}
          />
        </div>
      </div>
    </>
  );
}
