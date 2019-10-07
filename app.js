/**
 * The application entry point
 */

require('./app-bootstrap')

const config = require('config')
const _ = require('lodash')
const logger = require('./logger')
const MSM = require('mongo-scheduler-more')
const superagent = require('superagent')

const scheduler = new MSM(config.MONGODB_URI, {
  pollInterval: config.MONGO_SCHEDULER_POLL_INTERVAL
})
const schedulerAsync = Promise.promisifyAll(scheduler)

// all event names
const eventNames = []

/**
 * Process event on event trigger.
 * @param {Object} evt the event to process
 */
async function processEvent (evt) {
  const data = evt.data
  let request = superagent[data.verb](data.endpoint)
  if (data.headers) {
    request = request.set(data.headers)
  }
  if (data.verb !== 'get' && data.verb !== 'head' && data.payload) {
    request = request.send(data.payload)
  }
  // invoke request
  await request
}

// detect new events
async function detectNewEvents () {
  const evts = await schedulerAsync.listAsync({})
  _.forEach(evts, (ev) => {
    const name = ev.name
    if (!_.find(eventNames, (n) => n === name)) {
      // new event
      logger.info(`Found new event: ${JSON.stringify(ev, null, 4)}.`)
      eventNames.push(name)
      // listen on event trigger
      schedulerAsync.on(name, (evt) => {
        logger.info(`Process event: ${JSON.stringify(evt, null, 4)}.`)
        processEvent(evt)
          .then(() => logger.info(`Event of name ${evt.name} is processed successfully.`))
          .catch((e) => {
            logger.error(`There is error processing event of name ${evt.name}.`)
            logger.logFullError(e)
          })
      })
    }
  })
}

// detect new events periodically
setInterval(() => {
  logger.info('Start to detect new events.')
  detectNewEvents()
    .then(() => logger.info('Detect new events is run successfully.'))
    .catch((e) => {
      logger.error('There is error detecting new events.')
      logger.logFullError(e)
    })
}, config.POLL_NEW_EVENTS_INTERVAL)
