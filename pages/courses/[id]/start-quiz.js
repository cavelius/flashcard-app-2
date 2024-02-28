import { useState, useEffect } from "react";
import useSWR from "swr";
import { useRouter } from "next/router.js";
import Logo from "@/components/Logo";
import Image from "next/image";

export default function StartQuiz() {
  const router = useRouter();
  const { id } = router.query;
  const { data: course } = useSWR(`/api/courses/${id}`);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [rightAnswers, setRightAnswers] = useState([]);
  const [wrongAnswers, setWrongAnswers] = useState([]);
  const [loadingBarWidth, setLoadingBarWidth] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false); // Zustand für die Flip-Karte
  const [clickedAnswer, setClickedAnswer] = useState(null);

  // loadingbar
  useEffect(() => {
    if (course && course.cards) {
      const progress = ((currentCardIndex + 1) / course.cards.length) * 100;
      setLoadingBarWidth(progress);
    }
  }, [currentCardIndex, course]);

  if (!course || !course.cards) return null;

  const handleNextCardAnswer = (isRight) => {
    setClickedAnswer(isRight);

    setTimeout(() => {
      setClickedAnswer(null);

      const currentCard = course.cards[currentCardIndex];
      if (isRight) {
        setRightAnswers((prevRightAnswers) => [
          ...prevRightAnswers,
          currentCard,
        ]);
      } else {
        setWrongAnswers((prevWrongAnswers) => [
          ...prevWrongAnswers,
          currentCard,
        ]);
      }

      if (currentCardIndex < course.cards.length - 1) {
        setCurrentCardIndex((prevIndex) => prevIndex + 1);
      } else {
        router.push({
          pathname: `/courses/${id}/finish-quiz`,
          query: {
            rightAnswers: JSON.stringify(rightAnswers),
            wrongAnswers: JSON.stringify(wrongAnswers),
          },
        });
      }
    }, 100);
  };

  const currentCard = course.cards[currentCardIndex];
  const { question, answer } = currentCard;

  return (
    <>
      <Logo />
      <div className="quiz-container">
        <div className="loading-bar-border"></div>
        <div
          className={["loading-bar"]}
          style={{ width: `${loadingBarWidth}%` }}
        ></div>
        <div
          className={`flip-card ${isFlipped ? "is-flipped" : ""}`}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <div className="flip-card-inner">
            {/* question */}
            <div className="flip-card-front">
              <div className="card-question-info">
                <p>{course.name}</p>
                <p>
                  {currentCardIndex + 1} / {course.cards.length}
                </p>
              </div>
              <p className="quiz-card-options-card">question:</p>
              <h1 className="card-question-quiz">{question}</h1>
            </div>
            {/* answer */}
            <div className="flip-card-back">
              <div className="card-question-info">
                <p>{course.name}</p>
                <p>
                  {currentCardIndex + 1} / {course.cards.length}
                </p>
              </div>
              <p className="quiz-card-options-card">answer:</p>
              <h1 className="card-question-quiz">{answer}</h1>
              <div className="quiz-answer-and-btn">
                <div className="answerButtons">
                  <button onClick={() => handleNextCardAnswer(false)}>
                    <Image
                      src={
                        clickedAnswer === false
                          ? "/assets/clicked-wrong.svg"
                          : "/assets/wrong.svg"
                      }
                      alt="dont know the answer"
                      width={60}
                      height={60}
                    />
                  </button>
                  <button onClick={() => handleNextCardAnswer(true)}>
                    <Image
                      src={
                        clickedAnswer === true
                          ? "/assets/clicked-right.svg"
                          : "/assets/right.svg"
                      }
                      alt="know the answer"
                      width={60}
                      height={60}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
