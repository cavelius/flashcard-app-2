import { useRouter } from "next/router.js";
import useSWR from "swr";
import Cards from "../../../components/Cards";
import Link from "next/link";
import Logo from "@/components/Logo";
import Image from "next/image";

// 1 Unterseite YOUR CARDS

export default function CourseOverviev() {
  const router = useRouter();
  const { isReady } = router;
  // id verlinkt auf die [id] im ordnerverzeichnis
  const { id } = router.query;
  const { data: course, isLoading, error } = useSWR(`/api/courses/${id}`);

  // der aktuelle course wird angezeigt
  console.log("course:", course);

  if (!isReady || isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Error! 🔥</h2>;

  return (
    <>
      <Logo />
      <div>
        <div>
          <p className="page-description">
            {course.cards.length === 0
              ? "Add your Cards"
              : course.cards.length === 1
              ? `your 1 Card from ${course.name}`
              : `your ${course.cards.length} Cards from ${course.name}`}
          </p>
        </div>
        <Cards />
      </div>
      <Link href={`/courses/${id}/create-card`} passHref legacyBehavior>
        <div className="navigation">
          <p className="navigation-text">create card</p>
          <Image
            className="navigation-plus"
            src="/assets/plus.svg"
            alt="edit-and-delete-options"
            width={25}
            height={25}
          />
        </div>
      </Link>
      <div className="navigation-start-quiz">
        <Link href={`/courses/${id}/start-quiz`} passHref legacyBehavior>
          <p className="navigation-text">start quiz</p>
        </Link>
      </div>
    </>
  );
}
