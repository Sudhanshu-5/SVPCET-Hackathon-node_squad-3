var express = require("express");
var mongoose = require("mongoose");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var bodyParser = require("body-parser");

var middleware = require("./middleware");
var methodOverride = require("method-override");

var app = express();
require('dotenv').config(); //for env variables



