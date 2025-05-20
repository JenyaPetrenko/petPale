"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface ButtonProps {
  children: React.ReactNode; // Вміст кнопки
  className?: string; // Додаткові класи
  href?: string; // Для навігації
  onClick?: () => void; // Для обробки кліка
  variant?: "primary" | "danger" | "secondary";
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  href,

  onClick,
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      router.push(href); // Навігація
    }
    if (onClick) {
      onClick(); // Власна логіка кліка
    }
  };

  return (
    <button
      className={`group relative overflow-hidden py-2 px-4 rounded-full bg-[#426a5a] text-white border-2 border-[#426a5a] hover:border-orange-500 min-w-[80px] m-5 font-semibold transition-all duration-300 ease-in-out cursor-pointer ${className}`}
      onClick={handleClick}
    >
      <span className="relative z-10">{children}</span>

      {/* Анімована заливка поверх */}
      <span
        className="absolute inset-0 w-0 group-hover:w-full h-full bg-[#7d9662] transition-all duration-500 ease-in-out z-0"
        style={{ transitionProperty: "width" }}
      ></span>
    </button>
  );
};

export default Button;
