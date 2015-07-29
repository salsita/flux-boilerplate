export default function buildMessage(type, payload) {
  return {
    type: type,
    payload: payload
  };
}
