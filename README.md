# EventNexa

EventNexa is website running NodeJs on the backend that allows users to create, modify, join, and be alerted to events in their area.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Overview

This project is our final project for CSE 201 at Miami University. 

## Features
- Feature 1
- Feature 2
- Feature 3

## Prerequisites

NodeJS
MongoDB
Linux-based system

## Getting Started

### Installation

1. Clone the repository: `git clone https://github.com/Hamilt79/ServerTest.git`
2. Ensure you have the mongodb installed and configured 'https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/#std-label-install-mdb-community-ubuntu'
3. Navigate to the project directory: `cd ServerTest`

### Configuration

Redirect traffic sent to port 443 and 80 to port 3000.
This must be done due to many machines not being easily able to run NodeJs on those ports, and instead running on port 3000 by default.
This redirection can either be done manually or by running the setiptables.sh script each restart

## Usage

Snure mongodb is running at the appropriate address. Run 'npm start' in the base folder of the project to start the application. This will by default block further commands from running and output NodeJS logging information until you stop the command.
If start the server with 'npm start >> /dev/null &' it will run the program in the background. To stop it from running, run the killbackground.sh script. Note: Running this script will kill all active NodeJs applications, so if there is an
application that should be stopped please consider manually killing the correct process.

## License


