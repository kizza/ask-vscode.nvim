import * as net from "net";
import {
  attempt,
  ChangeWorkspaceRequest,
  Request,
  RequestType,
  Response,
  ResponseType,
  wait
} from "./common";

let connected = false;

const createClient = () => {
  const client = new net.Socket();

  client.on("connect", () => {
    connected = true;
  });

  client.on("close", () => {
    connected = false;
  });

  return client;
};

export const pingVscode = () =>
  new Promise((resolve, reject) => {
    sendToVscode({ type: RequestType.Ping })
      .then((response: Response) => {
        if (response.type === ResponseType.Pong) {
          resolve();
        } else {
          reject();
        }
      })
      .catch(_ => reject());
  });

export const changeWorkspace = (rootPath: string) =>
  sendToVscode({
    type: RequestType.ChangeWorkspace,
    rootPath: rootPath
  } as ChangeWorkspaceRequest);

export const executeAfterPing = <T>(fun: () => Promise<T>, delay = 800) =>
  wait(delay).then(() => attempt(pingVscode, 10, 800).then(() => fun()));

export const sendToVscode = (message: Request): Promise<Response> =>
  new Promise((resolve, reject) => {
    const client = createClient();

    const rejected = (message: string, e?: Error) => {
      console.error("sendToVscode rejected:", message, e);
      reject(new Error(message));
    };

    client.connect(5004, "127.0.0.1", () => {
      client.write(JSON.stringify(message));
    });

    client.on("data", (buffer: Buffer) => {
      try {
        console.log("Got data", buffer.toString());
        const data = JSON.parse(buffer.toString());
        console.log("Parsed data", data);
        resolve(data);
      } catch (e) {
        rejected("Error parsing vscode response", e);
      } finally {
        client.destroy();
      }
    });

    client.on("timeout", () => {
      rejected("Connection timed out");
    });

    client.on("error", (e: Error) => {
      connected
        ? rejected("An error occurred", e)
        : rejected(
            "Could not connect to vscode (is it open, with the server plugin running?)"
          );
    });
  });
