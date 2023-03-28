"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = async (messenger, topic, message) => {
    console.log("MESSAGE:");
    console.log(message);
    await messenger.submitRequest(message, topic.toString());
};
//# sourceMappingURL=messaging.js.map