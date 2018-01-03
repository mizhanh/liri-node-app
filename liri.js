
var myCommand = process.argv[2];
var myMovie = process.argv[3];
var mySong = process.argv[3];

var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");
var chalk = require("chalk");

require("dotenv").config();

//====================================================================================
//Random Text
//=====================================================================================
if (myCommand === "do-what-it-says") {
	
	fs.readFile("random.txt", "utf8", function(error, data) {
		if (error) {
			return console.log(error);
		}

		var dataArr = data.split(",");
		console.log(dataArr);
		mySong = dataArr[1];
		mySpotify();
	});

} else if (myCommand === "my-tweets") {
		myTweet();
} else if (myCommand === "spotify-this-song") { 
		mySpotify();
} else if (myCommand === "movie-this") {
		myOmdb();
}

//==================================================================================
//Twitter Function
//==================================================================================
function myTweet() {
	var twitterPackage = require('twitter');
	var myKeys = require("./keys.js");
	var twitter = new twitterPackage(myKeys);
	var params = {count: 10};

	twitter.get('statuses/user_timeline', params, function(error, tweets, response) {
  		if (!error) {
  			console.log(" ");
    		console.log("===========================================");
    		console.log(chalk.blue("My recent tweets"));
    		console.log("===========================================");
			
			var data = [];
			fs.appendFile("log.txt", myCommand);
			fs.appendFile("log.txt", "\r\n");
			
			for (var i=0; i<tweets.length; i++) {
  				console.log("Tweets: " + tweets[i].text);
    			console.log("When: " + tweets[i].created_at);
    			console.log(" ");
    			fs.appendFile("log.txt", "\r\n");
		   		fs.appendFile("log.txt", "Tweets: " + tweets[i].text);
		   		fs.appendFile("log.txt", "\r\n");
		   		fs.appendFile("log.txt", "When: " + tweets[i].created_at);
		   		fs.appendFile("log.txt", "\r\n");
		   	}

    	} else {
    		console.log("Try Again Later");
    	}
    		   		 	
	});
}

//====================================================================================
//Spotify Function
//====================================================================================
function mySpotify() {
	var spotify = new Spotify({
		id: process.env.SPOTIFY_ID,
		secret: process.env.SPOTIFY_SECRET,
	});

	if (mySong === undefined) { 
		mySong = "The Sign Ace of Base";
		}

	spotify.search({type: 'track', query: mySong}, function(err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);
		}
		else {
			console.log(" ");
			console.log("===========================================");
    		console.log(chalk.blue("My selected song is "));	
    		console.log("===========================================");	
			
			var result = data.tracks.items[0];
				
			console.log("Title: " + result.name);
		    console.log("Artist: " + result.artists[0].name);
		    console.log("Album: " + result.album.name);
		    console.log("Preview: " + result.preview_url);
			console.log(" ");	
			
		   	fs.appendFile("log.txt", myCommand);
		   	fs.appendFile("log.txt", "\r\n\r\n");
		   	fs.appendFile("log.txt", "Title: " + result.name + "\r\n");
			fs.appendFile("log.txt", "Artist: " + result.artists[0].name + "\r\n")
			fs.appendFile("log.txt", "Album: " + result.album.name + "\r\n");
			fs.appendFile("log.txt", "Link: " + result.preview_url + "\r\n");
			fs.appendFile("log.txt", "\r\n\r\n");
		}	
	});	
}
//====================================================================================
//OMDB Function
//=====================================================================================
function myOmdb() {

	var queryURL = "http://www.omdbapi.com/?t=" + myMovie + "&y=&plot=short&apikey=trilogy";
	
	if (myMovie === undefined) {
		queryURL = "http://www.omdbapi.com/?t=" + "Mr. NoBody" + "&y=&plot=short&apikey=trilogy";
	}

	request(queryURL, function(error, response, body) {
		
		var result = JSON.parse(body);

  		if (!error && response.statusCode === 200) {
  			console.log(" ");
			console.log("===========================================");
    		console.log(chalk.blue("The selected movie"));
    		console.log("===========================================");
    		console.log("Title: " + result.Title);
    		console.log("Released: " + result.Year);
    		console.log("Movie's rating is: " + result.imdbRating);
    		console.log("Rotten Tomatoes rating is: " + result.Ratings[1].Value);
    		console.log("Produced in: " + result.Country);
    		console.log("Language: " + result.Language);
    		console.log("Plot: " + result.Plot);
    		console.log("Actors: " + result.Actors);
    		console.log(" ");
			console.log(" ");

			fs.appendFile("log.txt", myCommand);
		   	fs.appendFile("log.txt", "\r\n\r\n");
		   	fs.appendFile("log.txt", "Title: " + result.Title+ "\r\n");
			fs.appendFile("log.txt", "Released: " + result.Year+ "\r\n");
			fs.appendFile("log.txt", "Rating: " + result.imdbRating+ "\r\n");
			fs.appendFile("log.txt", "Rotten Tomatoes: " + result.Ratings[1].Value+ "\r\n");
			fs.appendFile("log.txt", "Produced: " + result.Country+ "\r\n");
			fs.appendFile("log.txt", "Language: " + result.Language+ "\r\n");
			fs.appendFile("log.txt", "Plot: " + result.Plot+ "\r\n");
			fs.appendFile("log.txt", "Actors: " + result.Actors+ "\r\n");
			fs.appendFile("log.txt", "\r\n\r\n");	
  		}
  		
	});
} 


