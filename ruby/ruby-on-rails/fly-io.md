# Fly.io

## Fragment 1: github

Fork the go-example repository to your GitHub account.
Clone the new repository to your local machine.
Run fly launch from within the project source directory to create a new app and a fly.toml configuration file. Type N when fly launch asks if you want to set up databases and N when it asks if you want to deploy.
Still in the project source directory, get a Fly API deploy token by running "fly tokens create deploy -x 999999h" Copy the output.
Go to your newly-created repository on GitHub and select Settings.
Under Secrets and variables, select Actions, and then create a new repository secret called FLY_API_TOKEN with the value of the token from step 4.
Back in your project source directory, create .github/workflows/fly.yml with these contents:

name: Fly Deploy
on:
  push:
    branches:
      - main
jobs:
  deploy:
    name: Deploy app
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: superfly/flyctl-actions/setup-flyctl@master
      - run: flyctl deploy --remote-only
        env:
          FLY_API_TOKEN: ${{ secrets.FLY_API_TOKEN }}
          
          
          

Commit your changes and push them up to GitHub. You should be pushing two new files: fly.toml, the Fly Launch configuration file, and fly.yml, the GitHub action file.

Then the magic happens - The push triggers a deploy, and from now on whenever you push a change, the app will automatically be redeployed.

If you want to watch the process take place, head to the repository and select the Actions tab, where you can view live logs of the commands running.

## Fragment 2: Commands

```shell
# postgres
fly postgres connect -a rails-genius-db

# deploy
fly deploy

# action key
fly tokens create deploy -x 999999h

# Rails console
fly ssh console --pty -C "/rails/bin/rails console"

#regular terminal
fly ssh console

# Postgress DB list
fly postgres list

# Postgress Snapshot
fly volumes list -a rails-genius-db

# Set MASTERKEY
fly secrets set RAILS_MASTER_KEY=$(cat config/master.key)

# Machine Start
fly machine start

# Redis Cli
fly redis connect


```

