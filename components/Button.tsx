"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface ButtonProps {
  children: React.ReactNode; // Вміст кнопки
  className?: string; // Додаткові класи
  href?: string; // Для навігації
  onClick?: () => void; // Для обробки кліка
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
      className={`py-2 px-4 rounded-full bg-[#426a5a] text-white border-2 border-transparent min-w-[80px] m-5 ${className}`}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
