import { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router.js";
import Link from "next/link";

export default function StartQuiz() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data: course, isLoading, error } = useSWR(`/api/courses/${id}`);

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const currentCard = course.cards[currentCardIndex];

  const [isToggled, setIsToggled] = useState(true);
  const [rightAnswers, setRightAnswers] = useState([]); // State für die richtigen Antworten
  const [wrongAnswers, setWrongAnswers] = useState([]); // State für die richtigen Antworten

  const question = currentCard.question;
  const answer = currentCard.answer;

  // Funktion zum Umschalten des Toggles
  const toggle = () => {
    setIsToggled((prevState) => !prevState); // Umschalten des Zustands zwischen Frage und Antwort
  };

  const handleNextCardRightAnswer = () => {
    if (currentCardIndex < course.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsToggled(true); // setzt den Toggle wieder auf die Frage
      setRightAnswers([...rightAnswers, currentCard]); // Fügt die aktuelle Karte den richtigen Antworten hinzu
      console.log(
        "current Card to push ############################",
        currentCard
      );
    } else {
      setRightAnswers([...rightAnswers, currentCard]); // Fügt die aktuelle Karte den richtigen Antworten hinzu
      router.push({
        pathname: `/courses/${id}/finish-quiz`,
        //nimt die infos mit zur nächsten Seite:
        query: {
          rightAnswers: JSON.stringify(rightAnswers),
          wrongAnswers: JSON.stringify(wrongAnswers),
        },
      });
    }
  };
  const handleNextCardWrongAnswer = () => {
    if (currentCardIndex < course.cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsToggled(true); // setzt den Toggle wieder auf die Frage
      setWrongAnswers([...wrongAnswers, currentCard]); // Fügt die aktuelle Karte den richtigen Antworten hinzu
      console.log("current wrong Card to push ------------------", currentCard);
    } else {
      setWrongAnswers([...wrongAnswers, currentCard]); // Fügt die aktuelle Karte den richtigen Antworten hinzu
      router.push({
        pathname: `/courses/${id}/finish-quiz`,
        query: {
          rightAnswers: JSON.stringify(rightAnswers),
          wrongAnswers: JSON.stringify(wrongAnswers),
        },
      });
    }
  };

  console.log("course data:", course);
  console.log("current Card:", currentCard);

  console.log("Question:", question);
  console.log("Answer:", answer);

  console.log("right Answer:", rightAnswers);
  console.log("wrong Answer:", wrongAnswers);

  return (
    <div>
      {/* Zeigt den aktuellen Zustand des Toggles an */}
      <p> {isToggled ? question : answer}</p>

      {/* Button zum Umschalten des Toggles */}
      <button onClick={toggle}>
        {isToggled ? "show answer" : "show question"}
      </button>

      {/* Button, der nur angezeigt wird, wenn isToggled false ist */}
      {!isToggled && (
        <div>
          <button onClick={handleNextCardRightAnswer}>I knew the answer</button>
          <button onClick={handleNextCardWrongAnswer}>
            I dont knew the answer
          </button>
        </div>
      )}
    </div>
  );
}
