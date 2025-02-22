# COMP 4513 (Winter 2025)

## Assignment #1: Node API

## Overview
This project is an API for querying Art data - artists, eras, galleries, genres,
paintinggenres, paintings, and shapes. The data is returned in a JSON format. 

## Built With
[**Node.Js**](https://nodejs.org/en) - JS runtime

[**Express**](https://expressjs.com) - Routing

[**Glitch**](https://glitch.com) - For Deployment

[**Supabase**](https://supabase.com) - For Data Storage

## API Endpoints
| API Endpoint | Description |
| :-- | :---------- |
| /api/eras | Returns all the eras | 
| /api/galleries | Returns all the galleries |
| /api/galleries/:galleryId | Returns just the specified gallery |
| /api/galleries/country/:substring | Returns the galleries who galleryCountry (case insensitive) begins with the provided substring |
| /api/artists | Returns all the artists | 
| /api/artists/:artistId | Returns just the specified artist | 
| /api/artists/search/:substring | Returns the artists whose last name (case insensitive) begins with the provided substring | 
| /api/artists/country/:substring | Returns the artists whose nationality (case insensitive) begins with the provided substring | 
| /api/paintings | Returns all the paintings | 
| /api/paintings/sort/:sort | Returns all the paintings, sorted by either title or yearOfWork | 
| /api/paintings/:paintingId | Returns just the specified painting | 
| /api/paintings/search/:substring | Returns the paintings whose title (case insensitive) contains the provided substring | 
| /api/paintings/years/:start/:end | Returns the paintings between two years (inclusive) ordered by yearOfWork |
| /api/paintings/galleries/:galleryId | Returns all the paintings in a given gallery |
| /api/paintings/artist/:artistId | Returns all the paintings by a given artist |
| /api/paintings/artists/country/:substring | Returns all the paintings by artists whose nationality begins with the provided substring | 
| /api/genres | Returns all genres |
| /api/genres/:genreId | Returns just the specified genre |
| /api/genres/painting/:paintingId | Returns the genres used in a given painting |
| /api/paintings/genre/:genreId | Returns all the paintings for a given genre |
| /api/paintings/era/:eraId | Returns all the paintings for a given era |
| /api/counts/genres | Returns the genre name and the number of paintings for each genre sorted by the number of paintings (fewest to most) | 
| /api/counts/artists | Returns the artist name and the number of paintings for each artist, sorted by the number of paintings (most to fewest) |
| /api/counts/topgenres/:paintingCount | Returns the genre name and the number of paintings for each genre, sorted by the number of paintings (most to least) for genres having over some set number of paintings |

## Test Links
- ()
- ()
- ()
- ()
- ()
- ()
- ()
- ()
- ()
- ()




