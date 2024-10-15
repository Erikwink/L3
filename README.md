# L3
App for L3
## Requirements

### Functional 
#### 1. Conversion
The app must convert different units. Weight (e.g., grams to pounds), Speed (e.g., km/h to mph), and Temperature (e.g., Celsius to Fahrenheit).

#### 2. Input validation
The app must validate the input, ensuring only numeric values are accepted.
An error message must be displayed if the user tries to convert between incompatible units (e.g., weight to speed).

#### 3. History
Users must be able to view a log of recent conversions with details (including calculation steps).
The app should include a toggle for showing/hiding calculation steps.

#### 4. Decimal Precision
The user must be able to choose the number of decimals showed after the conversion.

#### 5. String and calculation
The user needs to be able to choose between seeing the calculation or not.

### Non-Functional Requirements
#### 1. Interface
The app should have a clean and minimalistic interface.
It should be compatible on different devices. (mobile, webb)

#### 2. Performace
The app should performe calculations quickly and work smootly.

#### 3. Modularity



1. README.md for App (L3A)
- Introduction: Provide an overview of the app, its purpose, and how it benefits the user (e.g., "The Unit Conversion App helps engineers quickly and accurately convert between various units of measurement...").
- Installation: Include steps to set up and run the app locally.
- Usage: Describe the user interface and how the user can perform conversions, adjust decimal precision, and toggle between modes (string and calculation).
- Dependencies: Explain that the app relies on the conversion module (L2M).
- Contribution Guidelines: Instructions on how other developers can contribute to the app.

3. Reflection.md
For Clean Code Reflections
- Chapter 2 (Meaningful Names): Reflect on how you named your classes, methods, and variables to improve clarity and reduce ambiguity.
- Chapter 3 (Functions): Discuss how you ensured that functions are small, do one thing, and have clear inputs/outputs.
- Chapter 4 (Comments): Mention how you minimized comments by writing self-explanatory code. Highlight instances where comments were absolutely necessary.
- Chapter 5 (Formatting): Describe how consistent formatting improved readability.
- Chapters 6-11: Reflect on other relevant aspects like error handling, class design, and code testing. Use concrete examples from your code.
4. Tests.... 



### web bundeler...
```bash
npm install --save-dev @babel/core @babel/preset-env
npm install --save-dev babel-loader
```
.Babelrc
```js 
{
  "presets": ["@babel/preset-env"]
}
```
webpack.config.js
```js 
import { fileURLToPath } from 'url';
import path from 'path';

// Convert __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
};

```