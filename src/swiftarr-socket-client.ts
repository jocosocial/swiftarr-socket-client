#!/usr/bin/env ts-node

import ReconnectingWebSocket from "reconnecting-websocket";
import {default as WebSocket} from 'ws';

if (process.argv.length !== 4) {
    console.error('Usage: node krakentalk_listener.js <server_url> <token>');
    process.exit(1); // Exit with an error code
}

// Extract the command line arguments
const serverUrl = process.argv[2];
const token = process.argv[3];

const authHeaders = {
    authorization: `Bearer ${token}`,
};

const wsUrl = `${serverUrl}/api/v3/notification/socket`;
console.log(wsUrl);


function WebSocketConstructor(options: { headers: { authorization: string; }; }) {
    return class extends WebSocket {
        constructor(url: string | URL, protocols: string | string[]) {
            super(url, protocols, options);
        }
    };
}

const socket = new ReconnectingWebSocket(wsUrl, [], {
    WebSocket: WebSocketConstructor({
        headers: authHeaders,
    }),
    connectionTimeout: 10000,
    maxRetries: 20,
    minReconnectionDelay: 10000,
    maxReconnectionDelay: 30000,
    reconnectionDelayGrowFactor: 2,
});

socket.addEventListener('open', event => {
    console.log('Socket Open');
});

socket.addEventListener('close', event => {
    console.log('Socket Close');
});

socket.addEventListener('message', event => {
    console.log('Message');
    console.log(event.data);
});

console.log(socket.readyState);
