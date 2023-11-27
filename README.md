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

NodeJS (Version 20.10.0)

MongoDB (Version 7.0)

Ubuntu (Version 22.04) Note: Running this in a virtual machine does *not* seem to work correctly. I could not get the correct version of MongoDB to install due to some weird architecture incompatibility. There were some solutions I found but none of them worked with my setup, since it required disabling certain things such as Hyper-V. 

npm (10.1.0)

## Getting Started

### Installation

1. Install git if it's not already installed. This command is `sudo apt install git`
   
     ![image](https://github.com/Hamilt79/EventNexa/assets/145792745/4a89561c-bf0f-4e24-933e-bdfde0f78e96)
2. Use git to clone this repo. This command is `git clone https://github.com/Hamilt79/EventNexa.git`
   
     ![image](https://github.com/Hamilt79/EventNexa/assets/145792745/5881c377-ad1c-47e4-98cb-d5e200636d87)
3. CD into the EventNexa directory. This command is `cd EventNexa`

4. Install nvm. The command for this is `wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash`. Afterwards restart your terminal.

    ![image](https://github.com/Hamilt79/EventNexa/assets/145792745/05f4bcf9-1f3f-4793-b31a-9afc00ba84a9)
5. Install npm. The command for this is `sudo apt install npm`

   ![image](https://github.com/Hamilt79/EventNexa/assets/145792745/96a314f2-96ef-455a-9f8e-6d5fb2868287)
6. Install Nodejs. The command for this is `nvm install 20`

   ![image](https://github.com/Hamilt79/EventNexa/assets/145792745/53923a24-4a4b-4cef-b7c6-fbf4207dc2ad)
7. Update npm. The command for this is `npm install npm@10.1.0`

   ![image](https://github.com/Hamilt79/EventNexa/assets/145792745/b8568826-b322-4bf0-96b6-9b2163a69351)
8. Install MongoDB 7.0 Community Edition. The instructions for this can be found at `https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/#std-label-install-mdb-community-ubuntu`

### Configuration

1. Redirect traffic sent to port 443 and 80 to port 3000.
    This must be done due to many machines not being easily able to run NodeJs on those ports, and instead running on port 3000 by default.
    This redirection can either be done manually or by running the setiptables.sh script each restart. 
    This will allow http and https traffic to be accepted by the server. Otherwise the user will have to specify they wish to access port 3000 (ex. eventnexa.tech:3000/index.html)
   
    ![image](https://github.com/Hamilt79/EventNexa/assets/145792745/85f8cd0c-97c4-46d2-8c14-09bad7799b7f)

2. Change the domainName static variable in public/shared/network.js to match your own domain name. (if testing you can set it to localhost or your ip address)

    ![image](https://github.com/Hamilt79/EventNexa/assets/145792745/2fd6ac42-8f6c-4243-8a72-9076e8c4100b)
3. Start the Mongod service. You can do this manually `sudo systemctl start mognod` or with the provided script by running `./startmongodb`

    ![image](https://github.com/Hamilt79/EventNexa/assets/145792745/a0d841dd-3cd4-4bc3-8a7c-efe76a5e4ecb)
4. Fill in the email and password of the email account you wish to use to email notify users. This field can be found in routes/route-util/EmailNotif.js

   ![image](https://github.com/Hamilt79/EventNexa/assets/145792745/2e4c8531-1477-4344-9b27-8cc83bb2a0ca)
5. Navigate to the base EventNexa folder and run `npm start` to start the server.


### Usage

Ensure mongodb is running locally (running a cloud version of mongodb would be possible, but you would need to change the mongodb server url in routes/mongodb/mongodb.js).
You can start the local mongodb server by running startmongodb.sh.
Run 'npm start' in the base folder of the project to start the application. This will by default block further commands from running and output NodeJS logging information until you stop the command.
If you start the server with 'npm start >> /dev/null &' it will run the program in the background. To stop it from running, run the killbackground.sh script. 
Note: Running this script will kill all active NodeJs applications, so if there is an application that should be not stopped please consider manually killing the correct process.

