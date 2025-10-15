import React from "react";

interface CourseNavLinkProps {
  href?: string;
  Icon: any;
  onClick?: () => void;
  title: string,
}

export default function CourseNavLink({ title, href, Icon, onClick }: CourseNavLinkProps) {
  if (onClick) {
    return (
      <button
        title={title}
        onClick={onClick}
        className="block border cursor-pointer rounded-full border-[#E5E5E5] p-2 duration-300 hover:bg-[var(--main-color)] hover:border-[var(--main-color)] group"
      >
        <Icon className="text-[#818180] duration-300 group-hover:text-white" size={20} />
      </button>
    );
  }

  return (
    <a
      title={title}
      href={href}
      className="block border cursor-pointer rounded-full border-[#E5E5E5] p-2 duration-300 hover:bg-[var(--main-color)] hover:border-[var(--main-color)] group"
    >
      <Icon className="text-[#818180] duration-300 group-hover:text-white" size={20} />
    </a>
  );
}