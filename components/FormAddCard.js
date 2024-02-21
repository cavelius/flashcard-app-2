import Link from "next/link";

export default function AddFormAddCourse({ onSubmit }) {
  // speichert die eingabe in onSubmit
  function handleSubmit(event) {
    event.preventDefault();
    console.log(event);
    console.log(event.target);
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onSubmit(data);
    console.log("FormAddCArd sagt:data von Formfield", data);
  }
  return (
    <>
      <div className="field">
        <form onSubmit={handleSubmit}>
          <label htmlFor="question">Your Question</label>
          <input type="text" name="question" placeholder="question" />
          <label htmlFor="answer">Your Answer</label>
          <input type="text" name="answer" placeholder="answer here..." />
          <button type="submit">Send</button>
        </form>
      </div>
    </>
  );
}
