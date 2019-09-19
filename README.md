## OperatorFlow Frontend

This repository contains the source code for the [OperatorFlow project](https://www.operatorflow.io). Note: part of this `README.md` is left over from the old forked repository documentation.

## Components

The source code for each of the React framework components used can be found in the `src/components` directory. This project uses the React framework and [Material UI styling framework](https://material-ui.com/). 

## Quick Setup and Start

1. Clone this repository: `git clone https://github.com/ychennay/operatorflow-frontend-react.git`.

2. In the root directory, install all dependencies: `npm install`

3. Run `npm run start` to begin developing. This will start a local server at port 3000, and any code changes made will be saved and refreshed immediately.

## Deployment to Static Hosting S3 Bucket

Run the `npm run deploy` command. This will sequentially run `npm run build` (which uses `webpack` to build a minified Javascript bundle of the source code for deployment), and then ` npm run push`, which pushes the code to the static S3 bucket that hosts www.operatorflow.io.

## Application Info

The Hexal AWS Cognito tutorial starter project was itself initially bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, run the following commands:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed! See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
