import { TinyEmitter } from "tiny-emitter";

const emitter = new TinyEmitter();

export const eventBus = {
	$on: (event: string, cb: (data?: any) => void) => emitter.on(event, cb),
	$once: (event: string, cb: (data?: any) => void) => emitter.once(event, cb),
	$off: (event: string, cb?: (data?: any) => void) => emitter.off(event, cb),
	$emit: (event: string, data: any) => emitter.emit(event, data),
};
