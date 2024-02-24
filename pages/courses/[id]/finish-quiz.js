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

  console.log("right Answers:", JSON.parse(rightAnswers));
  console.log("wrong Answers:", JSON.parse(wrongAnswers));
  console.log("Course", course);

  const wrong = JSON.parse(wrongAnswers);
  console.log("worooooong:", wrong);

  return (
    <>
      <div>
        <h1>Finish Quiz Page</h1>
        <h2>Right Answers:</h2>
        {parsedRightAnswers.length}
        <h2>Wrong Answers:</h2>
        {parsedWrongAnswers.length}
      </div>
      <button>redo wrong answers</button>
      <Link href={`/`} passHref legacyBehavior>
        finish quiz
      </Link>
    </>
  );
}
