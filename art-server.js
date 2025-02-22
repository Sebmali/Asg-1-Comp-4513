const express = require('express');
const supa = require('@supabase/supabase-js');
const app = express();

const supaUtrl = 'https://vqozrzkqoytldobjrzbo.supabase.co';
const supaAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZxb3pyemtxb3l0bGRvYmpyemJvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAyNTExNDYsImV4cCI6MjA1NTgyNzE0Nn0.pBmgXJJfx2Kw1kEU7OTfi2Om9Jo-S3qB1meY2DZwLgM';
const port = process.env.port || 3000;

const supabase = supa.createClient(supaUtrl, supaAnonKey);

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello from Glitch Node Server!");
});

// Returns all the eras
app.get('/api/eras', async (req, res) => {
    const { data, error } = await supabase
      .from("eras")
      .select("*")
    res.send(data);
});

// Returns all the galleries
app.get('/api/galleries', async (req, res) => {
    const { data, error } = await supabase
      .from("galleries")
      .select("*")
    res.send(data);
});

// Returns just the specified galley
app.get('/api/galleries/:galleryId', async (req, res) => {
    const galleryId = req.params.galleryId;
    const { data, error } = await supabase
      .from("galleries")
      .select("*")
      .eq("galleryId", galleryId)
    res.send(data);
});

// Returns the galleries whose galleryCountry begins with the provided substring
app.get('/api/galleries/country/:substring', async (req, res) => {
    const substring = req.params.substring;
    const { data, error } = await supabase
      .from("galleries")
      .select("*")
      .ilike("galleryCountry", substring + "%")
    res.send(data);
});

// Returns all the artists
app.get('/api/artists', async (req, res) => {
    const { data, error } = await supabase
      .from("artists")
      .select("*")
    res.send(data);
});

// Returns just the specified artist
app.get('/api/artists/:artistId', async (req, res) => {
    const artistId = req.params.artistId;
    const { data, error } = await supabase
      .from("artists")
      .select("*")
      .eq("artistId", artistId)
    res.send(data);
});

// Returns the artists whose last name begins with the provided substring
app.get('/api/artists/search/:substring', async (req, res) => {
    const substring = req.params.substring;
    const { data, error } = await supabase
      .from("artists")
      .select("*")
      .ilike("lastName", substring + "%")
    res.send(data);
});

// Returns all the artists whose nationality begins with the provided substring
app.get('/api/artists/country/:substring', async (req, res) => {
    const substring = req.params.substring.toLowerCase();
    const { data, error } = await supabase
      .from("artists")
      .select("*")
      .ilike("nationality", substring + "%") // might give problems with case insensitivity.
    res.send(data);
});

// Returns all paintings
app.get('/api/paintings', async (req, res) => {
    const { data, error } = await supabase
      .from("paintings")
      .select("*, artists (*), galleries (*)")
      .order("title", { ascending: true });
    res.send(data);
});

// Returns all the paintings, sorted by either title or yearOfWork
app.get('/api/paintings/sort/:sort', async (req, res) => {
    const sort = req.params.sort;
    const { data, error } = await supabase
      .from("paintings")
      .select("*, artists (*), galleries (*)")
      .order(sort, { ascending: true });
    res.send(data);
});

// Returns just the specified painting
app.get('/api/paintings/:paintingId', async (req, res) => {
    const paintingId = req.params.paintingId;
    const { data, error } = await supabase
      .from("paintings")
      .select("*, artists (*), galleries (*)")
      .eq("paintingId", paintingId)
    res.send(data);
});

// Returns the paintings whose title contains the provided substring
app.get('/api/paintings/search/substring', async (req, res) => {
    const substring = req.params.substring;
    const { data, error } = await supabase
      .from("paintings")
      .select("*, artists (*), galleries (*)")
      .ilike("title", "%" + substring + "%")
    res.send(data);
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
    res.send(data);
});

// Returns all the paintings in a given gallery
app.get('/api/paintings/galleries/:galleryId', async (req, res) => {
    const galleryId = req.params.galleryId;
    const { data, error } = await supabase
      .from("paintings")
      .select("*, artists (*)")
      .eq("galleryId", galleryId)
    res.send(data);
});

// Returns all the paintings by a given artist
app.get('/api/paintings/artist/:artistId', async (req, res) => {
    const artistId = req.params.artistId;
    const { data, error } = await supabase
      .from("paintings")
      .select("*, galleries (*)")
      .eq("artistId", artistId)
    res.send(data);
});

// Returns all the paintings by artists whose nationality begins with the provided substring
app.get('/api/paintings/artists/country/:substring', async (req, res) => {
    const substring = req.params.substring;
    const { data, error } = await supabase
      .from("paintings")
      .select("*, artists (*), galleries (*)")
      .ilike("nationality", substring + "%")
    res.send(data);
});

// Returns all the genres
app.get('/api/genres', async (req, res) => {
    const { data, error } = await supabase
      .from("genres")
      .select("*, eras (*)")
    res.send(data);
});

// Returns just the specified genre
app.get('/api/genres/:genreId', async (req, res) => {
    const genreId = req.params.genreId;
    const { data, error } = await supabase
      .from("genres")
      .select("*, eras (*)")
      .eq("genreId", genreId)
    res.send(data);
});

// Returns the genres used in a given painting
app.get('/api/genres/painting/:paintingId', async (req, res) => {
    const paintingId = req.params.paintingId;
    const { data, error } = await supabase
      .from("paintinggenres")
      .select("genres (*)")
      .eq("paintingId", paintingId)
    res.send(data);
});

// Returns all the paintings for a given genre
app.get('/api/paintings/genre/:genreId', async (req, res) => {
    const genreId = req.params.genreId;
    const { data, error } = await supabase
      .from("paintinggenres")
      .select("paintings (*)")
      .eq("genreId", genreId)
    res.send(data);
});

// Returns all the paintings for a given era
app.get('/api/paintings/era/:eraId', async (req, res) => {
    const eraId = req.params.eraId;
    const { data, error } = await supabase
      .from("paintings")
      .select("*, artists (*), galleries (*)")
      .eq("eraId", eraId)
    res.send(data);
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
    res.send(resultCount);
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