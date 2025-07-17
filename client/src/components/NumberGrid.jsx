import NumberCard from './NumberCard';

const NumberGrid = ({ numbers, onSelect }) => {
  return (
    <div className="grid grid-cols-10 gap-2">
      {numbers.map((num) => (
        <NumberCard
          key={num.id}
          number={num.number}
          status={num.status}
          onClick={() => onSelect(num.id)}
        />
      ))}
    </div>
  );
};

export default NumberGrid;
