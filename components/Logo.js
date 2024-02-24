import Link from "next/link";

export default function Logo() {
  return (
    <>
      <Link href={`/`} passHref legacyBehavior>
        <div className="logobox">
          <h1 className="logoschrift">flashcards</h1>
        </div>
      </Link>
    </>
  );
}
