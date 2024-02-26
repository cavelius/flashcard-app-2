import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Link from "next/link";

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

  if (!course || !course.cards) return null;

  console.log("right Answers:", JSON.parse(rightAnswers));
  console.log("wrong Answers:", JSON.parse(wrongAnswers));
  console.log("Course", course);

  const wrong = JSON.parse(wrongAnswers);
  const right = JSON.parse(rightAnswers);

  console.log("wrong Answers from finish quiz:", wrong);
  console.log("right Answers from finish quiz:", right);

  // Funktion um die falschen Frage noch einmal zu machen
  const redohQuiz = () => {
    router.push({
      pathname: `/courses/${id}/redo-wrong-answers`,
      query: {
        wrong: JSON.stringify(wrong),
        right: JSON.stringify(right),
      },
    });
  };

  return (
    <>
      <div>
        <h1>Finish Quiz Page</h1>
        <h2>Right Answers:</h2>
        {parsedRightAnswers.length}
        <h2>Wrong Answers:</h2>
        {parsedWrongAnswers.length}
      </div>
      <button onClick={redohQuiz}>redo wrong answers</button>
      <Link href={`/`} passHref legacyBehavior>
        finish quiz
      </Link>
    </>
  );
}
