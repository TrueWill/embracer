# embracer

MET Vampire the Masquerade character generator

Based on 2015 edition from By Night Studios

Some terms are copyrighted by or registered trademarks of CCP hf.
This tool is unofficial, and the author is not affiliated with the companies mentioned above.

## Live

Deployed to https://www.met-embracer.com/

Currently deployment is manual, so the site may not reflect the latest changes.

## To Do

- Print options (A4 size, etc.)
- Improve test coverage
- Techniques (clear if change Generation)
- Elder Powers (clear if change Generation)
- Eerie Presence Flaw can be purchased multiple times
- Anarch Movement Generation merit and Path costs
- True Brujah cannot purchase Empathy
- Premascine can learn Necromancy: Mortis Path as out-of-clan
- Volgirre can learn Vicissitude out-of-clan (up to 2 dots)
- Carpathians can learn Protean out-of-clan and cannot take the Szlachta merit
- Koldun additional Thaumaturgy path (odd costs)
- Angellis Ater choice of in-clan discipline
- Necromantic Training and similar merits allowing access to disciplines

## Contributing

### Standards

- [Vite](https://vite.dev/)
- [Prettier](https://prettier.io/) v1 with single quotes (`yarn prettify`)
- [EditorConfig](http://editorconfig.org/)
- [Yarn](https://yarnpkg.com/en/)
- TypeScript
- Prefer function components to class components (OK to use [Hooks](https://reactjs.org/docs/hooks-intro.html))
- [Flux Standard Actions](https://github.com/acdlite/flux-standard-action)
- [Strict Mode](https://reactjs.org/docs/strict-mode.html) (except for react-select)
- [Reselect](https://github.com/reactjs/reselect) selectors
- Only reducers and selectors should know the exact state structure
- Vite/React Testing Library tests (using it() alias for test()) - all passing
- No ESLint errors (working on warnings)
- No console warnings/errors
- Works in modern browsers (does _not_ support Internet Explorer)

## Acknowledgements

Built with [React](https://reactjs.org/) and [Redux](https://redux.js.org/) - thanks so much to Facebook, Dan Abramov, Mark Erikson, and all contributors!

Special thanks to my lovely wife [hellomandie](https://github.com/hellomandie) for styling the app!

Thanks to Anthony Accomazzo for his article on [deploying a React app to Amazon's S3](https://www.newline.co/fullstack-react/articles/deploying-a-react-app-to-s3/).

Uses [Font Awesome](http://fontawesome.io) by Dave Gandy (v4, **not** v5).

Uses [jsPDF](https://github.com/MrRio/jsPDF) by James Hall.
