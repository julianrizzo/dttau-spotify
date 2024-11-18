touch ../secret.env
secret_content="CLIENT_ID=''\nCLIENT_SECRET=''\nCALLBACK=''"
echo $secret_content >> ../secret.env

mkdir ../server/local_tokens