import { useEffect, useState } from 'react';
import useWidth from './useWidth';

const useCardsLayout = (cards) => {
	const viewport = useWidth();
	const [initialAmount, setInitialAmount] = useState(
		viewport <= 689 ? 5 : viewport <= 1087 ? 8 : viewport > 1087 ? 12 : false,
	);
	const [additionalAmount, setAdditionalAmount] = useState(
		viewport <= 689 ? 1 : viewport <= 1087 ? 2 : viewport > 1087 ? 3 : false,
	);
	const [isButtonVisible, setIsButtonVisible] = useState(false);

	const handleCardsAmountChange = () => {
		setInitialAmount(
			viewport <= 689 ? 5 : viewport <= 1087 ? 8 : viewport > 1087 ? 12 : false,
		);
		setAdditionalAmount(
			viewport <= 689 ? 1 : viewport <= 1087 ? 2 : viewport > 1087 ? 3 : false,
		);
	};

	const handleAddCards = () =>
		setInitialAmount(initialAmount + additionalAmount);

	const renderedSection = cards.slice(0, initialAmount);

	useEffect(() => {
		handleCardsAmountChange();
	}, [viewport, cards]);

	useEffect(() => {
		initialAmount > renderedSection.length
			? setIsButtonVisible(false)
			: setIsButtonVisible(true);
	}, [initialAmount, renderedSection.length]);

	return {
		renderedSection,
		addMoreCards: handleAddCards,
		resetLayout: handleCardsAmountChange,
		isButtonVisible,
	};
};

export default useCardsLayout;
