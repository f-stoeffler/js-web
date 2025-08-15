"use client";
import { useRef, useEffect, useState } from "react";

export default function useDragScroll() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const animationRef = useRef<number>(null);

  // Auto-scroll logic
  useEffect(() => {
    if (!scrollRef.current || isDragging) return;

    const scrollContainer = scrollRef.current;
    const scrollWidth = scrollContainer.scrollWidth;
    const clientWidth = scrollContainer.clientWidth;
    let scrollPosition = scrollContainer.scrollLeft;
    let direction = 1; // 1 for right, -1 for left

    const autoScroll = () => {
      if (!scrollRef.current) return;

      scrollPosition += 0.5 * direction; // Adjust speed here
      scrollContainer.scrollLeft = scrollPosition;

      // Check if reached end
      if (scrollPosition >= scrollWidth - clientWidth) {
        direction = -1; // Reverse direction
      } else if (scrollPosition <= 0) {
        direction = 1; // Reverse direction
      }

      animationRef.current = requestAnimationFrame(autoScroll);
    };

    animationRef.current = requestAnimationFrame(autoScroll);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDragging]);

  const onMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);

    const startX = e.pageX - scrollRef.current.offsetLeft;
    const scrollLeft = scrollRef.current.scrollLeft;

    const onMouseMove = (e: MouseEvent) => {
      if (!scrollRef.current) return;
      const x = e.pageX - scrollRef.current.offsetLeft;
      const walk = x - startX;
      scrollRef.current.scrollLeft = scrollLeft - walk;
    };

    const onMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return { scrollRef, onMouseDown };
}