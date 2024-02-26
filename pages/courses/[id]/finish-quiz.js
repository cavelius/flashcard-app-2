import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import Logo from "@/components/Logo";

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
  const redoQuiz = () => {
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
      <Logo />
      <div className="quiz-container">
        <div>
          <h1 className="finish-page-description">
            Your finished the <br></br>
            {course.name} Course
          </h1>
          <h2 className="finish-subhead">Right Answers:</h2>
          <p className="finish-number">{parsedRightAnswers.length}</p>
          <h2 className="finish-subhead">Wrong Answers:</h2>
          <p className="finish-number">{parsedWrongAnswers.length}</p>
        </div>
        <button className="navigation-start-quiz" onClick={redoQuiz}>
          <p className="navigation-text">redo wrong answers</p>
        </button>

        <div className="navigation">
          <Link href={`/`} passHref legacyBehavior>
            <p className="navigation-text">finish quiz</p>
          </Link>
        </div>
      </div>
    </>
  );
}
