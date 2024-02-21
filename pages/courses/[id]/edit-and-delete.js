import { useRouter } from "next/router";
import FormEditAndDelete from "@/components/FormEditAndDelete";
import useSWR from "swr";

export default function EditAndDeleteCourse() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const {
    data: course,
    isLoading,
    error,
    mutate,
  } = useSWR(`/api/courses/${id}`);

  // unpdate Entry
  async function editCourse(course) {
    const response = await fetch(`/api/courses/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(course),
    });

    if (response.ok) {
      mutate();
      router.back();
    } else {
      alert("There was a Error");
    }
  }

  if (!isReady || isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Error! 🔥</h2>;

  async function deleteCourse() {
    if (confirm(`Are you sure that you want to delete this course?`) == true) {
      const response = await fetch(`/api/courses/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        router.back;
      } else {
        alert(`There was a Error ${response.status}`);
      }
    }
  }

  return (
    <>
      <div id="add-place" className="create-course">
        <FormEditAndDelete
          onSubmit={editCourse}
          formName={"add-place"}
          defaultData={course}
          onClick={deleteCourse}
        />
      </div>
    </>
  );
}
