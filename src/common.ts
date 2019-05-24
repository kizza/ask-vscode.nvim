export const attempt = (promise: any, attempts: number, delay: number = 0) =>
  new Promise((resolve, reject) => {
    const retry = (count: number) => {
      promise()
        .then(resolve)
        .catch(() => {
          if (count === 0) {
            reject();
          } else {
            wait(delay).then(() => retry(count - 1));
          }
        });
    };

    retry(attempts);
  });

export const wait = (timeout: number) =>
  new Promise((resolve, _) => {
    setTimeout(resolve, timeout);
  });

export const promiseSerial = (funcs: (() => Promise<any>)[]) =>
  funcs.reduce(
    (promise: Promise<any>, func: () => Promise<any>) =>
      promise.then(result =>
        func().then(() => wait(1).then(Array.prototype.concat.bind(result)))
      ),
    Promise.resolve([])
  );

export interface Request {
  type: RequestType;
}

export enum RequestType {
  CodeAction = "CODE_ACTION",
  ChangeWorkspace = "CHANGE_WORKSPACE",
  Ping = "PING"
}

export interface CodeActionRequest extends Request {
  rootPath: string;
  filePath: string;
  buffer: string;
  line: number;
  offset: number;
  word: string;
}

export interface ChangeWorkspaceRequest extends Request {
  rootPath: string;
}

export interface Response {
  status: string;
  type?: ResponseType;
}

export enum ResponseType {
  CodeAction = "CODE_ACTION",
  WrongWorkspace = "WRONG_WORKSPACE",
  Pong = "PONG"
}

export interface CodeActionResponse extends Response {
  type: ResponseType.CodeAction;
  actions: CodeAction[];
}

export interface CodeAction {
  title: string;
  textChanges: TextChange[];
}

export const isCodeActionResponse = (
  response: Response | CodeActionResponse
): response is CodeActionResponse => response.type === ResponseType.CodeAction;

export interface TextChange {
  start: TextChangePosition;
  end: TextChangePosition;
  newText: string;
}

export interface TextChangePosition {
  line: number;
  offset: number;
}
