"use client";
import { Review } from "@prisma/client";
import { useState } from "react";
import "swiper/css";
import "swiper/css/scrollbar";
import { createReview, deleteReview, getReviews, updateReview } from "@/lib/reviews";

export default function EditReviews({
  data,
  className,
}: Readonly<{
  data: Review[] | undefined;
  className: string;
}>) {
  const [reviews, setReviews] = useState<Review[] | undefined>(data);

  const handleUpdateReview = async (e: FormData, id: number) => {
    try {
      const title = e.get(`author-${id}`) as string;
      const desc = e.get(`review-${id}`) as string;
      await updateReview(id, { title: title, desc: desc });
      const newReviews = await getReviews();
      setReviews(newReviews?.reviews);
    } catch (error) {
      console.error("Fehler beim ändern des Projektes:", error);
    }
  };

  const handleAddReview = async () => {
    try {
      await createReview({ title: "Neue Review", desc: "Beschreibung" });
      const newReviews = await getReviews();
      setReviews(newReviews?.reviews);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteReview = async (id: number) => {
    try {
      await deleteReview(id);
      const newReviews = await getReviews();
      setReviews(newReviews?.reviews);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className={`px-6 pb-6 pt-4 striped-background border-4 border-bg2 rounded-lg ${className}`}
    >
      <h2 className="text-xl mb-4 font-bold">
        Reviews aktualisieren ({reviews?.length})
      </h2>
      <div className="flex gap-4 flex-nowrap overflow-x-auto pb-3">
        {reviews?.map((item) => (
          <form
            key={item.id}
            action={(e) => handleUpdateReview(e, item.id)}
            className="bg-bg2 px-3 py-2 rounded-lg border-4 border-bg"
          >
            <div className="grid min-w-xs">
              <label htmlFor={`author-${item.id}`}>Name</label>
              <input
                required
                type="text"
                name={`author-${item.id}`}
                id={`author-${item.id}`}
                className="bg-bg rounded border-2 border-bg2 mt-1 mb-4 px-1.5 py-0.5"
                defaultValue={item.title}
              />
            </div>
            <div className="w-full grid">
              <label htmlFor={`review-${item.id}`}>Review</label>
              <textarea
                required
                name={`review-${item.id}`}
                id={`review-${item.id}`}
                className="bg-bg rounded border-2 border-bg2 mt-1 mb-4 px-1.5 py-0.5  min-h-30"
                defaultValue={item.desc}
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="submit"
                  value={"Speichern"}
                  className="bg-prim px-4 py-3 rounded hover:bg-primd cursor-pointer"
                />
                <button
                  type="button"
                  className="bg-red-500/80 px-4 py-3 rounded hover:bg-red-700 cursor-pointer"
                  onClick={() => handleDeleteReview(item.id)}
                >
                  Review löschen
                </button>
              </div>
            </div>
          </form>
        ))}
        <div className="grow flex items-center">
          <button
            className="bg-prim rounded px-2 py-1.5 cursor-pointer hover:bg-primd transition-all disabled:bg-prim/20 disabled:text-fg/20 disabled:cursor-default"
            onClick={handleAddReview}
          >
            Review hinzufügen
          </button>
        </div>
      </div>
      <div className="flex flex-col grow justify-end"></div>
    </div>
  );
}
