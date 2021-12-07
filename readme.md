# Human Relatives

## Running the Code

### If you're new to software dev

1. Install Node.js (which includes npm)
   - [Node.js Download](https://nodejs.org/)
2. Download the code
   - Click on the green "Code" button near the top of the page
   - Click "Download ZIP"
3. Unzip the file
   - Extract the files from the ZIP to a new folder in your documents folder called `anthro-evolution`
4. Install dependencies
   - Open your computer's terminal
     - On Windows, use Windows Terminal if you have it, otherwise, use PowerShell
     - On Mac, use Terminal.app
     - If you use linux, you know what the terminal is
   - In your terminal, navigate to the folder you just created using the following command:
     - `cd Documents/anthro-evolution`
   - Now, run the following command to install the dependencies:
     - `npm install`
5. Run the code
   - In your terminal, run `npm start`
   - Once a message appears that says "Compiled successfully!", open your browser and navigate to `localhost:3000`

If you don't already have a text editor or IDE, I recommend installing Visual Studio Code.

### If you're familiar with software dev

1. Make sure you have Node.js installed
2. Clone the repository
3. Install dependencies with `npm i`
4. Run `npm start`

## Project Structure

You can find static files in the `public` directory. Source code is found in `src`.

This project uses two primary libraries for different parts of the app:

- The cladogram is rendered using [GameDeck](https://github.com/danielnoon/gamedeck).
- Everything else is handled by [React](https://reactjs.org/).

`index.ts` is the entry point for the app bootstraps both React and GameDeck.
