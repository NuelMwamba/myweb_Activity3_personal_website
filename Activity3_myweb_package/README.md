# ICT251 Activity 3 — Personal Website

A responsive student portfolio for ICT251 Web Technologies.

## JavaScript features
1. Contact form validation and local preview. It does not send a message to a server.
2. Photo gallery with Previous/Next controls, changing captions, and wrap-around at both ends.
3. Project/skills search, Clear button, and no-results message.
4. Light/dark theme toggle with optional preference saving.
5. Responsive mobile navigation.

## Folder structure
Keep `index.html` at the repository root and preserve these folders:
- `css/styles.css`
- `js/script.js`
- `images/photo1.jpg`, `images/photo2.jpg`, `images/photo3.jpg`
- `videos/intro.mp4`, `videos/voice.mp3`

Use your own image/audio/video files, and make sure names and capitalization match the paths in the code.

## Test locally
1. Open this folder in Visual Studio Code and run `index.html` with Live Server.
2. Test Previous/Next at the first and last photos.
3. Search for HTML, CSS, JavaScript, and a term with no results; test Clear.
4. Switch themes more than once.
5. Test the contact form with blank inputs, spaces-only name/message, an invalid email, and valid details.
6. Test keyboard navigation and widths around 375px and 1280px. Check the browser console for errors and missing files.

## Sources
- MDN Web Docs: https://developer.mozilla.org/en-US/docs/Learn_web_development
- Publish only photos and media you own or have permission to share, and include credits when required.

## Deploy to Render
Upload the contents of this folder to a public GitHub repository, with `index.html` at the repository root. Create a Render Static Site connected to that repository. Use a blank Root Directory, Build Command `echo "No build required"`, and Publish Directory `.`. After deployment, test the public HTTPS site and make a small commit to confirm the live site updates.

Before submitting, replace `YOUR-USERNAME` in the GitHub source link at the bottom of `index.html` with your actual GitHub username.
