" Style the buffer
setlocal signcolumn=no
setlocal sidescrolloff=0

" Defaults
let b:selectedIndex = ""
let b:isClosed = 0

function! popupmenu#select_item()
  if pumvisible()
    call feedkeys("\<C-y>")
    if !empty(v:completed_item)
      echo v:completed_item
      let b:selectedIndex = v:completed_item['user_data']
    endif
  endif
  call popupmenu#close_menu()
endfunction

function! popupmenu#close_menu()
  call feedkeys("\<esc>")
endfunction

function! popupmenu#on_buffer_leave()
  call popupmenu#ensure_removed()
endfunction

function! popupmenu#on_insert_leave()
  call AskVisualStudioCodeSelect(b:selectedIndex)
  call popupmenu#ensure_removed()
endfunction

function! popupmenu#ensure_removed()
  if (b:isClosed != 1)
    let b:isClosed = 1
    execute 'bdelete!'
  endif
endfunction

" Mappings
mapclear <buffer>
inoremap <buffer> <expr> <CR> popupmenu#select_item()
imap <buffer> <C-y> <CR>
noremap <buffer> <esc> popupmenu#close_menu()
inoremap <buffer> <Up> <C-p>
inoremap <buffer> <Down> <C-n>
inoremap <buffer> k <C-p>
inoremap <buffer> j <C-n>

" Events
autocmd BufLeave <buffer> :call popupmenu#on_buffer_leave()
autocmd InsertLeave <buffer> :call popupmenu#on_insert_leave()

" The pum completion function from global items
function! popupmenu#complete_func(findstart, base)
  if a:findstart
    return 1
  else
    return json_decode(g:vim_ask_vscode_popup_items)
  endif
endfunction

" Set the pum complettion function (and some defaults)
setlocal completefunc=popupmenu#complete_func
setlocal completeopt+=menuone

" Open the pum immediately
call feedkeys("i\<C-x>\<C-u>")
