import { useEffect, useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import Logo from "@/components/Logo";
import { useRouter } from "next/router";

function Counter({ targetCount, className }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (count < targetCount) {
      const interval = setInterval(() => {
        setCount((prevCount) => prevCount + 1);
      }, 200); // Intervall in Millisekunden (200ms = 0,2 Sekunden)

      return () => clearInterval(interval);
    }
  }, [count, targetCount]);

  return <div className={className}>{count}</div>;
}

export default function FinishQuizPage() {
  const { id } = useRouter().query;
  const { data: course, isLoading, error } = useSWR(`/api/courses/${id}`);
  const { rightAnswers, wrongAnswers } = useRouter().query;
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

  const wrong = JSON.parse(wrongAnswers);
  const right = JSON.parse(rightAnswers);

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
          <Counter
            className="finish-number"
            targetCount={parsedRightAnswers.length}
          />
          <h2 className="finish-subhead">Wrong Answers:</h2>
          <Counter
            className="finish-number"
            targetCount={parsedWrongAnswers.length}
          />
        </div>
        {parsedWrongAnswers.length > 0 && (
          <button className="navigation-start-quiz" onClick={redoQuiz}>
            <p className="navigation-text">redo wrong answers</p>
          </button>
        )}

        <div className="navigation">
          <Link href={`/`} passHref legacyBehavior>
            <p className="navigation-text">finish quiz</p>
          </Link>
        </div>
      </div>
    </>
  );
}
