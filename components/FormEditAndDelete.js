import Link from "next/link";

export default function FormEditAndDelete({
  onClick,
  onSubmit,
  formName,
  defaultData,
}) {
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
          className="field"
          aria-labelledby={formName}
          onSubmit={handleSubmit}
        >
          <h1 className="page-description"> Edit Course</h1>
          <label htmlFor="name">Name</label>
          <br></br>
          <input
            id="name"
            name="name"
            type="text"
            defaultValue={defaultData?.name}
          />
          <br></br>
          <label htmlFor="description">Description</label>
          <br></br>
          <input
            name="description"
            id="description"
            cols="30"
            rows="10"
            defaultValue={defaultData?.description}
          />
          <br></br>
          <button type="submit">create</button>
          <br></br>
          <button>
            <Link href="/">cancel</Link>
          </button>
          <button onClick={onClick}>delete</button>
        </form>
      </div>
    </>
  );
}
