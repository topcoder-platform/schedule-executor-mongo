/**
 * The configuration file.
 */

module.exports = {
  LOG_LEVEL: process.env.LOG_LEVEL || 'debug',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/autopilotscheduler',
  // poll interval used by mongo-scheduler-more lib to check event trigger
  MONGO_SCHEDULER_POLL_INTERVAL: process.env.MONGO_SCHEDULER_POLL_INTERVAL
    ? Number(process.env.MONGO_SCHEDULER_POLL_INTERVAL) : 5000, // 5 seconds
  // interval used by this executor to check new events
  POLL_NEW_EVENTS_INTERVAL: process.env.POLL_NEW_EVENTS_INTERVAL
    ? Number(process.env.POLL_NEW_EVENTS_INTERVAL) : 6000 // 6 seconds
}
