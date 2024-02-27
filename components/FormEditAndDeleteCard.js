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
    // console.log("question", question);
  }
  return (
    <>
      <div className="formfield-container">
        <form
          className="field-form"
          aria-labelledby={formName}
          onSubmit={handleSubmit}
        >
          <h1 className="form-description-space">Edit Card</h1>
          <label htmlFor="question">your question:</label>
          <textarea
            className="input-create-card"
            name="question"
            rows="10"
            cols="10"
            defaultValue={defaultData?.question}
          />
          <label htmlFor="answer">your answer:</label>
          <textarea
            className="input-create-card"
            name="answer"
            rows="10"
            cols="10"
            defaultValue={defaultData?.answer}
          />
          <button className="navigation-form-space" type="submit">
            <p className="navigation-text">update</p>
          </button>
          <button className="navigation-form-space" onClick={onClick}>
            <p className="navigation-text">delete</p>
          </button>
          <button className="navigation-form-space">
            <Link className="link" href={`/courses/${courseId}`}>
              <p className="navigation-text">cancel</p>
            </Link>
          </button>
        </form>
      </div>
    </>
  );
}
