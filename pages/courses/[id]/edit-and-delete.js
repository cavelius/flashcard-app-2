import { useRouter } from "next/router";
import FormEditAndDelete from "@/components/Form-add";

export default function EditAndDeleteCourse() {
  const router = useRouter();
  console.log("router:", router);

  // erstellt einen neuen Course
  async function addCourse(course) {
    const response = await fetch(`/api/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(course),
    });

    if (response.ok) {
      await response.json();
      router.push("/");
    } else {
      console.error(`Error: ${response.status}`);
    }
  }
  return (
    <>
      <div id="add-place" className="create-course">
        <FormEditAndDelete onSubmit={addCourse} formName={"add-place"} />
      </div>
    </>
  );
}
