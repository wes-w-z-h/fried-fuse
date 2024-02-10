#!/usr/bin/env bash
# exit on error
set -o errexit

bundle install
bundle exec rails db:migrate
# uncomment the follwing for initial build 
# bundle exec rails db:seed 