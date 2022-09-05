export const searchMovies = (cards, words, isChecked) => {
  const preparedCards = cards.map(item => {
    const { country, description, director, duration, movieId, nameEN, nameRU, year } = item;
    return {
      movieId,
      duration,
      text: [nameRU, nameEN, description, director, country, year]
        .join(' ')
        .replace(/[«»'—.,/#!$%^&*;:{}=\-_`~()–]/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .toLowerCase(),
    };
  });

  const completeMatch = preparedCards
    .map(item => {
      const { movieId, duration, text } = item;
      const validityArray = [];

      if (!isChecked && words.length !== 0) {
        for (let amountOfWords = 0; amountOfWords < words.length; amountOfWords++) {
          text.includes(words[amountOfWords].toLowerCase()) ? validityArray.push(true) : validityArray.push(false);
        }
      } else if (isChecked && words.length !== 0) {
        for (let amountOfWords = 0; amountOfWords < words.length; amountOfWords++) {
          text.includes(words[amountOfWords].toLowerCase()) && duration < 40 ? validityArray.push(true) : validityArray.push(false);
        }
      } else if (isChecked) {
        duration < 40 ? validityArray.push(true) : validityArray.push(false);
      }

      return validityArray.every(match => match === true) ? movieId : false;
    })
    .filter(Boolean);

  const result = cards.map(item => completeMatch.includes(item.movieId) && item).filter(Boolean);

  return result;
};

export const getSavedMoviesIds = (allMovies, savedMovies) =>
  allMovies
    .map(item => {
      let match;
      for (let i = 0; i < savedMovies.length; i++) {
        const element = savedMovies[i];
        if (item.movieId === element.movieId) {
          match = item.movieId;
        }
      }
      return match;
    })
    .filter(Boolean);

export const validateMovies = array =>
  array
    .map(item => {
      if (
        !item.country ||
        !item.director ||
        !item.duration ||
        !item.year ||
        !item.description ||
        !item.image ||
        !item.trailerLink ||
        !item.id ||
        !item.nameRU ||
        !item.nameEN
      ) {
        return false;
      }
      const { country, director, duration, year, description, image, trailerLink, id, nameRU, nameEN } = item;
      return {
        country: country.replace(/\s{2,}/g, ' ').trim(),
        director: director.replace(/\s{2,}/g, ' ').trim(),
        duration: duration,
        year: year.replace(/\s{2,}/g, ' ').trim(),
        description: description
          .replace(/[*|\n]/g, ' ')
          .replace(/\s{2,}/g, ' ')
          .trim(),
        image: `https://api.nomoreparties.co${item.image.url.trim()}`,
        trailerLink: trailerLink.trim(),
        thumbnail: `https://api.nomoreparties.co${image.formats.thumbnail.url.trim()}`,
        movieId: id,
        nameRU: nameRU.replace(/\s{2,}/g, ' ').trim(),
        nameEN: nameEN.replace(/\s{2,}/g, ' ').trim(),
      };
    })
    .filter(Boolean);
