/**
 * We use this method to build a message.
 * A message is actually an action or an effect, both of which share the same characteristics.
 */
export default (type, payload) => { return {type, payload}; };
