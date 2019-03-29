#/bin/bash

docker run --name yymbdb \
-e POSTGRES_PASSWORD=postgres \
-e POSTGRES_USER=postgres \
-e POSTGRES_DB=yymbdb \
-p 5432:5432 \
-d postgres