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
- [/api/eras](https://chain-understood-teller.glitch.me/api/eras)
- [/api/galleries](https://chain-understood-teller.glitch.me/api/galleries)
- [/api/galleries/30](https://chain-understood-teller.glitch.me/api/galleries/30)
- [/api/galleries/Calgary](https://chain-understood-teller.glitch.me/api/galleries/Calgary)
- [/api/galleries/country/fra](https://chain-understood-teller.glitch.me/api/galleries/country/fra)
- [/api/artists](https://chain-understood-teller.glitch.me/api/artists)
- [/api/artists/12](https://chain-understood-teller.glitch.me/api/artists/12)
- [/api/artists/1223423](https://chain-understood-teller.glitch.me/api/artists/1223423)
- [/api/artists/search/ma](https://chain-understood-teller.glitch.me/api/artists/search/ma)
- [/api/artists/search/mA](https://chain-understood-teller.glitch.me/api/artists/search/mA)
- [/api/artists/country/fra](https://chain-understood-teller.glitch.me/api/artists/country/fra)
- [/api/paintings](https://chain-understood-teller.glitch.me/api/paintings)
- [/api/paintings/sort/year](https://chain-understood-teller.glitch.me/api/paintings/sort/year)
- [/api/paintings/63](https://chain-understood-teller.glitch.me/api/paintings/63)
- [/api/paintings/search/port](https://chain-understood-teller.glitch.me/api/paintings/search/port)
- [/api/paintings/search/pORt](https://chain-understood-teller.glitch.me/api/paintings/search/pORt)
- [/api/paintings/search/connolly](https://chain-understood-teller.glitch.me/api/paintings/search/connolly)
- [/api/paintings/years/1800/1850](https://chain-understood-teller.glitch.me/api/paintings/years/1800/1850)
- [/api/paintings/galleries/5](https://chain-understood-teller.glitch.me/api/paintings/galleries/5)
- [/api/paintings/artist/16](https://chain-understood-teller.glitch.me/api/paintings/artist/16)
- [/api/paintings/artist/666](https://chain-understood-teller.glitch.me/api/paintings/artist/666)
- [/api/paintings/artist/country/ital](https://chain-understood-teller.glitch.me/api/paintings/artist/country/ital)
- [/api/genres](https://chain-understood-teller.glitch.me/api/genres)
- [/api/genres/76](https://chain-understood-teller.glitch.me/api/genres/76)
- [/api/genres/painting/408](https://chain-understood-teller.glitch.me/api/genres/painting/408)
- [/api/genres/painting/jsdfhg](https://chain-understood-teller.glitch.me/api/genres/painting/jsdfhg)
- [/api/paintings/genre/78](https://chain-understood-teller.glitch.me/api/paintings/genre/78)
- [/api/paintings/era/2](https://chain-understood-teller.glitch.me/api/paintings/era/2)
- [/api/counts/genres](https://chain-understood-teller.glitch.me/api/counts/genres)
- [/api/counts/artists](https://chain-understood-teller.glitch.me/api/counts/artists)
- [/api/counts/topgenres/20](https://chain-understood-teller.glitch.me/api/counts/topgenres/20)
- [/api/counts/topgenres/2034958](https://chain-understood-teller.glitch.me/api/counts/topgenres/2034958)



