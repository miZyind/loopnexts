import { useLayoutValue } from '../contexts/layout';

const Test = () => {
  const { displayType, windowResize } = useLayoutValue();
  const onChange = (e) => windowResize(Number(e.target.value));
  return (
    <div>
      <h1>displayType: {displayType}</h1>
      <input type='number' onChange={onChange} />
    </div>
  );
};

export default Test;
