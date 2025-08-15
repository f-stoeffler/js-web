"use client";
import useDragScroll from "./useDragScroll";
import WorkItem from "./WorkItem";
import { useEffect, useRef } from "react";

export default function Works() {
  const { scrollRef, onMouseDown } = useDragScroll();
  const items = ["test1", "test2", "test3", "test4", "test5", "test6", "test7"];
  const containerRef = useRef<HTMLDivElement>(null);

  // Clone items for infinite loop effect
  const duplicatedItems = [...items, ...items];

  // Reset scroll position when near the end for seamless looping
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (container.scrollWidth - container.scrollLeft <= container.clientWidth * 1.5) {
        container.scrollLeft = container.scrollWidth / 2 - container.clientWidth;
      } else if (container.scrollLeft <= 0) {
        container.scrollLeft = container.scrollWidth / 2;
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={scrollRef}
      onMouseDown={onMouseDown}
      className="flex flex-nowrap gap-8 pb-6 overflow-x-auto cursor-grab active:cursor-grabbing select-none"
      style={{
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {duplicatedItems.map((item, index) => (
        <WorkItem key={index}>{item}</WorkItem>
      ))}
    </div>
  );
}