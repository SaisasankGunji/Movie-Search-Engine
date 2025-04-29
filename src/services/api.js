const apiKey = "b22f2043b0c928bb16ce1cff374bf0a0";
const baseUrl = "https://api.themoviedb.org/3";

export const getPopularMovies = async (page = 1) => {
  const response = await fetch(
    `${baseUrl}/movie/popular?api_key=${apiKey}&page=${page}`
  );
  const data = await response.json();
  return data;
};

export const searchMovies = async (query, page = 1) => {
  const response = await fetch(
    `${baseUrl}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
      query
    )}&page=${page}`
  );
  const data = await response.json();
  return data;
};
