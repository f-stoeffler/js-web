"use server";

export default async function Unauthorized() {
  return (
    <div className="">
      <main className="flex justify-center items-center my-8">
        Dieser Google Account ist nicht als Admin authorisiert. Kehre zur Startseite zurück...
      </main>
    </div>
  );
}
