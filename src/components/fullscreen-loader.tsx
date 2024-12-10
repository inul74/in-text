interface FullscreenLoaderProps {
  label?: string;
}

export const FullscreenLoader = ({ label }: FullscreenLoaderProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <div className="relative">
        {/* Outer ring */}
        <div className="absolute inset-0 border-4 border-primary/30 rounded-full animate-[ping_1.5s_infinite]" />
        {/* Inner spinning circle */}
        <div className="w-12 h-12 border-4 border-[#FF3D00] rounded-full border-t-transparent animate-spin" />
      </div>
      {label && <p className="text-sm text-muted-foreground">{label}</p>}
    </div>
  );
};
