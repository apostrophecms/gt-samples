# Sample code for common asks

This project is intended as sample code to demonstrate certain features. You **can** fork this repo to start a project, but it is usually a better idea to apply the techniques seen here to your **own** project.

This project is based on the [starter-kit-essentials](https://github.com/apostrophecms/starter-kit-essentials) project, which is a good starting point if you don't want any extra code pre-built in the application. Whereas if you want a richer starting point, consider any of our other starter kits.

## Note on ESM versus commonjs

This code is in commonjs format (with `require` and `module.exports`) to accommodate ease of use in a client project that was built with that syntax. commonjs and ESM cannot be mixed and matched in a single project. So if you are incorporating these samples into a newer ESM-based project, just modify to use `import` and `export default { ... }` as needed.

## Running the project directly

To experiment with this project, `git clone` this repository and install its dependencies using `npm install`. Add an initial admin user with `node app @apostrophecms/user:add admin admin`.

## Running the project

Run `npm run dev` to build the Apostrophe UI and start the site up. The `dev` script will watch for saves in client-side CSS and Javascript and trigger a build and page refresh if they are detected. It will also restart the app when server-side code is saved.

## Features demonstrated

### "Snippets"

A common request: *"we'd like reusable chunks of content that can be inserted in more than one place around the site."*

This project achieves that by:

* Implementing a piece type module called `snippet` that contains an `area` field in which editors can create content by selecting "Snippets" from the admin bar, then clicking "New Snippet."

* Implementing a widget type module called `snippet-widget-type` which contains a `relationship` field, allowing the editor to choose an existing or new snippet to be displayed at any point in an area that includes `snippet` widgets in its configuration.

* Configuring the `snippet` widget as one of the choices in the `default-page` and `@apostrophecms/home-page` modules.

Note that like any widget, you can also reuse the snippet widget in other piece types, not just page types.

## You really want the docs

Right now, [all the juicy info is in the ApostropheCMS docs](https://docs.apostrophecms.org), so head over there and start reading! This boilerplate project is a fun introduction to the UI, but you'll want to know more to really try it out.

