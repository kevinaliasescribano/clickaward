echo off
title ClickWard - THE GAME
cls
echo.
echo.    
echo ------------------------------------------------------------------------------
echo . Que deseas levantar [t]odo, [m]ongoDB, [n]ode, [g]ulp, [c]onsola mongoDB:  .
echo ------------------------------------------------------------------------------
:start
set /p answer= Seleccione opcion (t, m, n, g, c):

if "%answer%" EQU "t" (
	start iniciarMongoDB.bat
	start iniciarNodeJS.bat
	start iniciarGulp.bat
	exit
)
if "%answer%" EQU "m" (
	start iniciarMongoDB.bat
	exit
)
if "%answer%" EQU "n" (
	start iniciarNodeJS.bat
	exit
)
if "%answer%" EQU "g" (
	start iniciarGulp.bat
	exit
)
if "%answer%" EQU "c" (
	start abrirConsolaMongoDB.bat
	exit
)
echo.
echo [%answer%] no es una opcion valida por favor selecciona un modo (t, m, n, g, c)
echo ______________________________________________________________________________
goto start