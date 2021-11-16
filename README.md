# DNT Forget -- An event reminder app

Website: http://dnt-forget-groupproject.herokuapp.com/login?next=%2F

### Linting
Python files are linted with `pylint` and formatted with `Black`. Javascript files are linted with `ESLint` using Airbnb rules.

#### Files excluded
`setupTests.js`, `reportWebVitals.js`, `index.js`

These three files are included with `Create React app`, and so linting these is not required. If they are modified, they will need to be linted.

#### Excluded Rules
ESLint:
`react/no-array-index-key`, `react-hooks/exhaustive-deps`, `react/jsx-filename-extension`

pylint:
`E1101` no-member, `C0413` wrong-import-position, `W1508` invalid-envvar-default, `R0903`, `W0603` global-statement

Standard exclusions.
