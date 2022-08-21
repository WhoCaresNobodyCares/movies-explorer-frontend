import './ContentTitle.css';

const ContentTitle = ({ mix, title }) => {
	return (
		<div
			className={`${mix} content-title`}
			children={
				<>
					<h2 className="content-title__title" children={title} />
					<div className="content-title__separator" />
				</>
			}
		/>
	);
};

export default ContentTitle;
