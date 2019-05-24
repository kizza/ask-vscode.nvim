import { Buffer, NvimPlugin } from "neovim";
import {
  attempt,
  CodeActionRequest,
  CodeActionResponse,
  isCodeActionResponse,
  RequestType,
  Response,
  ResponseType
} from "./common";
import { LAST_CODE_ACTION_RESPONSE_KEY } from "./const";
import { test } from "./test/index.spec";
import { actionToPopupItem, vim } from "./vim";
import {
  changeWorkspace,
  executeAfterPing,
  pingVscode,
  sendToVscode
} from "./vscode";

const requestCodeAction = (plugin: NvimPlugin) => async (
  request: CodeActionRequest
) => {
  const { confirm, error, openPopupMenu, setStatus } = vim(plugin);

  return setStatus("Asking vscode...")
    .then(() => sendToVscode(request))
    .then((response: Response) => {
      if (isCodeActionResponse(response)) {
        return setStatus(response.status)
          .then(() =>
            plugin.nvim.setVar(
              LAST_CODE_ACTION_RESPONSE_KEY,
              JSON.stringify(response)
            )
          )
          .then(() => openPopupMenu(response.actions.map(actionToPopupItem)));
      }

      switch (response.type) {
        case ResponseType.WrongWorkspace:
          confirm("Change vscode to correct workspace?").then(yes => {
            if (yes) {
              changeWorkspace(request.rootPath)
                .then((response: Response) => setStatus(response.status))
                .then(() =>
                  executeAfterPing(
                    () => requestCodeAction(plugin)(request),
                    800
                  )
                )
                .catch(e => {
                  error("Vscode took too long", e);
                });
            }
          });
          break;
        default:
          setStatus(response.status);
      }
    })
    .catch((e: Error) => {
      setStatus(e.message);
      console.log("Error requesting code action", e);
    });
};

module.exports = (plugin: NvimPlugin) => {
  const { applyTextChanges, error, openPopupMenu, setStatus } = vim(plugin);

  plugin.setOptions({ dev: false, alwaysInit: false });

  plugin.registerCommand("AskVisualStudioCode", () =>
    plugin.nvim.command(
      'call AskVisualStudioCodeCallback(getcwd(), expand("%"), join(getline(1, "$"), "\n"), line("."), col("."), expand("<cword>"))'
    )
  );

  plugin.registerFunction("AskVisualStudioCodeCallback", (args: Buffer[]) => {
    const [rootPath, filePath, buffer, line, offset, word] = args.map(arg =>
      arg.toString()
    );

    const request = {
      type: RequestType.CodeAction,
      rootPath: rootPath,
      filePath: filePath,
      buffer: buffer,
      line: parseInt(line),
      offset: parseInt(offset),
      word: word
    } as CodeActionRequest;

    requestCodeAction(plugin)(request);
  });

  plugin.registerFunction("AskVisualStudioCodeSelect", (a: any) =>
    plugin.nvim
      .getVar(LAST_CODE_ACTION_RESPONSE_KEY)
      .then(value => {
        const lastResponse = JSON.parse(value.toString()) as CodeActionResponse;
        const index = parseInt(a.toString());
        const selectedAction = lastResponse.actions[index];
        return selectedAction && applyTextChanges(selectedAction.textChanges);
      })
      .catch(e => {
        error("Error responding to popup", e);
      })
  );

  //
  // Test
  //

  plugin.registerCommand("PingVisualStudioCode", () =>
    attempt(pingVscode, 5, 800)
      .then(() => setStatus("Got back pong"))
      .catch(() => setStatus("No pong"))
  );

  plugin.registerCommand("TestAskVisualStudioCode", () => {
    test(plugin);
  });

  plugin.registerCommand("TestPopup", async () => {
    const response: CodeActionResponse = {
      status: "",
      type: ResponseType.CodeAction,
      actions: [
        { title: "My first code action", textChanges: [] },
        { title: "My second code action", textChanges: [] }
      ]
    };
    return plugin.nvim
      .setVar(LAST_CODE_ACTION_RESPONSE_KEY, JSON.stringify(response))
      .then(() => openPopupMenu(response.actions.map(actionToPopupItem)));
  });
};
