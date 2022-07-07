interface DeleteButtonProps {
  id: string;
  onClick: (id: string) => void;
}

export default function DeleteButton({
  id,
  onClick
}: DeleteButtonProps): JSX.Element {
  const handleClick = () => {
    onClick(id);
  };

  return <i className="fa fa-trash pointer" onClick={handleClick} />;
}
