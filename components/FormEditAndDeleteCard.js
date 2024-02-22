import Link from "next/link";

export default function FormEditAndDeleteCard({
  onClick,
  onSubmit,
  formName,
  defaultData,
  courseId,
}) {
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onSubmit(data);
    console.log("data von Formfield FromEditAndDeleteCard", data);
    console.log("question", question);
  }
  return (
    <>
      <div className="formfield-container">
        <form
          className="field"
          aria-labelledby={formName}
          onSubmit={handleSubmit}
        >
          <h1 className="page-description">Edit Card</h1>
          <label htmlFor="question">Question</label>
          <br></br>
          <input
            id="question"
            name="question"
            type="text"
            defaultValue={defaultData?.question}
          />
          <br></br>
          <label htmlFor="answer">Answer</label>
          <br></br>
          <input
            name="answer"
            id="answer"
            type="text"
            defaultValue={defaultData?.answer}
          />
          <br></br>
          <button type="submit">Update</button>
          <br></br>
          <button>
            <Link href={`/courses/${courseId}`}>Cancel</Link>
          </button>
          <button onClick={onClick}>Delete</button>
        </form>
      </div>
    </>
  );
}
