import React from 'react';

interface DeleteButtonProps {
  id: string;
  onClick: (id: string) => void;
}

export default function DeleteButton({ id, onClick }: DeleteButtonProps) {
  const handleClick = () => {
    onClick(id);
  };

  return <i className="fa fa-trash pointer" onClick={handleClick} />;
}
