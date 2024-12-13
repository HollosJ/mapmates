type Props = {
  className?: string;
};

export default function LoadingSpinner({ className }: Props) {
  return (
    <div
      className={`border-2 border-white rounded-full border-r-black size-4 animate-spin ${
        className || ''
      }`}
    ></div>
  );
}
