import { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router.js";

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
      setIsToggled(true);
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
      setIsToggled(true);
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
    <div>
      <p> Course: {course.name}</p>
      {currentCardIndex + 1} Card from {course.cards.length}
      <p>{isToggled ? `question: ${question}` : `answer: ${answer}`}</p>
      <button onClick={toggle}>
        {isToggled ? "show answer" : "show question"}
      </button>
      {!isToggled && (
        <div>
          <button onClick={handleNextCardRightAnswer}>I knew the answer</button>
          <button onClick={handleNextCardWrongAnswer}>
            I dont know the answer
          </button>
        </div>
      )}
    </div>
  );
}
