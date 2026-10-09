# Calculator

A simple web-based calculator built with HTML, CSS, JavaScript, Python and Flask. This project was created to practise full-stack web development, version control and Docker containerisation.

## Features

- Interactive calculator interface
- Basic arithmetic operations
- Frontend built with HTML, CSS and JavaScript
- Flask backend using Python
- Docker support for containerised deployment
- GitHub Actions workflow for automated builds

## Technologies Used

- **HTML5** — page structure
- **CSS3** — styling and layout
- **JavaScript** — calculator functionality
- **Python** — backend language
- **Flask** — web framework
- **Docker** — application containerisation
- **Git and GitHub** — version control and repository hosting
- **GitHub Actions** — workflow automation

## Getting Started

### Prerequisites

To run the application locally, you will need:

- Python 3
- pip

To run it using Docker, you will need Docker installed.

### Running Locally

1. Clone the repository:

   ```bash
   git clone <YOUR_REPOSITORY_URL>
   cd <YOUR_REPOSITORY_NAME>
   ```

2. Create and activate a virtual environment:

   **Windows:**
   ```bash
   python -m venv .venv
   .venv\Scripts\activate
   ```

   **Linux/macOS:**
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```

3. Install the dependencies:

   ```bash
   pip install -r requirements.txt
   ```

4. Start the Flask application:

   ```bash
   python app.py
   ```

5. Open the local address displayed in your terminal, typically:

   `http://127.0.0.1:5000`

## Running with Docker

Build the Docker image:

```bash
docker build -t calculator .
```

Run the container:

```bash
docker run --rm -p 5000:5000 calculator
```

Open `http://localhost:5000` in your browser.

### Pulling from GitHub Container Registry

If a public image is available, you can pull it without logging in:

```bash
docker pull ghcr.io/<YOUR_GITHUB_USERNAME>/<YOUR_IMAGE_NAME>:latest
```

Run the downloaded image:

```bash
docker run --rm -p 5000:5000 ghcr.io/<YOUR_GITHUB_USERNAME>/<YOUR_IMAGE_NAME>:latest
```

Replace the placeholders with the actual image coordinates and tag published to GHCR.

## Project Structure

```text
.
├── app.py
├── requirements.txt
├── Dockerfile
├── .dockerignore
├── .gitignore
├── templates/
│   └── index.html
├── static/
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── script.js
│   └── images/
└── .github/
    └── workflows/
```

The structure above is an example; adjust it to match the actual files and directories in your repository.

## What I Learned

Through this project, I gained practical experience with:

- Connecting a frontend to a Flask application
- Organising a web application into separate files and directories
- Using Git branches and GitHub for version control
- Managing Python dependencies and virtual environments
- Creating Docker images and running containers
- Automating builds with GitHub Actions
- Understanding how different technologies work together in a real project

## Future Improvements

- Add automated tests
- Improve error handling and input validation
- Expand calculator functionality
- Improve the user interface and accessibility

## Licence

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
