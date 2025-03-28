type Props = {
  className?: string;
};

const UserControl = (props: Props) => {
  return (
    <button
      className={`size-12 rounded-full bg-gradient-to-tr from-purple-400 to-pink-600 transition-transform hover:scale-105 ${
        props.className || ""
      }`}
    ></button>
  );
};

export default UserControl;
