# embracer

MET Vampire the Masquerade character generator

Based on 2015 edition from By Night Studios

Some terms are copyrighted by or registered trademarks of CCP hf.
This tool is unofficial, and the author is not affiliated with the companies mentioned above.

## Live

Deployed to http://truewill-embracer.s3-website.us-east-2.amazonaws.com/

Currently deployment is manual, so the site may not reflect the latest changes.

## To Do

* Improve styling/responsiveness
* Print / export (include Willpower and health levels; display generation title)
* Improve test coverage
* Rituals
* Techniques (clear if change Generation)
* Elder Powers (clear if change Generation)
* Repeated Skills (Crafts, etc.)
* Certain Merits (such as Thaumaturgic Expertise) can be purchased multiple times
* Setting-specific Merits/Flaws/Backgrounds
* True Brujah cannot purchase Empathy and pay double XP for dots of Morality
* Premascine can learn Necromancy: Mortis Path as out-of-clan
* Volgirre can learn Vicissitude out-of-clan (up to 2 dots)
* Carpathians can learn Protean out-of-clan and cannot take the Szlachta merit
* Koldun additional Thaumaturgy path (odd costs)
* Angellis Ater choice of in-clan discipline
* Copyright/TM notice on app?
* Ask By Night Studios to add to their list of generators

## Contributing

### Standards

* [Prettier](https://prettier.io/) with single quotes
* [EditorConfig](http://editorconfig.org/)
* [Yarn](https://yarnpkg.com/en/)
* [Flux Standard Actions](https://github.com/acdlite/flux-standard-action)
* [Reselect](https://github.com/reactjs/reselect) selectors
* Jest/Enzyme tests (using it() alias for test()) - all passing
* No ESLint warnings/errors
* No console warnings/errors
* Works in modern browsers (and IE 11)

## Acknowledgements

Built with [React](https://reactjs.org/) and [Redux](https://redux.js.org/) - thanks so much to Facebook, Dan Abramov, Mark Erikson, and all contributors!

Thanks to Anthony Accomazzo for his article on [deploying a React app to Amazon's S3](https://www.fullstackreact.com/articles/deploying-a-react-app-to-s3/).

Uses [Font Awesome](http://fontawesome.io) by Dave Gandy (v4, **not** v5).
