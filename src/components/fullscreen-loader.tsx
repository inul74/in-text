import Image from "next/image";

interface FullscreenLoaderProps {
  label?: string;
}

export const FullscreenLoader = ({ label }: FullscreenLoaderProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-2">
      <Image
        src="/spinner.gif"
        alt="Loading..."
        width={100}
        height={100}
        style={{ width: 100, height: 100 }}
        unoptimized
        priority
      />
      {label && <p className="text-sm text-muted-foreground">{label}</p>}
    </div>
  );
};
