import { Buffer, NvimPlugin } from "neovim";
import { CodeAction, promiseSerial, TextChange } from "./common";
import { POPUP_MENU_ITEMS } from "./const";
import { CharacterStyle, PopupItem, Vim } from "./models";

const { assign } = Object;

const escape = (text: string) =>
  text.replace(/\"/g, '\\"').replace(/\n/g, "\\n");

const execute = (keystrokes: string) => `execute 'normal! ${keystrokes}'`;

export const actionToPopupItem = (
  action: CodeAction,
  index: number
): PopupItem => ({
  word: action.title,
  user_data: index
});

export const vim = (plugin: NvimPlugin): Vim => {
  const log = (message: string) => console.log(message);

  const setStatus = (message: string) =>
    plugin.nvim.command(`echo "${message}"`);

  const error = (message: string, ...rest: any[]) => {
    console.error(message, ...rest);
    setStatus(message);
  };

  const getBuffer = () =>
    plugin.nvim.commandOutput('echo join(getline(1, "$"), "\n")');

  const confirm = (question: string): Promise<boolean> =>
    plugin.nvim
      .commandOutput(`echo confirm("${escape(question)}", "&Yes\n&No", 1)`)
      .then((response: string) => response.split("\n").pop() === "1");

  const getCharacterStyles = (): Promise<CharacterStyle> =>
    Promise.resolve({ letter: "$", fg: "blue" } as CharacterStyle)
      .then(context =>
        plugin.nvim
          .commandOutput(
            "echo strcharpart(strpart(getline('.'), col('.') - 1), 0, 1)"
          )
          .then((letter: string) => assign({}, context, { letter }))
      )
      .then(context =>
        plugin.nvim
          .commandOutput('echo synIDattr(synID(line("."),col("."),1),"fg")')
          .then((fg: string) => assign({}, context, { fg }))
      )

  const openPopupMenu = async (items: PopupItem[]) => {
    const styles = await getCharacterStyles();
    const buffer = (await plugin.nvim.createBuffer(false, true)) as Buffer;

    await plugin.nvim.setVar(POPUP_MENU_ITEMS, JSON.stringify(items));

    await buffer.setLines(styles.letter, {
      start: 0,
      end: -1,
      strictIndexing: false
    });

    await plugin.nvim.openWindow(buffer, true, {
      relative: "cursor",
      row: 0,
      col: 0,
      width: 1,
      height: 1
    });

    await plugin.nvim.command(
      `set filetype=popupmenu|syn match vscodecontext "."|hi vscodecontext cterm=underline ctermfg=${
        styles.fg
      }`
    );
  };

  const confirmTextChange = async (action: CodeAction) => {
    const { confirm, applyTextChanges } = vim(plugin);
    const { textChanges } = action;
    const { start, end } = textChanges[0];
    const info = ` (${start.line}:${start.offset}, ${end.line}:${
      end.offset
    }) x ${textChanges.length}`;

    return confirm(`${action.title}${info}`).then(yes => {
      if (yes) {
        applyTextChanges(action.textChanges);
      }
    });
  };

  const applyTextChanges = (textChanges: TextChange[]) =>
    promiseSerial(
      textChanges.reverse().map(textChange => () => applyTextChange(textChange))
    );

  const applyTextChange = (textChange: TextChange) => {
    const { start, end, newText } = textChange;
    const sameLine = start.line === end.line;
    const sameOffset = start.offset === end.offset;

    if (sameLine && sameOffset) {
      return insertText(textChange);
    } else if (newText === "") {
      return deleteText(textChange);
    } else if (newText !== "") {
      return updateText(textChange);
    } else {
      return setStatus("Action is not yet supported :(");
    }
  };

  const copyText = (text: string): Promise<void> =>
    plugin.nvim.command(`let @v = "${escape(text)}"`);

  const positionCursor = (x: number, y: number): Promise<number> =>
    plugin.nvim
      .commandOutput(`call cursor(${x}, ${y})|echo col(".")`)
      .then(value => parseInt(value));

  const withinPasteMode = (command: string) =>
    plugin.nvim
      .command("setlocal paste")
      .then(() => plugin.nvim.command(command))
      .then(() => plugin.nvim.command("setlocal nopaste"));

  const insertText = ({ start, newText }: TextChange) =>
    positionCursor(start.line, start.offset).then(async (column: number) => {
      // _if_ the cursor position is 10, 7 but text only goes to 10, 6... we need to append rather than insert
      const insertKey = start.offset === column ? "i" : "a";
      const pasteText = `call feedkeys("${insertKey}\\<C-r>v\\<esc>")`;
      console.log(`insertWithinLine ${pasteText}`);
      return copyText(newText).then(() => withinPasteMode(pasteText));
    });

  const updateText = ({ start, end, newText }: TextChange) => {
    const setCursor = `call cursor(${start.line - 0}, ${start.offset})`;
    const copyText = `let @v = "${escape(newText)}"`;
    const selectMotion = "v";
    const moveDownBy = end.line - start.line;
    const moveRightBy = end.offset - 1 - start.offset;
    const pasteText = `call feedkeys("i\\<C-r>v\\<esc>")`;

    const keystrokes = [
      selectMotion,
      moveDownBy > 0 ? `${moveDownBy}j` : "", // Move down
      moveDownBy > 0 ? "0" : "", // Reset left
      moveRightBy > 0 ? `${moveRightBy}l` : "", // Move right
      "d"
    ].filter(Boolean);

    const executeKeystrokes = execute(keystrokes.join(""));
    const command = `${setCursor}|${copyText}|${executeKeystrokes}|${pasteText}`;
    console.log(`updateText ${command}`);
    return plugin.nvim.command(command);
  };

  const deleteText = ({ start, end }: TextChange) => {
    const sameLine = start.line === end.line;
    let moveDownBy = end.line - start.line;
    let moveRightBy = end.offset - 1 - start.offset;
    let selectMotion = "v";
    let goToPreviousLine = false;

    // If end of motion is at 1, don't do down that line
    if (
      (!sameLine && end.offset === 1) ||
      (!sameLine && start.offset === end.offset)
    ) {
      selectMotion = "V";
      moveDownBy--;
    }

    // If we are moving down, reduce the move right
    if (moveDownBy > 0) {
      if (end.offset > 3) {
        moveRightBy = end.offset - 2;
      } else {
        moveRightBy = 0;
        goToPreviousLine = true;
      }
    }

    const keystrokes = [
      selectMotion,
      moveDownBy > 0 ? `${moveDownBy}j` : "", // Move down
      moveDownBy > 0 ? "0" : "", // Reset left
      moveRightBy > 0 ? `${moveRightBy}l` : "", // Move right
      goToPreviousLine === true ? "k$" : "",
      "d"
    ].filter(Boolean);

    const setCursor = `call cursor(${start.line - 0}, ${start.offset})`;
    const deleteText = execute(keystrokes.join(""));
    const command = `${setCursor}|${deleteText}`;
    console.log(`deleteWitinLine ${command}`);
    return plugin.nvim.command(command);
  };

  return {
    log,
    error,
    openPopupMenu,
    setStatus,
    getBuffer,
    confirm,
    confirmTextChange,
    applyTextChanges,
    insertText,
    deleteText
  };
};
