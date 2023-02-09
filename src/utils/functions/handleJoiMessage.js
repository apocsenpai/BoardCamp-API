import joiMessages from "../constants/joiMessages.js";

function handleJoiMessage(key) {
  return { "string.pattern.base": joiMessages[key] };
}

export default handleJoiMessage;
