touch ../secret.env
secret_content="CLIENT_ID=''\nCLIENT_SECRET=''\nDEVICE_ID=''\nCALLBACK=''"
echo $secret_content >> ../secret.env

mkdir ../server/local_tokens