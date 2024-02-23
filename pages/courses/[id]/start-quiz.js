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
      setCurrentCardIndex(currentCardIndex + 1);
      setIsToggled(true);
      setRightAnswers([...rightAnswers, currentCard]);
    } else {
      const currentCard = course.cards[currentCardIndex];
      setRightAnswers([...rightAnswers, currentCard]);
      router.push({
        pathname: `/courses/${id}/finish-quiz`,
        query: {
          rightAnswers: JSON.stringify(rightAnswers),
          wrongAnswers: JSON.stringify(wrongAnswers),
        },
      });
    }
  };

  const handleNextCardWrongAnswer = () => {
    if (currentCardIndex < course.cards.length - 1) {
      const currentCard = course.cards[currentCardIndex];
      setCurrentCardIndex(currentCardIndex + 1);
      setIsToggled(true);
      setWrongAnswers([...wrongAnswers, currentCard]);
      console.log("current wrong Card to push ------------------", currentCard);
    } else {
      const currentCard = course.cards[currentCardIndex];
      setWrongAnswers([...wrongAnswers, currentCard]);
      router.push({
        pathname: `/courses/${id}/finish-quiz`,
        query: {
          rightAnswers: JSON.stringify(rightAnswers),
          wrongAnswers: JSON.stringify(wrongAnswers),
        },
      });
    }
  };

  const currentCard = course.cards[currentCardIndex];
  const { question, answer } = currentCard;

  return (
    <div>
      <p>{isToggled ? question : answer}</p>
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
