// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Reservations (DATA)
// =============================================================

const reservations = [
  {
    customerName: "Groovy Colin",
    phoneNumber: "444-444-4444",
    customerEmail: "groovyorange@gmail.com",
    customerID: "24",
  },
  {
    customerName: "Groovy Luke",
    phoneNumber: "555-555-5555",
    customerEmail: "groovygreen@gmail.com",
    customerID: "32",
  },
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Basic route that sends the to the reserve.html page
app.get("/reserve.html", function (req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

// Basic route that sends the to the reserve.html page
app.get("/tables.html", function (req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

// Displays all reservations
app.get("/api/tables", function (req, res) {
  return res.json(reservations);
});

// Displays a single reservation, or returns false
app.get("/api/tables/:reservation", function (req, res) {
  var chosen = req.params.reservation;

  console.log(chosen);

  for (var i = 0; i < reservations.length; i++) {
    if (chosen === reservations[i].routeName) {
      return res.json(reservations[i]);
    }
  }

  return res.json(false);
});

// Create New Reseration - takes in JSON input
app.post("/api/tables", function (req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newReservation = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  // newReservation.routeName = newReservation.name.replace(/\s+/g, "").toLowerCase();

  console.log(newReservation);

  reservations.push(newReservation);

  res.json(newReservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});
