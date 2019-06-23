import { useUIContext } from '../contexts/ui';

const Test = () => {
  const {
    state: { displayType },
    actions: { windowResize },
  } = useUIContext();
  return (
    <div>
      <h1>displayType: {displayType}</h1>
      <input
        type='number'
        onChange={({ target }) => windowResize(Number(target.value))}
      />
    </div>
  );
};

export default Test;
