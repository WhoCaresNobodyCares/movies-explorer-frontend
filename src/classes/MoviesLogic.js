export class MoviesLogic {
  constructor(mainApi, moviesApi) {
    this._mainApi = mainApi;
    this._moviesApi = moviesApi;
  }

  _searchMovies(cards, isChecked, words) {
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

  _getSavedMoviesIds(allMovies, savedMovies) {
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

  _formatMovies(array) {
    return array
      .map((item) => {
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

  handleSearch(
    words,
    isCheckboxChecked,
    searchPath,
    inputValue,
    initialValue,
    setRenderedMovies,
    setSavedMoviesIds
  ) {
    Promise.all([
      this._moviesApi.getMovies(),
      this._mainApi.getMovies(localStorage.getItem('token')),
      this._mainApi.checkValidity(localStorage.getItem('token')),
    ])
      .then((res) => {
        const [movies, savedMovies, user] = [
          this._formatMovies(res[0]),
          res[1],
          res[2],
        ];
        const { name, email } = user;
        return { movies, savedMovies, name, email };
      })
      .then(({ movies, savedMovies, name, email }) => {
        return {
          movies,
          savedMovies,
          name,
          email,
          savedMoviesIds: this._getSavedMoviesIds(movies, savedMovies),
        };
      })
      .then(({ movies, savedMovies, name, email, savedMoviesIds }) => {
        let foundMovies;
        if (searchPath === '/movies') {
          foundMovies = this._searchMovies(movies, isCheckboxChecked, words);
        } else {
          foundMovies = this._searchMovies(
            savedMovies,
            isCheckboxChecked,
            words
          );
        }
        return {
          movies,
          savedMovies,
          savedMoviesIds,
          foundMovies,
          name,
          email,
        };
      })
      .then(
        ({ movies, savedMovies, savedMoviesIds, foundMovies, name, email }) => {
          if (searchPath === '/movies') {
            localStorage.setItem(
              `${email}-state`,
              JSON.stringify({
                name,
                email,
                movies,
                savedMovies,
                savedMoviesIds,
                moviesState: {
                  inputValue,
                  initialValue,
                  isCheckboxChecked,
                  foundMovies,
                },
                savedMoviesState: {
                  inputValue: {
                    searchFormInput: ['Сохраненные', 'фильмы'],
                  },
                  initialValue: {
                    searchFormInput: 'Сохраненные фильмы',
                  },
                  isCheckboxChecked: false,
                  foundMovies: [],
                },
              })
            );
          } else {
            localStorage.setItem(
              `${email}-state`,
              JSON.stringify({
                name,
                email,
                movies,
                savedMovies,
                savedMoviesIds,
                moviesState: {
                  inputValue: {
                    searchFormInput: ['Фильмы'],
                  },
                  initialValue: {
                    searchFormInput: 'Фильмы',
                  },
                  isCheckboxChecked: false,
                  foundMovies: [],
                },
                savedMoviesState: {
                  inputValue,
                  initialValue,
                  isCheckboxChecked,
                  foundMovies,
                },
              })
            );
          }

          return {
            movies,
            savedMovies,
            savedMoviesIds,
            foundMovies,
            name,
            email,
          };
        }
      )
      .then(
        ({ movies, savedMovies, savedMoviesIds, foundMovies, name, email }) => {
          setSavedMoviesIds(savedMoviesIds);
          setRenderedMovies(foundMovies);
        }
      );

    // !!! hangle errors
  }

  handleLike(card, savedMoviesIds, setIsCardLiked, userState) {
    if (savedMoviesIds.some((item) => item === card.movieId)) {

      // !!! handle delete
    } else {
      Promise.all([
        this._mainApi.addMovie({
          country: card.country,
          director: card.director,
          duration: card.duration,
          year: card.year,
          description: card.description,
          image: card.image,
          trailerLink: card.trailerLink,
          thumbnail: card.thumbnail,
          movieId: card.movieId,
          nameRU: card.nameRU,
          nameEN: card.nameEN,
          token: localStorage.getItem('token'),
        }),
        this._mainApi.checkValidity(localStorage.getItem('token')),
      ])
        .then((res) => {
          const [likedMovie, user] = [res[0], res[1]];
          return { likedMovie, user };
        })
        .then(({ likedMovie, user }) => {
          const state = JSON.parse(localStorage.getItem(`${user.email}-state`));
          const savedMoviesIds = JSON.parse(
            localStorage.getItem(`${user.email}-state`)
          ).savedMoviesIds;
          return { state, savedMoviesIds, likedMovie, user };
        })
        .then(({ state, savedMoviesIds, likedMovie, user }) => {
          savedMoviesIds.push(likedMovie.movieId);
          return { state, savedMoviesIds, likedMovie, user };
        })
        .then(({ state, savedMoviesIds, likedMovie, user }) => {
          const { movies, savedMovies, moviesState, savedMoviesState  } = state
          const{ name, email } = user
          localStorage.setItem(
            `${user.email}-state`,
            JSON.stringify({
              name,
              email,
              movies,
              savedMovies,
              savedMoviesIds,
              moviesState,
              savedMoviesState
            })
          );
        })
        .then(() => {})
        .then(() => setIsCardLiked(true))
        .then(() => console.log());

        // !!! handle Errors
    }
  }

  handleDelete(card, savedMoviesIds, userState) {

  }
}
