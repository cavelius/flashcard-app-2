import { useRouter } from "next/router";
import FormAddCard from "../../../components/FormAddCard";
import useSWR from "swr";

export default function CreateCard() {
  const router = useRouter();
  const { id } = router.query;
  const { data, mutate } = useSWR(`/api/courses/${id}`);

  console.log("data:", data);

  // Neue Card erstellen
  async function addCard(cardData) {
    console.log(cardData);
    const response = await fetch(`/api/courses/${id}`, {
      method: "POST",
      body: JSON.stringify(cardData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      await response.json();
      router.push(`/courses/${id}`);
      //   mutate();
      //   e.target.reset();
    } else {
      console.error(`Error: ${response.status}`);
    }
  }

  return (
    <>
      <div id="add-place" className="create-course">
        <div className="formfield-container">
          <FormAddCard onSubmit={addCard} formName={"add-place"} />
        </div>
      </div>
    </>
  );
}