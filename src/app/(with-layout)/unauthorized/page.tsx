"use client";

export default function Unauthorized() {
  return (
    <div className="">
      <head>
        <meta http-equiv="refresh" content="5; url=/" />
      </head>
      <main className="flex justify-center items-center my-8">
        Dieser Google Account ist nicht als Admin authorisiert. Kehre zur Startseite zurück...
      </main>
    </div>
  );
}