import { Socket, io } from "socket.io-client";

declare global {
  var socket: Socket | undefined;
}

export const IoSocket =
  globalThis.socket ||
  io("https://realtime-docs-app-backend.onrender.com").connect();

if (process.env.NODE_ENV !== "production") {
  globalThis.socket = IoSocket;
}
