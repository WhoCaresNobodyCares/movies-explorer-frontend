import ContentTitle from '../ContentTitle/ContentTitle';
import './Techs.css';

const Techs = ({ mix }) => {
	const { MAIN_CONFIG } = require('../../../configs/mainConfig.json');

	return (
		<section id="techs" className={`${mix} techs`}>
			<ContentTitle mix="techs__title" title={<>Технологии</>} />
			<h3 className="techs__subtitle" children={<>7&nbsp;технологий</>} />
			<p
				className="techs__paragraph"
				children={
					<>
						На&nbsp;курсе веб-разработки мы&nbsp;освоили технологии, которые применили
						в&nbsp;дипломном проекте.
					</>
				}
			/>
			<div
				className="techs__cards"
				children={MAIN_CONFIG.techs.cards.map((item) => (
					<span className="techs__card" children={item.text} key={item.key} />
				))}
			/>
		</section>
	);
};

export default Techs;
