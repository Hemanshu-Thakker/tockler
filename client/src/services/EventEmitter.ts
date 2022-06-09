import { Logger } from '../logger';

declare global {
    interface Window {
        electronBridge:any;
    }
}

console.log(window.electronBridge.onIpc());

const { electronBridge } = window as any;
const { invokeIpc, sendIpc, onIpc, removeListenerIpc } = electronBridge;

function send(name, ...args) {
    Logger.debug(`Send event: ${name}`);

    sendIpc(name, ...args);
}
function on(name, listener) {
    onIpc(name, listener);
}

function off(name, listener) {
    removeListenerIpc(name, listener);
}

export const EventEmitter = {
    send,
    on,
    off,
    emit: invokeIpc,
};
