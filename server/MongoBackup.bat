SET backuppath= ..\backups\KarakExpress_%date:~0,2%_%date:~3,2%_%date:~6,4%_%time:~0,2%_%time:~3,2%_%time:~6,4%
"C:\Program Files\MongoDB\Server\3.0\bin\mongodump.exe" --db KarakExpress --out %backuppath%
echo "Backup Done !"