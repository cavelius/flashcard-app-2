import { useRouter } from "next/router.js";
import useSWR from "swr";
import Link from "next/link";

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
          {cards.map(({ question, answer, _id }) => {
            return (
              <div className="field" key={_id}>
                <button>
                  <Link
                    href={`/courses/${id}/cards/${_id}/card-edit-and-delete`}
                  >
                    ...
                  </Link>
                </button>
                <p>
                  <small>
                    <strong> Question: {question}</strong>
                  </small>
                </p>
                <span> Answer: {answer}</span>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
