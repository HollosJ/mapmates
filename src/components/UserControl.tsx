import React from 'react';

type Props = {
  className?: string;
};

const UserControl = (props: Props) => {
  return (
    <button
      className={`size-12 rounded-full bg-gradient-to-tr from-purple-400 to-pink-600 hover:scale-105 transition-transform ${
        props.className || ''
      }`}
    ></button>
  );
};

export default UserControl;
