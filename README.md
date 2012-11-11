# Github API Client

This repo serves as a starting point for building a client-side application
that requires authenticated access to the [Github API](http://developer.github.com/).

Uses Ruby [Sinatra](http://www.sinatrarb.com/) for minimal server-side
functionality. Ideal for deploying to [Heroku](http://heroku.com).

## Getting started

Clone (don't Fork) this repo into a local folder for your application (coolapp):

    git clone git://github.com/joshuaflanagan/github_client_app.git coolapp

Configure your Github application keys:

1. [Register](https://github.com/settings/applications) your application with Github
2. Create your settings file

      cp .settings.sample .settings

3. Edit .settings to include your application's Client ID and Client Secret, as
shown on Github.

Run the application. The default page will have a link to sign in to Github.
This will authenticate the user via OAuth. If it is sucessful, the user will
be redirected back to the homepage, and their access token will be available
in javascript as `user.token`.
