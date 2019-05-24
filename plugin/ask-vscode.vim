" Author: kizza <hello@keiranoleary.com>
" Description: Request code actions from Visual Studio Code

if get(s:, 'loaded')
  finish
endif
let s:loaded = 1

" Register remote plugin
let s:plugin_name = 'ask-vscode'
let s:plugin_root = fnamemodify(resolve(expand('<sfile>:p')), ':h:h')

call remote#host#RegisterPlugin('node', s:plugin_root . '/rplugin/' . s:plugin_name, [
  \ {'sync': v:null, 'name': 'AskVisualStudioCode', 'type': 'command', 'opts': {}},
  \ {'sync': v:null, 'name': 'AskVisualStudioCodeCallback', 'type': 'function', 'opts': {}},
  \ {'sync': v:null, 'name': 'AskVisualStudioCodeSelect', 'type': 'function', 'opts': {}},
  \ {'sync': v:null, 'name': 'PingVisualStudioCode', 'type': 'command', 'opts': {}},
  \ {'sync': v:null, 'name': 'TestAskVisualStudioCode', 'type': 'command', 'opts': {}},
  \ {'sync': v:null, 'name': 'TestPopup', 'type': 'command', 'opts': {}},
 \ ])
