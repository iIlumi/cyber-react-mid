@ECHO OFF 
:: Inspired by @abhagsain https://gist.github.com/abhagsain 
:: https://gist.github.com/rveitch/84cea9650092119527bc#gistcomment-3040049

TITLE React setup

ECHO ==========================
ECHO REACT SETUP 
ECHO ============================
ECHO/
PAUSE
ECHO Please wait... Creating files and folders

ECHO/
if exist assets\NUL echo - assets folder already exists
if not exist assets\NUL (
    mkdir assets
    echo + assets folder creation: done.
)

ECHO/
if exist components\NUL echo - components folder already exists
if not exist components\NUL (
    mkdir components
    echo + components folder creation: done.
)

ECHO/
if exist HOC\NUL echo - HOC folder already exists
if not exist HOC\NUL (
    mkdir HOC
    echo + HOC folder creation: done.
)

ECHO/
if exist pages\NUL echo - pages folder already exists
if not exist pages\NUL (
    mkdir pages
    echo + pages folder creation: done.
)

ECHO/
if exist services\NUL echo - services folder already exists
if not exist services\NUL (
    mkdir services
    echo + services folder creation: done.
)

ECHO/
if exist util\NUL echo - util folder already exists
if not exist util\NUL (
    mkdir util
    echo + util folder creation: done.
)

ECHO/
if exist templates\NUL echo - templates folder already exists
if not exist templates\NUL (
    mkdir templates
    echo + templates folder creation: done.
)

ECHO/
if exist redux\NUL echo - redux folder already exists
if not exist redux\NUL (
    mkdir redux
    echo + redux folder creation: done.
)

ECHO/
ECHO Moving to redux folder
cd redux
::===
ECHO Creating SCSS Subfolders...
ECHO/
if exist actions\NUL echo - actions folder already exists
if not exist actions\NUL (
    mkdir actions
    echo + actions folder creation: done.
)

ECHO/
if exist reducers\NUL echo - reducers folder already exists
if not exist reducers\NUL (
    mkdir reducers
    echo + reducers folder creation: done.
)
ECHO/
if exist constants\NUL echo - constants folder already exists
if not exist constants\NUL (
    mkdir constants
    echo + constants folder creation: done.
)
::===
if exist configStore.js echo - configStore.js already exists
if not exist configStore.js (
    type nul >configStore.js
    ECHO + configStore.js created
)

ECHO/

ECHO base REACT structure created

(
ECHO  import {combineReducers, createStore} from 'redux';
ECHO/  
ECHO  const rootReducer = combineReducers({
ECHO/  
ECHO  }^)
ECHO/  
ECHO  const store = createStore(rootReducer^);  
ECHO/  
ECHO  export default store;
) > configStore.js

ECHO configStore setup done

PAUSE