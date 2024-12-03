type Props = {
  className?: string;
};

export default function LoadingSpinner({ className }: Props) {
  return (
    <div
      className={`border-2 border-indigo-800 rounded-full border-r-indigo-300 size-16 animate-spin ${
        className || ''
      }`}
    ></div>
  );
}
