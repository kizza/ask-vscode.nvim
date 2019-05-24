# Use the "lightbulb" action menu (think Visual Studio Code) within vim

![Vim example](https://raw.githubusercontent.com/kizza/ask-vscode.nvim/master/images/vim-example.png)

# Overview

This plugin will ask a running instance of Visual Studio Code which code actions it _would suggest_ based on your cursor position within a buffer.  It will then present the response in a nice popup menu and execute the selected action.

Examples include...

 - Auto importing a required module
 - Infering a type from it's usage
 - Removing unrequired imports
 - ...whatever Visual Studio Code would do


Visual Studio Code             |  Vim
:-------------------------:|:-------------------------:
![Visual Studio Code example](https://raw.githubusercontent.com/kizza/ask-vscode.nvim/master/images/vscode-example.png) | ![Vim example](https://raw.githubusercontent.com/kizza/vim-ask-vscode/master/images/vim-example.png)

# Why

I very much prefer as primary editor (numerous reasons).  However, Visual Studio Code's code action items are super useful and _seem to be_ consistently ahead of the curve. I wanted to use them within vim.

Goals
- Treat Visual Studio Code as an external language server protocol.
- Benefit from the growing Visual Studio Code community from within vim
- Be language agnostic (ie. don't need to configure numerous language servers within vim - just ask vscode)


# How

- This plugin sends a request to to a running instance of vscode, providing all the deail to execute it's code action providers
- The response is returned and displayed within a popup
- Once selected the plugin knows how to execute vscode's `code action` implementation (provided as a json payload)

# Get started

### Requirements
1. The [latest version of neovim](https://github.com/neovim/neovim/wiki/Installing-Neovim) (which provides the "popup window" functionaity)
```
brew install --HEAD neovim
```
2. The [neovim node-client](https://github.com/neovim/node-client) remote plugin host
```
npm install -g neovim
```
3. The [ask vscode server](https://marketplace.visualstudio.com/items?itemName=keiran-oleary.ask-vscode-sever) Visual Studio Code extension
4. This plugin
```
if has('nvim')
  Plug 'kizza/ask-vscode.nvim'
endif
```

### Finally
Map a keybinding to execute this plugin within vim
```
nnoremap <silent> <Leader>a :AskVisualStudioCode<CR>
```

# Next steps

This plugin is the very definition of `beta`.  I wrote it familiarise myself with nvim's remote plugin functionality. I personally find it useful and will continue to work on it.

On my list to do is...
- Improve the documentation, installation and setup process (for other operating systems, other vim package managers etc)
- Expand the code action functionality (ie. currently it does not implement spelling changes)
- General flurry of improvements

All ideas and support are welcome.  If you find this interesting or useful, i'd love you to have a play - and let me know how it goes.
