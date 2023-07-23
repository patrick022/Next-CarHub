"use client";

import { CustomLinkProps } from "@/types";
import Image from "next/image";

const CustomLink = ({
  title,
  containerStyles,
  textStyles,
  rightIcon,
}: CustomLinkProps) => {
  return (
    <button>
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://github.com/patrick022/JobForte-MERN-production"
        className={`custom-btn ${containerStyles}`}
      >
        <span className={`flex-1 ${textStyles}`}>{title}</span>
        {rightIcon && (
          <div className="relative w-7 h-7">
            <Image
              src={rightIcon}
              alt="right icon"
              width={500}
              height={500}
              className="object-contain"
            />
          </div>
        )}
      </a>
    </button>
  );
};
export default CustomLink;
