export class MoviesLogic {
  constructor(mainApi, moviesApi, setIsPreloaderVisible) {
    this._mainApi = mainApi;
    this._moviesApi = moviesApi;
    this._setIsPreloaderVisible = setIsPreloaderVisible;
  }

  // !!! serch button unavailible while logic works

  _search(cards, isChecked, words) {
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

        if (!isChecked) {
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
  }

  _regulateExternalData(array) {
    return array
      .map((item) => {
        if (
          item.country === null ||
          item.director === null ||
          item.duration === null ||
          item.year === null ||
          item.description === null ||
          item.image === null ||
          item.trailerLink === null ||
          item.id === null ||
          item.nameRU === null ||
          item.nameEN === null
        ) {
          return false;
        }
        const {
          country,
          director,
          duration,
          year,
          description,
          image,
          trailerLink,
          id,
          nameRU,
          nameEN,
        } = item;
        return {
          country: country,
          director: director,
          duration: duration,
          year: year,
          description: description,
          image: `https://api.nomoreparties.co/${item.image.url}`,
          trailerLink: trailerLink,
          thumbnail: `https://api.nomoreparties.co/${image.formats.thumbnail.url}`,
          movieId: id,
          nameRU: nameRU,
          nameEN: nameEN,
        };
      })
      .filter(Boolean);
  }

  _filterSavedMoviesIds(allMovies, savedMovies) {
    return allMovies
      .map((item) => {
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
  }

  handleSearch(words, isCheckboxChecked, state, token, path) {
    const {
      userEmail,
      allCards,
      savedCards,
      savedCardsIds,
      moviesState,
      savedMoviesState,
    } = state;

    if (!allCards.length || !savedCards.length || !savedCardsIds.length) {
      // !!! initial search
      this._setIsPreloaderVisible(true);
      Promise.all([this._moviesApi.getMovies(), this._mainApi.getMovies(token)])
        .then((res) => {
          const [moviesApiRes, mainApiRes] = [res[0], res[1]];
          const [allMovies, savedMovies] = [
            this._regulateExternalData(moviesApiRes),
            mainApiRes,
          ];
          return { allMovies, savedMovies };
        })
        .then(({ allMovies, savedMovies }) => {
          return {
            allMovies,
            savedMovies,
            savedMoviesIds: this._filterSavedMoviesIds(allMovies, savedMovies),
          };
        })
        .then(({ allMovies, savedMovies, savedMoviesIds }) => {
          let foundMovies;
          if (path === '/movies') {
            foundMovies = this._search(allMovies, isCheckboxChecked, words);
          } else {
            foundMovies = this._search(savedMovies, isCheckboxChecked, words);
          }
          return { allMovies, savedMovies, savedMoviesIds, foundMovies };
        })
        .then(({ allMovies, savedMovies, savedMoviesIds, foundMovies }) => {
          if (path === '/movies') {
            localStorage.setItem(
              `${userEmail}-state`,
              JSON.stringify({
                userEmail: userEmail,
                allCards: allMovies,
                savedCards: savedMovies,
                savedCardsIds: savedMoviesIds,
                moviesState: {
                  inputValue: {
                    searchFormInput: words,
                  },
                  initialValue: {
                    searchFormInput: words.join(' '),
                  },
                  isCheckboxChecked: isCheckboxChecked,
                  lastFoundMovies: foundMovies,
                },
                savedMoviesState: {
                  inputValue: {
                    searchFormInput: ['Сохраненные', 'фильмы'],
                  },
                  initialValue: {
                    searchFormInput: 'Сохраненные фильмы',
                  },
                  isCheckboxChecked: false,
                  lastFoundMovies: savedMovies,
                },
              })
            );
          } else {
            localStorage.setItem(
              `${userEmail}-state`,
              JSON.stringify({
                userEmail: userEmail,
                allCards: allMovies,
                savedCards: savedMovies,
                savedCardsIds: savedMoviesIds,
                moviesState: {
                  inputValue: {
                    searchFormInput: [],
                  },
                  initialValue: {
                    searchFormInput: '',
                  },
                  isCheckboxChecked: false,
                  lastFoundMovies: [],
                },
                savedMoviesState: {
                  inputValue: {
                    searchFormInput: words,
                  },
                  initialValue: {
                    searchFormInput: words.join(' '),
                  },
                  isCheckboxChecked: isCheckboxChecked,
                  lastFoundMovies: foundMovies,
                },
              })
            );
          }
        })
        .then((res) => {
          this._setIsPreloaderVisible(false);
        })
        .then((res) => {})
        .then((res) => {})
        .then((res) => {})
        .then((res) => {})
        .then((res) => {})
        .then((res) => {})
        .then((res) => {})
        .then((res) => {})
        .then((res) => {})
        .then((res) => {})
        .then((res) => {})
        .then((res) => {});
    } else {
      console.log('nothing');
    }
  }

  handleLike(card, isCardLiked, setIsCardLiked,state, token, setIsPreloaderVisible) {
    setIsPreloaderVisible(true)
    const clone = structuredClone(state);

    clone.savedCardsIds.push(25);

    localStorage.setItem(`${state.userEmail}-state`, JSON.stringify(clone));

    setIsCardLiked(!isCardLiked)

    setIsPreloaderVisible(false)

    console.log(state.savedCardsIds);

    if (false) {
    } else {
      // localStorage.setItem(
      //   `${userEmail}-state`,
      //   JSON.stringify({
      //     userEmail,
      //     allCards,
      //     savedCards,
      //     savedCardsIds, // !!!
      //     moviesState,
      //     savedMoviesState,
      //   })
      //   );
    }

    // console.log(state);
    // const newValue = {
    //   userEmail,
    //   allCards,
    //   savedCards,
    //   savedCardsIds: [...savedCardsIds, card.movieId],
    //   moviesState,
    //   savedMoviesState,
    // }

    // localStorage.setItem(
    //   `${userEmail}-state`,
    //   JSON.stringify(
    //     newValue
    //   )
    // );

    // if (savedCardsIds.some((item) => item === card.movieId)) {
    // } else {
    // this._mainApi
    // .addMovie({
    //   country: card.country,
    //   director: card.director,
    //   duration: card.duration,
    //   year: card.year,
    //   description: card.description,
    //   image: card.image,
    //   trailerLink: card.trailerLink,
    //   thumbnail: card.thumbnail,
    //   movieId: card.movieId,
    //   nameRU: card.nameRU,
    //   nameEN: card.nameEN,
    //   token: token,
    // })
    // .then((res) => res.movieId)
    // .then((res) => {
    //   localStorage.setItem(
    //     `${userEmail}-state`,
    //     JSON.stringify({
    //       userEmail,
    //       allCards,
    //       savedCards,
    //       savedCardsIds: ['привет'], // !!!
    //       moviesState,
    //       savedMoviesState,
    //     })
    //   );
    // })
    // .then(() => setIsCardLiked(true))
    // .then(() => console.log(state));
    // }
  }
}
