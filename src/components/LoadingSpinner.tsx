type Props = {
  className?: string;
};

export default function LoadingSpinner({ className }: Props) {
  return (
    <div
      className={`size-4 animate-spin rounded-full border-2 border-white border-r-black ${
        className || ""
      }`}
    ></div>
  );
}
