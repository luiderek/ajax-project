/* exported data */

let data = {
  entries: [],
  genres: [],
  genreInclude: [],
  genreExclude: [12, 49],
  statusFilter: []
};

// status enum: "publishing" "complete" "hiatus" "discontinued" "upcoming"
// to the jikan API, demographics are just another genre
//    42 josei, 15 kids, 41 seinen, 25 shoujo, 27 shounen
// genres 12 49 are hentai and erotica, having those disabled by default
// links for later:
//    https://api.jikan.moe/v4/genres/manga?filter=genres
//    https://api.jikan.moe/v4/genres/manga?filter=themes
