const useSearchCards = () => {
	const search = (cards, isShort, words) => {
		const preparedCards = cards.map((item) => {
			const {
				country,
				description,
				director,
				duration,
				movieId,
				nameEN,
				nameRU,
				year,
			} = item;
			return {
				movieId,
				duration,
				text: [nameRU, nameEN, description, director, country, year]
					.join(' ')
					.replace(/[«»'—.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
					.replace(/\s+/g, ' ')
					.trim()
					.toLowerCase(),
			};
		});

		const completeMatch = preparedCards
			.map((item) => {
				const { movieId, duration, text } = item;
				const validityArray = [];

				if (!isShort) {
					for (
						let amountOfWords = 0;
						amountOfWords < words.length;
						amountOfWords++
					) {
						text.includes(words[amountOfWords].toLowerCase())
							? validityArray.push(true)
							: validityArray.push(false);
					}
				} else {
					for (
						let amountOfWords = 0;
						amountOfWords < words.length;
						amountOfWords++
					) {
						text.includes(words[amountOfWords].toLowerCase()) && duration < 40
							? validityArray.push(true)
							: validityArray.push(false);
					}
				}

				return validityArray.every((match) => match === true) ? movieId : false;
			})
			.filter(Boolean);

		const result = cards
			.map((item) => completeMatch.includes(item.movieId) && item)
			.filter(Boolean);
		return result;
	};
	return search;
};

export default useSearchCards;
