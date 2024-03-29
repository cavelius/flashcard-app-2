import { useRouter } from "next/router";
import FormAdd from "@/components/FormAdd";

export default function CreateCourse() {
  const router = useRouter();
  console.log("router:", router);

  // erstellt einen neuen Course
  async function addCourse(courseData) {
    const response = await fetch(`/api/courses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(courseData),
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
      <div className="create-course">
        <FormAdd onSubmit={addCourse} formName={"add-place"} />
      </div>
    </>
  );
}
