import { useRouter } from "next/router.js";
import useSWR from "swr";

export default function Cards() {
  const router = useRouter();
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
