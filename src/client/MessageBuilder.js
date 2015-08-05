/**
 * We use this method to build a message.
 * A message is actually an action or an effect. It has the same characteristics.
 */
export default (type, payload) => { return {type, payload}; };
