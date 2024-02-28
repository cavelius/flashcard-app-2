import { useRouter } from "next/router.js";
import useSWR from "swr";
import Link from "next/link";
import Image from "next/image";

export default function Cards() {
  const router = useRouter();
  console.log(" test", router.query);
  const { id } = router.query;
  const { data, mutate } = useSWR(`/api/courses/${id}`);

  console.log("data:", data);

  const cards = data?.cards;

  return (
    <div className="course-container">
      {cards && (
        <>
          {cards?.toReversed().map(({ question, answer, _id }) => {
            return (
              <div className="field-card" key={_id}>
                <div className="card-options">
                  <h1 className="card-options-card">card</h1>
                  <button className="btn-edit-and-delete-options">
                    <Link
                      href={`/courses/${id}/cards/${_id}/card-edit-and-delete`}
                    >
                      <Image
                        src="/assets/edit-and-delete.svg"
                        alt="edit-and-delete-options"
                        width={20}
                        height={20}
                      />
                    </Link>
                  </button>
                </div>
                <p className="card-options-card">question:</p>
                <p className="question-answer-card"> {question}</p>
                <p className="card-options-card">answer:</p>
                <p className="question-answer-card">{answer}</p>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
