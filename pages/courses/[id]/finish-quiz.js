import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function FinishQuizPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data: course, isLoading, error } = useSWR(`/api/courses/${id}`);

  const { rightAnswers, wrongAnswers } = router.query;
  const [parsedRightAnswers, setParsedRightAnswers] = useState([]);
  const [parsedWrongAnswers, setParsedWrongAnswers] = useState([]);

  useEffect(() => {
    if (rightAnswers) {
      setParsedRightAnswers(JSON.parse(rightAnswers));
    }
    if (wrongAnswers) {
      setParsedWrongAnswers(JSON.parse(wrongAnswers));
    }
  }, [rightAnswers, wrongAnswers]);

  console.log("right Answers:", rightAnswers);
  console.log("wrong Answers:", wrongAnswers);
  console.log("Course", course);
  return (
    <div>
      <h1>Finish Quiz Page</h1>
      <h2>Right Answers:</h2>
      <ul>
        {parsedRightAnswers.map((answerObj, index) => (
          <li key={index}>{answerObj.question}</li>
        ))}
      </ul>
      <h2>Wrong Answers:</h2>
      <ul>
        {parsedWrongAnswers.map((answerObj, index) => (
          <li key={index}>{answerObj.answer}</li>
        ))}
      </ul>
      {wrongAnswers}
    </div>
  );
}
