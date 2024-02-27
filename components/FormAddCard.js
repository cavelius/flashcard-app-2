import Link from "next/link";
import { useState } from "react";

export default function AddFormAddCourse({ onSubmit, cancel }) {
  // speichert die eingabe in onSubmit
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    onSubmit(data);
    console.log("FormAddCArd sagt:data von Formfield", data);
  }
  return (
    <>
      <div className="formfield-container">
        <form className="field-form" onSubmit={handleSubmit}>
          <h1 className="form-description"> Create a new Card</h1>

          <label htmlFor="question">your question:</label>
          <textarea
            className="input-create-card"
            name="question"
            rows="10"
            cols="10"
          />

          <label htmlFor="answer">your answer:</label>
          <textarea
            className="input-create-card"
            name="answer"
            rows="10"
            cols="10"
          />
          <button className="navigation-form-space" type="submit">
            <p className="navigation-text">create</p>
          </button>
          <button className="navigation-form-space">
            <Link className="link" href={cancel}>
              <p className="navigation-text">cancel</p>
            </Link>
          </button>
        </form>
      </div>
    </>
  );
}
