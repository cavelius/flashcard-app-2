import { useState } from "react";
import Link from "next/link";

export default function AddForm({ onSubmit, formName, defaultData }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleNameChange(event) {
    const value = event.target.value;
    setName(value);
  }

  function handleDescriptionChange(event) {
    const value = event.target.value;
    setDescription(value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const data = { name, description };
    onSubmit(data);
    console.log("data von Formfield", data);
  }

  return (
    <>
      <div className="formfield-container">
        <form
          className="field-form"
          aria-labelledby={formName}
          onSubmit={handleSubmit}
        >
          <h1 className="form-description"> Create a new Course</h1>
          <label htmlFor="name">course name:</label>
          <input
            name="name"
            id="name"
            type="text"
            maxLength={15}
            value={name}
            onChange={handleNameChange}
          />
          <p className="form-characters_left">
            {15 - name.length} characters left
          </p>
          <label htmlFor="description">course description:</label>
          <input
            className="second-input"
            name="description"
            id="description"
            type="text"
            maxLength={35}
            value={description}
            onChange={handleDescriptionChange}
          />
          <p className="form-characters_left">
            {35 - description.length} characters left
          </p>
          <br />
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
