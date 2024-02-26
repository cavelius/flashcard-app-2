import useSWR from "swr";
import { useRouter } from "next/router.js";
import { useEffect } from "react";
import { useState } from "react";
import Logo from "@/components/Logo";
import Image from "next/image";

export default function StartQuiz() {
  const router = useRouter();
  const { id } = router.query;
  const { data: course } = useSWR(`/api/courses/${id}`);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isToggled, setIsToggled] = useState(true);
  const [rightAnswers, setRightAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const { right, wrong } = router.query;

  console.log("wron from redo", wrong);

  const [parsedRightAnswers, setParsedRightAnswers] = useState([]);
  const [parsedWrongAnswers, setParsedWrongAnswers] = useState([]);

  useEffect(() => {
    if (right) {
      setParsedRightAnswers(JSON.parse(right));
    }
    if (wrong) {
      setParsedWrongAnswers(JSON.parse(wrong));
    }
  }, [right, wrong]);

  if (!course || !course.cards) return null;

  const toggle = () => {
    setIsToggled((prevState) => !prevState);
  };

  const handleNextCardRightAnswer = () => {
    if (currentCardIndex < parsedWrongAnswers?.length - 1) {
      const currentCard = parsedWrongAnswers[currentCardIndex];
      setRightAnswers((prevRightAnswers) => [...prevRightAnswers, currentCard]);
      setCurrentCardIndex((prevIndex) => prevIndex + 1);
      setIsToggled(false);
    } else {
      const currentCard = parsedWrongAnswers[currentCardIndex];
      const updatedRightAnswers = [...rightAnswers, currentCard];
      setRightAnswers(updatedRightAnswers);
      router.push({
        pathname: `/courses/${id}/finish-quiz`,
        query: {
          rightAnswers: JSON.stringify(updatedRightAnswers),
          wrongAnswers: JSON.stringify(wrongAnswers),
        },
      });
    }
  };

  const handleNextCardWrongAnswer = () => {
    if (currentCardIndex < parsedWrongAnswers.length - 1) {
      const currentCard = parsedWrongAnswers[currentCardIndex];
      setWrongAnswers((prevWrongAnswers) => [...prevWrongAnswers, currentCard]);
      setCurrentCardIndex((prevIndex) => prevIndex + 1);
      setIsToggled(false);
    } else {
      const currentCard = parsedWrongAnswers[currentCardIndex];
      const updatedWrongAnswers = [...wrongAnswers, currentCard];
      setWrongAnswers(updatedWrongAnswers);
      router.push({
        pathname: `/courses/${id}/finish-quiz`,
        query: {
          rightAnswers: JSON.stringify(rightAnswers),
          wrongAnswers: JSON.stringify(updatedWrongAnswers),
        },
      });
    }
  };

  const currentCard = parsedWrongAnswers[currentCardIndex];
  const question = currentCard?.question;
  const answer = currentCard?.answer;

  console.log("parsedWrongAnswers from redo", parsedWrongAnswers);

  return (
    <>
      <Logo />
      <div className="quiz-container">
        <div className="loading-bar"></div>
        <div onClick={toggle} className="card-question-and-answer">
          <div className="card-question-info">
            <p>{course.name}</p>
            <p>
              {currentCardIndex + 1} / {course.cards.length}
            </p>
          </div>
          {isToggled ? (
            <>
              <p className="quiz-card-options-card">question:</p>
              <h1 className="card-question-quiz">{question}</h1>
            </>
          ) : (
            <>
              <p className="quiz-card-options-card">answer:</p>
              <h1 className="card-question-quiz">{answer}</h1>
              <div className="quiz-answer-and-btn">
                {!isToggled && (
                  <div className="answerButtons">
                    <button onClick={handleNextCardWrongAnswer}>
                      <Image
                        src="/assets/wrong.svg"
                        alt="dont know the answer"
                        width={60}
                        height={60}
                      />
                    </button>
                    <button onClick={handleNextCardRightAnswer}>
                      <Image
                        src="/assets/right.svg"
                        alt="know the answer"
                        width={60}
                        height={60}
                      />
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

{
  /* <Logo />
      <div className="quiz-container">
        <div className="loading-bar"></div>
        <div>
          <p>{course.name}</p>
          {currentCardIndex + 1} Card from {parsedWrongAnswers.length}
          {currentCard && (
            <>
              <p>{isToggled ? `question: ${question}` : `answer: ${answer}`}</p>
              <button onClick={toggle}>
                {isToggled ? "show answer" : "show question"}
              </button>
              {!isToggled && (
                <div>
                  <button onClick={handleNextCardRightAnswer}>
                    I knew the answer
                  </button>
                  <button onClick={handleNextCardWrongAnswer}>
                    I dont know the answer
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
} */
}
