import { useRouter } from "next/router";
import FormEditAndDeleteCard from "@/components/FormEditAndDeleteCard";
import useSWR from "swr";

export default function EditAndDeleteCard() {
  const router = useRouter();
  const { isReady } = router;
  const { id, card_id } = router.query;
  console.log(router.query);
  const {
    data: card,
    isLoading,
    error,
    mutate,
  } = useSWR(`/api/courses/${id}/cards/${card_id}`);

  console.log("card auf der edit and delete seite:", card);

  // unpdate Entry
  async function editCard(cardData) {
    const response = await fetch(`/api/courses/${id}/cards/${card_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cardData),
    });

    if (response.ok) {
      mutate();
      router.back();
    } else {
      alert("There was a Error");
    }
  }

  if (!isReady || isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Error! 🔥</h2>;

  async function deleteCard() {
    if (confirm(`Are you sure that you want to delete this course?`) == true) {
      const response = await fetch(`/api/courses/${id}/cards/${card_id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.back;
      } else {
        alert(`There was a Error ${response.status}`);
      }
    }
  }

  return (
    <>
      <div id="add-place" className="create-course">
        <FormEditAndDeleteCard
          onSubmit={editCard}
          formName={"add-place"}
          defaultData={card}
          onClick={deleteCard}
          courseId={id}
        />
      </div>
    </>
  );
}
