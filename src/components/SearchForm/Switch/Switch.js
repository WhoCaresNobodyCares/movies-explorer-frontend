import './Switch.css';

const Switch = ({ mix }) => {
  return (
    <label
      className={`${mix} switch`}
      children={
        <>
          <input className="switch__checkbox" type="checkbox" />
          <span className="switch__slider" />
        </>
      }
    />
  );
};

export default Switch;
