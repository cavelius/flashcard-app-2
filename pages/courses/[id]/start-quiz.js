import { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router.js";
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

  if (!course || !course.cards) return null;

  const toggle = () => {
    setIsToggled((prevState) => !prevState);
  };

  const handleNextCardRightAnswer = () => {
    if (currentCardIndex < course?.cards.length - 1) {
      const currentCard = course.cards[currentCardIndex];
      setRightAnswers((prevRightAnswers) => [...prevRightAnswers, currentCard]);
      setCurrentCardIndex((prevIndex) => prevIndex + 1);
      setIsToggled(false);
    } else {
      const currentCard = course.cards[currentCardIndex];
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
    if (currentCardIndex < course.cards.length - 1) {
      const currentCard = course.cards[currentCardIndex];
      setWrongAnswers((prevWrongAnswers) => [...prevWrongAnswers, currentCard]);
      setCurrentCardIndex((prevIndex) => prevIndex + 1);
      setIsToggled(false);
    } else {
      const currentCard = course.cards[currentCardIndex];
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

  const currentCard = course.cards[currentCardIndex];
  const { question, answer } = currentCard;
  return (
    <>
      <Logo />
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
            <p>Question</p>
            <h1>{question}</h1>
          </>
        ) : (
          <>
            <p>Answer</p>
            <div className="quiz-answer-and-btn">
              <h1>{answer}</h1>
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
    </>
  );
}
