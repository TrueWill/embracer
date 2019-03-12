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
* Print options (A4 size, etc.)
* Improve test coverage
* Rituals
* Techniques (clear if change Generation)
* Elder Powers (clear if change Generation)
* Eerie Presence Flaw can be purchased multiple times
* Setting-specific (Sabbat) Rituals Background
* Anarch Movement Generation merit and Path costs
* True Brujah cannot purchase Empathy and pay double XP for dots of Morality
* Premascine can learn Necromancy: Mortis Path as out-of-clan
* Volgirre can learn Vicissitude out-of-clan (up to 2 dots)
* Carpathians can learn Protean out-of-clan and cannot take the Szlachta merit
* Koldun additional Thaumaturgy path (odd costs)
* Angellis Ater choice of in-clan discipline
* Necromantic Training and similar merits allowing access to disciplines

## Contributing

### Standards

* [Prettier](https://prettier.io/) with single quotes
* [EditorConfig](http://editorconfig.org/)
* [Yarn](https://yarnpkg.com/en/)
* [prop-types](https://github.com/facebook/prop-types)
* Prefer function components to class components (OK to use [Hooks](https://reactjs.org/docs/hooks-intro.html))
* [Flux Standard Actions](https://github.com/acdlite/flux-standard-action)
* [Strict Mode](https://reactjs.org/docs/strict-mode.html) (except for react-select)
* [Reselect](https://github.com/reactjs/reselect) selectors
* Only reducers and selectors should know the exact state structure
* [CSS Modules](https://facebook.github.io/create-react-app/docs/adding-a-css-modules-stylesheet)
* Jest/Enzyme tests (using it() alias for test()) - all passing: [![Build Status](https://travis-ci.com/TrueWill/embracer.svg?branch=master)](https://travis-ci.com/TrueWill/embracer)
* No ESLint warnings/errors
* No console warnings/errors
* Works in modern browsers (and IE 11)

## Acknowledgements

Built with [React](https://reactjs.org/) and [Redux](https://redux.js.org/) - thanks so much to Facebook, Dan Abramov, Mark Erikson, and all contributors!

Thanks to Anthony Accomazzo for his article on [deploying a React app to Amazon's S3](https://www.fullstackreact.com/articles/deploying-a-react-app-to-s3/).

Uses [Font Awesome](http://fontawesome.io) by Dave Gandy (v4, **not** v5).

Uses [jsPDF](https://github.com/MrRio/jsPDF) by James Hall.
