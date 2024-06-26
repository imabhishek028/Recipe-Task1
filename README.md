<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
    <h1>Recipe Task 1</h1>
    <p><strong>Spider Inductions Task 1 by Abhishek Jha, Roll No- 110123005</strong></p>
    <p>I have completed all the levels and added some additional features, including:</p>
    <ul>
        <li>App Icon</li>
        <li>Splash Screen</li>
        <li>Scalability for usability on any mobile size</li>
        <li>Bug-free and clean UI</li>
    </ul>
    <h2>Navigation</h2>
    <p>The main navigation file is <code>app.jsx</code>. The app uses two navigators: stack and bottom drawer.</p>
    <h2>Screens</h2>
    <p>The app consists of multiple screens, listed under the <code>Screens</code> directory, except for <code>main.jsx</code>. There is also a <code>Utils</code> directory containing <code>data.js</code> and all the recipe images, which holds all the raw data.</p>
    <h2>Running the Application</h2>
    <h3>Demo</h3>
    <p>To view the app on your phone:</p>
    <ol>
        <li>Head over to the <code>Demo</code> directory.</li>
        <li>Download the <a href="Demo/RecipesbyAbhishek.apk" download>RecipesbyAbhishek.apk</a>.</li>
        <li>Install and run it on your Android device.</li>
        <li>The <code>Demo</code> directory also contains images of all the pages and functionality.</li>
    </ol>
    <h3>Setting Up the Code</h3>
    <p>To set up and run the code on your machine:</p>
    <ol>
        <li>
            <strong>Clone the Repository</strong>
            <pre><code>git clone https://github.com/imabhishek028/Recipe-Task1
cd Recipe-Task1</code></pre>
        </li>
        <li>
            <strong>Install Android Studio</strong>
            <p>Download and install Android Studio from the <a href="https://developer.android.com/studio" target="_blank">official website</a>. Set up an Android emulator.</p>
        </li>
        <li>
            <strong>Install Dependencies</strong>
            <p>Navigate to the project directory. Install the necessary dependencies by checking the <code>package.json</code> file. You can install them using:</p>
            <pre><code>npm install</code></pre>
        </li>
        <li>
            <strong>Run the Application</strong>
            <p>Open a terminal and navigate to the project directory. Run the following command to start the application on the emulator:</p>
            <pre><code>npx react-native run-android</code></pre>
            <p>This command will open an emulator and run the application.</p>
        </li>
    </ol>
</body>
</html>
