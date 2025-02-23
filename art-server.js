const express = require('express');
const supa = require('@supabase/supabase-js');
const app = express();

const supaUtrl = 'https://vqozrzkqoytldobjrzbo.supabase.co';
const supaAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxb3pyemtxb3l0bGRvYmpyemJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyNTExNDYsImV4cCI6MjA1NTgyNzE0Nn0.pBmgXJJfx2Kw1kEU7OTfi2Om9Jo-S3qB1meY2DZwLgM';
const port = process.env.port || 3000;

const supabase = supa.createClient(supaUtrl, supaAnonKey);

function errorHandler(error, data, res, message) {
    if (error) {
      res.status(500).json({ error: error.message });
      return false;
    }
    if (!data || data.length === 0) {
      res.status(404).json({ error: message });
      return false;
    }
    return true;
}

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello from Glitch Node Server!");
});

// Returns all the eras
app.get('/api/eras', async (req, res) => {
    const { data, error } = await supabase
      .from("eras")
      .select("*")
    let isError = errorHandler(error, data, res, "No eras found.");
    if (!isError) res.send(data);
});

// Returns all the galleries
app.get('/api/galleries', async (req, res) => {
    const { data, error } = await supabase
      .from("galleries")
      .select("*")
    let isError = errorHandler(error, data, res, "No eras found.");
    if (!isError) res.send(data);
});

// Returns just the specified galley
app.get('/api/galleries/:galleryId', async (req, res) => {
    const galleryId = req.params.galleryId;
    const { data, error } = await supabase
      .from("galleries")
      .select("*")
      .eq("galleryId", galleryId)
    let isError = errorHandler(error, data, res, "No eras found.");
    if (!isError) res.send(data);
});

// Returns the galleries whose galleryCountry begins with the provided substring
app.get('/api/galleries/country/:substring', async (req, res) => {
    const substring = req.params.substring;
    const { data, error } = await supabase
      .from("galleries")
      .select("*")
      .ilike("galleryCountry", substring + "%")
    let isError = errorHandler(error, data, res, "No eras found.");
    if (!isError) res.send(data);
});

// Returns all the artists
app.get('/api/artists', async (req, res) => {
    const { data, error } = await supabase
      .from("artists")
      .select("*")
    let isError = errorHandler(error, data, res, "No eras found.");
    if (!isError) res.send(data);
});

// Returns just the specified artist
app.get('/api/artists/:artistId', async (req, res) => {
    const artistId = req.params.artistId;
    const { data, error } = await supabase
      .from("artists")
      .select("*")
      .eq("artistId", artistId)
    let isError = errorHandler(error, data, res, "No eras found.");
    if (!isError) res.send(data);
});

// Returns the artists whose last name begins with the provided substring
app.get('/api/artists/search/:substring', async (req, res) => {
    const substring = req.params.substring;
    const { data, error } = await supabase
      .from("artists")
      .select("*")
      .ilike("lastName", substring + "%")
    let isError = errorHandler(error, data, res, "No eras found.");
    if (!isError) res.send(data);
});

// Returns all the artists whose nationality begins with the provided substring
app.get('/api/artists/country/:substring', async (req, res) => {
    const substring = req.params.substring.toLowerCase();
    const { data, error } = await supabase
      .from("artists")
      .select("*")
      .ilike("nationality", substring + "%") // might give problems with case insensitivity.
    let isError = errorHandler(error, data, res, "No eras found.");
    if (!isError) res.send(data);
});

// Returns all paintings
app.get('/api/paintings', async (req, res) => {
    const { data, error } = await supabase
      .from("paintings")
      .select("*, artists (*), galleries (*)")
      .order("title", { ascending: true });
    let isError = errorHandler(error, data, res, "No eras found.");
    if (!isError) res.send(data);
});

// Returns all the paintings, sorted by either title or yearOfWork
app.get('/api/paintings/sort/:sort', async (req, res) => {
    const sort = req.params.sort;
    const { data, error } = await supabase
      .from("paintings")
      .select("*, artists (*), galleries (*)")
      .order(sort, { ascending: true });
    let isError = errorHandler(error, data, res, "No eras found.");
    if (!isError) res.send(data);
});

// Returns just the specified painting
app.get('/api/paintings/:paintingId', async (req, res) => {
    const paintingId = req.params.paintingId;
    const { data, error } = await supabase
      .from("paintings")
      .select("*, artists (*), galleries (*)")
      .eq("paintingId", paintingId)
    let isError = errorHandler(error, data, res, "No eras found.");
    if (!isError) res.send(data);
});

// Returns the paintings whose title contains the provided substring
app.get('/api/paintings/search/substring', async (req, res) => {
    const substring = req.params.substring;
    const { data, error } = await supabase
      .from("paintings")
      .select("*, artists (*), galleries (*)")
      .ilike("title", "%" + substring + "%")
    let isError = errorHandler(error, data, res, "No eras found.");
    if (!isError) res.send(data);
});

// Returns the paintings between the two years (inclusive), ordered by yearOfWork
app.get('/api/paintings/years/:start/:end', async (req, res) => {
    const start = req.params.start;
    const end = req.params.end;
    const { data, error } = await supabase
      .from("paintings")
      .select("*, artists (*), galleries (*)")
      .gte("yearOfWork", start) // >= start
      .lte("yearOfWork", end) // <= end
      .order("yearOfWork", { ascending: true });
    let isError = errorHandler(error, data, res, "No eras found.");
    if (!isError) res.send(data);
});

// Returns all the paintings in a given gallery
app.get('/api/paintings/galleries/:galleryId', async (req, res) => {
    const galleryId = req.params.galleryId;
    const { data, error } = await supabase
      .from("paintings")
      .select("*, artists (*)")
      .eq("galleryId", galleryId)
    let isError = errorHandler(error, data, res, "No eras found.");
    if (!isError) res.send(data);
});

// Returns all the paintings by a given artist
app.get('/api/paintings/artist/:artistId', async (req, res) => {
    const artistId = req.params.artistId;
    const { data, error } = await supabase
      .from("paintings")
      .select("*, galleries (*)")
      .eq("artistId", artistId)
    let isError = errorHandler(error, data, res, "No eras found.");
    if (!isError) res.send(data);
});

// Returns all the paintings by artists whose nationality begins with the provided substring
app.get('/api/paintings/artists/country/:substring', async (req, res) => {
    const substring = req.params.substring;
    const { data, error } = await supabase
      .from("paintings")
      .select("*, artists (*), galleries (*)")
      .ilike("nationality", substring + "%")
    let isError = errorHandler(error, data, res, "No eras found.");
    if (!isError) res.send(data);
});

// Returns all the genres
app.get('/api/genres', async (req, res) => {
    const { data, error } = await supabase
      .from("genres")
      .select("*, eras (*)")
    let isError = errorHandler(error, data, res, "No eras found.");
    if (!isError) res.send(data);
});

// Returns just the specified genre
app.get('/api/genres/:genreId', async (req, res) => {
    const genreId = req.params.genreId;
    const { data, error } = await supabase
      .from("genres")
      .select("*, eras (*)")
      .eq("genreId", genreId)
    let isError = errorHandler(error, data, res, "No eras found.");
    if (!isError) res.send(data);
});

// Returns the genres used in a given painting
app.get('/api/genres/painting/:paintingId', async (req, res) => {
    const paintingId = req.params.paintingId;
    const { data, error } = await supabase
      .from("paintinggenres")
      .select("genres (*)")
      .eq("paintingId", paintingId)
    let isError = errorHandler(error, data, res, "No eras found.");
    if (!isError) res.send(data);
});

// Returns all the paintings for a given genre
app.get('/api/paintings/genre/:genreId', async (req, res) => {
    const genreId = req.params.genreId;
    const { data, error } = await supabase
      .from("paintinggenres")
      .select("paintings (*)")
      .eq("genreId", genreId)
    let isError = errorHandler(error, data, res, "No eras found.");
    if (!isError) res.send(data);
});

// Returns all the paintings for a given era
app.get('/api/paintings/era/:eraId', async (req, res) => {
    const eraId = req.params.eraId;
    const { data, error } = await supabase
      .from("paintings")
      .select("*, artists (*), galleries (*)")
      .eq("eraId", eraId)
    let isError = errorHandler(error, data, res, "No eras found.");
    if (!isError) res.send(data);
});

// Returns the genre name and the number of paintings for each genre,
// sorted by the number of paintings (fewest to most)
app.get('/api/counts/genres', async (req, res) => {
    const { data, error } = await supabase
      .from("paintinggenres")
      .select("genreId, genres ( genreName )");
    const genreCount = {};
    data.forEach((genre) => {
        const genreId = genre.genreId;
        const genreName = genre.genres[0].genreName;
        if (genreCount[genreName]) {
            genreCount[genreName]++;
        } else {
            genreCount[genreName] = 1;
        }
    });
    let resultCount = Object.values(genreCount).sort((a, b) => a - b);
    let isError = errorHandler(error, data, res, "No eras found.");
    if (!isError) res.send(data);
});

// Returns the artist name, and the number of paintings for each artist,
// sorted by the number of paintings (most to fewest)
app.get('/api/counts/artists', async (req, res) => {
    // To be implemented
});

// Returns the genre name and the number of paintings for each genre,
// sorted by the number of paintings (most to least) for genres having
// over some set number of paintings.
app.get('/api/counts/topgenres/:paintingCount', async (req, res) => {
    // To be implemented
});

app.listen(port, () => { // Will likely be changed to a server. 
    console.log('Server is running on port: ' + port);
});