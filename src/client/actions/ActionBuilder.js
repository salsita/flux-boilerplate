export default function buildAction(type, payload) {
  return {
    type: type,
    payload: payload
  };
}
