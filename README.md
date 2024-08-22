# News Feed App

App built using ReactJS + Redux + Vite to fetch data from 3 different News APIs using Axios and styling with TailwindCSS.
Additional libraries:
- Moment
- Styled Components
- Cookies (js-cookies)
- Skeleton (react-loading-skeleton)
- DatePicker (react-datepicker)

## About the News Aggregator

- The initial state of this application will display random news based on the return of the APIs

![Captura de tela 2024-08-22 110249](https://github.com/user-attachments/assets/52eee69f-ff2f-424d-977a-1463444cee2e)

- The categories shown within the filters are dinamically generated based on the categories of the returned news

![Captura de tela 2024-08-22 110305](https://github.com/user-attachments/assets/6be00440-20e0-400e-bea1-1a8e0b326193)

- When you select any of the filters (categories, sources or date range), the application will filter the results

![Captura de tela 2024-08-22 110322](https://github.com/user-attachments/assets/d4040b2e-3eac-4d01-81a0-c88365712c40)

- Users can also select their favorite categories, which are stored in cookies and used to populate the feed when returning to the application

![Captura de tela 2024-08-22 110616](https://github.com/user-attachments/assets/61752c12-5e9f-41de-8659-089486b9c9c5)

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

