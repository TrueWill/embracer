# embracer

MET Vampire the Masquerade character generator

Based on 2015 edition from By Night Studios

Some terms are copyrighted by or registered trademarks of CCP hf.
This tool is unofficial, and the author is not affiliated with the companies mentioned above.

## Live

Deployed to http://truewill-embracer.s3-website.us-east-2.amazonaws.com/

Currently deployment is manual, so the site may not reflect the latest changes.

## TODO

* STYLE
* Display Generation title
* Print / export (include Willpower and health levels)
* Improve test coverage
* Refactor
* Bloodlines - enable when select clan - list and charge Merit costs against total (clear on change)
* Add Lesser/Rare Clans - how to handle Rarity Merit costs? Also count against total Merits
* Automate deployment
* Use reselect library?
* Rituals
* Techniques (clear if change Generation)
* Elder Powers (clear if change Generation)
* No focus selected - should empty object
* Copyright/TM notice on app?
* Ask By Night Studios to add to their list of generators

## Contributing

### Standards

* [Prettier](https://prettier.io/) with single quotes
* [EditorConfig](http://editorconfig.org/)
* [Yarn](https://yarnpkg.com/en/)
* [Flux Standard Actions](https://github.com/acdlite/flux-standard-action)
* Jest/Enzyme tests (using it() alias for test())
* No ESLint warnings/errors
* No console warnings/errors
* Works in modern browsers (and IE 11)

## Acknowledgements

Built with [React](https://reactjs.org/) and [Redux](https://redux.js.org/) - thanks so much to Facebook, Dan Abramov, Mark Erikson, and all contributors!

Uses [Font Awesome](http://fontawesome.io) by Dave Gandy (v4, **not** v5).
