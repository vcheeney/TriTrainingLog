n=1
SLEEP=5
MAX_ATTEMPTS=10

until [ "$n" -ge $MAX_ATTEMPTS ]
do
   echo "Trying to run the migration... (Attempt $n/$MAX_ATTEMPTS)";
   exec 2> /dev/null
   npx prisma migrate dev &&
      echo "Migration succeeded! 🎉" &&
      break;
   exec 2>&1
   n=$((n+1));
   echo "Migration failed, retrying in $SLEEP seconds...";
   sleep $SLEEP;
done