type Props = {
  children?: React.ReactNode;
};

export default function FormError({ children }: Props) {
  if (!children) return <></>;

  return <div className="text-red-500 text-sm">{children}</div>;
}
