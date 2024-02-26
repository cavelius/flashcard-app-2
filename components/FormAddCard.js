import Link from "next/link";
import { useState } from "react";

export default function AddFormAddCourse({ onSubmit }) {
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
          <label htmlFor="question">Your Question</label>
          <input type="text" name="question" placeholder="question" />
          <label htmlFor="answer">Your Answer</label>
          <input type="text" name="answer" placeholder="answer here..." />
          <button className="navigation-form-space" type="submit">
            <p className="navigation-text">create</p>
          </button>
          <button className="navigation-form-space">
            <Link className="link" href="/">
              <p className="navigation-text">cancel</p>
            </Link>
          </button>
        </form>
      </div>
    </>
  );
}
