import './Footer.css';

const Footer = ({ mix }) => {
	const { FOOTER_CONFIG } = require('../../configs/footerConfig.json');

	return (
		<footer className={`${mix} footer`}>
			<div className="footer__grid">
				<span
					className="footer__description"
					children={<>Учебный проект Яндекс.Практикум х&nbsp;BeatFilm.</>}
				/>
				<div className="footer__separator" />
				<div className="footer__bottom">
					<span className="footer__date" children={<>&#169; {new Date().getFullYear()}</>} />
					{FOOTER_CONFIG.footer.links.map((item) => (
						<a
							className="footer__link"
							href={item.href}
							target="_blank"
							rel="noreferrer noopener"
							key={item.key}
							children={item.text}
						/>
					))}
				</div>
			</div>
		</footer>
	);
};

export default Footer;
