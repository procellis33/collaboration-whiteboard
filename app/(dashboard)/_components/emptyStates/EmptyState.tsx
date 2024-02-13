import Image from "next/image";
import React from "react";

interface IEmptyStateProps {
  header: string;
  subheader: string;
  imageSrc: string;
  alt?: string;
  height?: number;
  width?: number;
  children?: React.ReactNode;
}

export const EmptyState: React.FC<IEmptyStateProps> = ({
  header,
  subheader,
  imageSrc,
  alt,
  height,
  width,
  children,
}) => {
  return (
    <div className={"h-full flex flex-col items-center justify-center"}>
      <Image
        src={imageSrc}
        alt={alt || "Empty"}
        height={height || 200}
        width={width || 200}
      />
      <h2 className={"text-2xl font-semibold mt-6"}>{header}</h2>
      <p className={"text-muted-foreground text-sm mt-2"}>{subheader}</p>
      {children}
    </div>
  );
};
