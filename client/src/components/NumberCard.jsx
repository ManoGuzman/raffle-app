const NumberCard = ({ number, status, onClick }) => {
  return (
    <div
      className={`rounded p-2 text-center cursor-pointer border ${
        status === 'available' ? 'bg-green-200' :
        status === 'reserved' ? 'bg-yellow-200' :
        'bg-red-300'
      }`}
      onClick={onClick}
    >
      {number}
    </div>
  );
};

export default NumberCard;
