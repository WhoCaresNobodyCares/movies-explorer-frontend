import './AboutMe.css';
import ContentTitle from '../ContentTitle/ContentTitle';
import { useContext } from 'react';
import AppContext from '../../../contexts/AppContext';

const AboutMe = ({ mix }) => {
	const { MAIN_CONFIG } = require('../../../configs/mainConfig.json');
	const { viewportWidth } = useContext(AppContext);

	return (
		<section id="about-me" className={`${mix} about-me`}>
			<ContentTitle mix="about-me__title" title={<>Студент</>} />
			{viewportWidth > 600 ? (
				<>
					<div className="about-me__content">
						<div className="about-me__info">
							<h3 className="about-me__subtitle" children={<>Андрей</>} />
							<span
								className="about-me__description"
								children={<>Фронтенд-разработчик, 27&nbsp;лет</>}
							/>
							<p
								className="about-me__paragraph"
								children={
									<>
										Занимаюсь разработкой веб-страниц и&nbsp;веб-приложений. Увлекаюсь лингвистикой,
										графикой и&nbsp;современными технологиями. Пассионарен, пунктуален, методичен.
									</>
								}
							/>
							<div className="about-me__links">
								{MAIN_CONFIG.aboutMe.links.map((item) => (
									<a
										href={item.href}
										target="_blank"
										rel="noreferrer noopener"
										className="about-me__link"
										key={item.key}
										children={item.text}
									/>
								))}
							</div>
						</div>
						<div className="about-me__image" />
					</div>
				</>
			) : (
				<>
					<div className="about-me__content">
						<div className="about-me__image" />
						<div className="about-me__info">
							<h3 className="about-me__subtitle" children={<>Андрей</>} />
							<span
								className="about-me__description"
								children={<>Фронтенд-разработчик, 27&nbsp;лет</>}
							/>
							<p
								className="about-me__paragraph"
								children={
									<>
										Занимаюсь разработкой веб-страниц и&nbsp;веб-приложений. Увлекаюсь лингвистикой,
										графикой и&nbsp;современными технологиями. Пассионарен, пунктуален, методичен.
									</>
								}
							/>
							<div className="about-me__links">
								{MAIN_CONFIG.aboutMe.links.map((item) => (
									<a
										href={item.href}
										target="_blank"
										rel="noreferrer noopener"
										className="about-me__link"
										key={item.key}
										children={item.text}
									/>
								))}
							</div>
						</div>
					</div>
				</>
			)}
		</section>
	);
};

export default AboutMe;
