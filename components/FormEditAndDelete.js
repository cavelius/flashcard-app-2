import Link from "next/link";
import { useState } from "react";

export default function FormEditAndDelete({
  onClick,
  onSubmit,
  formName,
  defaultData,
}) {
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
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
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
          <h1 className="form-description"> Edit Course</h1>
          <label htmlFor="name">course name:</label>
          <input
            id="name"
            name="name"
            type="text"
            maxLength={15}
            // value={name}
            // onChange={handleNameChange}
            defaultValue={defaultData?.name}
          />
          {/* <p className="form-characters_left">
            {15 - name.length} characters left
          </p> */}
          <label htmlFor="description">course description:</label>
          <input
            className="second-input"
            name="description"
            id="description"
            maxLength={35}
            defaultValue={defaultData?.description}
            // value={description}
            // onChange={handleDescriptionChange}
          />
          {/* <p className="form-characters_left">
            {35 - description.length} characters left
          </p> */}
          <br />
          <button className="navigation-form-space" type="submit">
            <p className="navigation-text">update</p>
          </button>
          <button className="navigation-form-space" onClick={onClick}>
            <p className="navigation-text">delete</p>
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
