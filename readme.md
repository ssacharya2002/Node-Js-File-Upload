# Node.js File Upload

A simple Node.js project for file upload and retrieval using Express.js.

# Features
- File upload with size and extension validation
- Display uploaded files and provide download links

## Prerequisites

- Node.js (v12 or higher)

## Installation

1. Clone the repository.
```shel
git clone https://github.com/your-username/nodejs-file-upload.git
```

2. Navigate to the project directory.
```shel
cd nodejs-file-upload
```
3. Install dependencies.
```shel
npm install
```
## Customization
 - File Size Limit: You can modify the maximum file size allowed for upload by changing the `MB` constant in the `fileSizeLimiter` middleware in `app.js`.

 - Allowed File Extensions: You can customize the allowed file extensions by modifying the `allowedExtArray` parameter in the `fileExeLimiter` middleware in `app.js`.



## Usage

1. Start the server.
```shel
npm start
```
2. Open `http://localhost:3500` in your browser.
3. Select and upload files using the form.
4. Files will be validated and stored in the `files` directory.
5. View uploaded files with download links.

