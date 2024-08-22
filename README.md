# News Feed App

App built using ReactJS + Redux + Vite to fetch data from 3 different News APIs using Axios and styling with TailwindCSS.
Additional libraries:
- Moment
- Styled Components
- Cookies (js-cookies)
- Skeleton (react-loading-skeleton)
- DatePicker (react-datepicker)

## Run the app on a Docker Container

If you want to run this applicaton on Docker Container:

- Build the Docker Image

```bash
docker build -t react-news-feed-app .
```

- Run the Docker Container

```bash
docker run -d -p 3000:3000 --name react-news-feed-app-container react-news-feed-app
```

- Access the Application

Open your browser and go to `http://localhost:3000` to see the application running in the Docker container.

- Cleaning Up

To stop and remove the container, use:

```bash
docker stop react-news-feed-app-container
docker rm react-news-feed-app-container
```

## Run in terminal with default Vite options

If you want to run this application on the terminal directly:

- Navigate to the app's directory and run:

```bash
npm install
npm run dev
```

- On your browser, go to `http://localhost:5173`

