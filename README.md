# Topcoder Autopilot Event Executor

It periodically detects new events, and listens on events trigger.

## Prerequisites

- NodeJS (v10)
- Mongodb 4.2

## Configuration

Configuration for the application is at `config/default.js`.
The following parameters can be set in config file or in env variables:

- LOG_LEVEL: the log level
- MONGODB_URI: Mongo DB URI
- MONGO_SCHEDULER_POLL_INTERVAL: poll interval used by mongo-scheduler-more lib to check event trigger
- POLL_NEW_EVENTS_INTERVAL: interval used by this executor to check new events

## Local Deployment

- Install dependencies `npm install`
- Run lint `npm run lint`
- Run lint fix `npm run lint:fix`
- Start app `npm start`
