const useSearchCards = () => {
  const search = (cards, isShort, keyWords) => {
    const preparedCards = cards.map((item) => {
      const { country, description, director, duration, id, nameEN, nameRU, year } = item;
      return {
        id,
        duration,
        text: [nameRU, nameEN, description, director, country, year]
          .join(' ')
          .replace(/[«»—.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
          .replace(/\s+/g, ' ')
          .trim()
          .toLowerCase(),
      };
    });

    const completeMatch = preparedCards
      .map((item) => {
        const { id, duration, text } = item;
        const validityArray = [];

        if (!isShort) {
          for (let amountOfWords = 0; amountOfWords < keyWords.length; amountOfWords++) {
            text.includes(keyWords[amountOfWords].toLowerCase()) ? validityArray.push(true) : validityArray.push(false);
          }
        } else {
          for (let amountOfWords = 0; amountOfWords < keyWords.length; amountOfWords++) {
            text.includes(keyWords[amountOfWords].toLowerCase()) && duration < 40 ? validityArray.push(true) : validityArray.push(false);
          }
        }

        return validityArray.every((match) => match === true) ? id : false;
      })
      .filter(Boolean);

    const someMatch = preparedCards
      .map((item) => {
        const { id, duration, text } = item;
        const validityArray = [];
        let trueCount = 0;

        if (!isShort) {
          for (let amountOfWords = 0; amountOfWords < keyWords.length; amountOfWords++) {
            text.includes(keyWords[amountOfWords].toLowerCase()) ? validityArray.push(true) : validityArray.push(false);
          }
        } else {
          for (let amountOfWords = 0; amountOfWords < keyWords.length; amountOfWords++) {
            text.includes(keyWords[amountOfWords].toLowerCase()) && duration < 40 ? validityArray.push(true) : validityArray.push(false);
          }
        }

        for (let index = 0; index < validityArray.length; index++) {
          const element = validityArray[index];
          element === true && trueCount++;
        }

        return trueCount <= 1 ? false : validityArray.some((match) => match === true) ? id : false;
      })
      .filter(Boolean);

    const validIds = completeMatch.length > 0 ? completeMatch : someMatch;

    const result = cards.map((item) => validIds.includes(item.id) && item).filter(Boolean);
    return result;
  };

  return [search];
};

export default useSearchCards;
