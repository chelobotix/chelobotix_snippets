# GITLAB TOKEN RENEW

```shell
# first, check your current url for the remote
git config --get remote.origin.url

# then set it with the new token
git remote set-url origin 'https://UNCHANGED_USERNAME:YOUR_NEW_TOKEN_HERE@UNCHANGED_REPO_URL'

```
