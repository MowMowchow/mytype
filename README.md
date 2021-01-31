# MyType (HTN 2021): https://mytypee.herokuapp.com/#/

MyType came to life through a unique vision. As Engineers and Computer Science students, we find ourselves typing away on our keyboards for multiple hours a day. By being able to have access to customized typing tests, with MyType, we have the ability to train to type faster.

MyType was built with React.js, MongoDB, Python, Tkinter, express.js, node.js, and the random-word-api.

## What Does it Do?
### MyType consists of two parts:
1. A web app where you can register for an account. Once your register, you have a dashboard that shows the keyboard characters that you take the longest to press and your WPM over the last 20 keyboard reports (these happen every 10 seconds that you are active). We also have a typing test that picks words that have letters that you take a long time to press

2. A windows .exe which first prompts the user to log in with their account they created on the website. Once they log in, it begins to track their keypresses and reports time data to the mongodb database every 10 seconds.


## Information

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!


