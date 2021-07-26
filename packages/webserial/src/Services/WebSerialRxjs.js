import {interval, Subject, from}  from 'rxjs';
import {map, takeUntil, concatMap, sample, switchMap, filter} from 'rxjs/operators';

class LineBreakTransformer {
    constructor() {
        // A container for holding stream data until a new line.
        this.chunks = "";
    }

    transform(chunk, controller) {
        // Append new chunks to existing chunks.
        this.chunks += chunk;
        // For each line breaks in chunks, send the parsed lines out.
        const lines = this.chunks.split("\r\n");
        this.chunks = lines.pop();
        lines.forEach((line) => controller.enqueue(line));
    }

    flush(controller) {
        // When the stream is closed, flush any remaining chunks out.
        controller.enqueue(this.chunks);
    }
}

class WebSerialRxjs {
    constructor() {
        console.log('constructor')
        this.port = null
        this.reader = null
        this.readableStreamClosed = null
        this.writer = null
        this.writableStreamClosed = null
        this.isConnected = false
    }

    connect = async () => {
        // ESP32 vendorId and productId
        // const filter = { usbVendorId: 0x10c4, usbProductId: 0xea60 };
        this.port = await navigator.serial.requestPort({
            // filters: [filter],
        });

        const baudRate = 11500; // ESP32 Baud Rate
        const flowControl = "hardware"
        await this.port.open({baudRate, flowControl});
    };

    disconnect = async () => {
        this.reader.cancel();
        await this.readableStreamClosed.catch(() => {
            /* Ignore the error */
        });
        this.writer.close();
        await this.writableStreamClosed;
        await this.port.close();
    };

    getReaderStream = () => {
        const textDecoder = new TextDecoderStream();
        this.readableStreamClosed = this.port.readable.pipeTo(textDecoder.writable);
        this.reader = textDecoder.readable
            .pipeThrough(new TransformStream(new LineBreakTransformer()))
            .getReader();

        return {
            reader: this.reader,
            readableStreamClosed: this.readableStreamClosed,
        };
    }

    getWriterStream = () => {
        const textEncoder = new TextEncoderStream();
        this.writableStreamClosed = textEncoder.readable.pipeTo(this.port.writable);
        this.writer = textEncoder.writable.getWriter();

        return {
            writer: this.writer,
            writableStreamClosed: this.writableStreamClosed,
        };
    }

    monitor = () => {
        const destroy = new Subject();
        return interval(1).pipe(
            concatMap(() =>
                from(this.reader.read()).pipe(
                    map(({value, done}) => {
                        if (done) {
                            destroy.next();
                            destroy.complete();
                            this.reader.releaseLock();
                            return null;
                        }

                        return value;
                    })
                )
            ),
            takeUntil(destroy.asObservable())
        );
    };

    connectHandler = async () => {
        if (this.isConnected === false) {
            await this.connect();

            this.isConnected = true;

            this.getReaderStream();
            this.getWriterStream();
        }
    }

    stream = async () => {
        if (this.isConnected) {
            console.info('is connected')
            return this.monitor()
        }

        await this.connect();
        this.isConnected = true;
        this.getReaderStream();
        this.getWriterStream();
        return this.monitor();
    }

    disconnectHandler = async () => {
        if (!this.isConnected) {
            return;
        }

        await this.disconnect();
        this.isConnected = false;
        // portLogsElement.innerHTML = "";
    };

    writeHandler = async (msg) => {
        if (!this.isConnected) {
            return;
        }
        await this.writer.write(msg + "\n");
    };
}

export default WebSerialRxjs;


// const serialrxjs = new WebSerialRxjs();
// serialrxjs.connect();
// serialrxjs.disconnect();
// serialrxjs.getReaderStream();
// serialrxjs.getWriterStream();
// serialrxjs.monitor();
// serialrxjs.connectHandler();
// serialrxjs.disconnectHandler();
// serialrxjs.writeHandler();


// const serialrxjs = new WebSerialRxjs();
// connectButton.addEventListener("click", async () => serialrxjs.connectHandler());
// disconnectButton.addEventListener("click", async () => serialrxjs.disconnectHandler());
// writeButton.addEventListener("click", async () => serialrxjs.disconnectHandler('GetMap'));
// loggerButton.addEventListener("click", async () => {
//     const stream = await serialrxjs.stream()
//     stream
//         .pipe(filter(message => message.includes("TMAP")))
//         .subscribe({
//             next: (message) => {
//                 console.log(message,'message')
//             },
//             complete: () => {
//                 console.log("[readLoop] DONE");
//             },
//         })
//
// });