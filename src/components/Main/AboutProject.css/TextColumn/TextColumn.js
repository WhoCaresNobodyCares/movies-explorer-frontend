import './TextColumn.css';

const TextColumn = ({ mix, title, text }) => {
  return (
    <div
      className={`${mix} text-column`}
      children={
        <>
          <h3 className='text-column__title' children={title} />
          <p className='text-column__paragraph' children={text} />
        </>
      }
    />
  );
};

export default TextColumn;
