# EventNexa

EventNexa is website running NodeJs on the backend that allows users to create, join, and be alerted to events in their area.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)

## Overview

This project is our final project for CSE 201 at Miami University. 

## Features
- User Posting
- User Joining
- Event Searching
- Location Filtering
- Waitlist
- Event Attendee Cap
- Email notification
- Time Based Events 
- Event Analytics

## Prerequisites

Any version mismatch from the ones described are not guaranteed to be supported.

NodeJS (Version 12.22.9)
MongoDB (Version 7.0)
Ubuntu (Version 22.04)
npm (10.1.0)

## Getting Started

### Installation

1. Clone the repository: `git clone https://github.com/Hamilt79/EventNexa.git`
2. Ensure you have the mongodb installed and configured 'https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/#std-label-install-mdb-community-ubuntu'
3. Ensure you have installed Nodejs (v20.9.0) as well as npm (v10.1.0)
4. Navigate to the project directory: `cd EventNexa`
5. Use npm to install mongod (v2.0.0) through npm install mongod

### Configuration

1. Redirect traffic sent to port 443 and 80 to port 3000.
    This must be done due to many machines not being easily able to run NodeJs on those ports, and instead running on port 3000 by default.
    This redirection can either be done manually or by running the setiptables.sh script each restart. 
    This will allow http and https traffic to be accepted by the server. Otherwise the user will have to specify they wish to access port 3000 (ex. eventnexa.tech:3000/index.html)
2. Change the domainName static variable in public/shared/network.js to match your own domain name. (if testing you can set it to localhost or your ip address)

### Usage

Ensure mongodb is running locally (running a cloud version of mongodb would be possible, but you would need to change the mongodb server url in routes/mongodb/mongodb.js).
You can start the local mongodb server by running startmongodb.sh.
Run 'npm start' in the base folder of the project to start the application. This will by default block further commands from running and output NodeJS logging information until you stop the command.
If you start the server with 'npm start >> /dev/null &' it will run the program in the background. To stop it from running, run the killbackground.sh script. 
Note: Running this script will kill all active NodeJs applications, so if there is an application that should be not stopped please consider manually killing the correct process.

