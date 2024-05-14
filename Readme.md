## Installation

### Prerequisites

- Docker installed on your machine

### Ports

Before running the Docker containers, ensure that the following ports are open and not in use:

- Port `5000`: Used by the server to expose the API endpoints.
- Port `3000`: Used by the client to serve the React application.
- Port `27017`: Used by MongoDB for database communication.

### Steps

1. Clone the repository:

    ```bash
    git clone https://github.com/pipariyahiren/mern-notification-app.git
    ```

2. Set up environment variables:

    - Create a `.env` file in the `server` directory and add the following:

        ```env
        NODE_ENV=<Environment>
        MONGODB_URI=<MONGODB_CONNECTION_URL>
        MONGODB_NAME=<MONGO DATABASE NAME>
        CRON_HOURS=<HOURS> should be from 0 to 23
        CRON_MINUTES=<MINUTES> should be from 0 to 59
        ```

    - Create a `.env` file in the `client` directory and add the following:

        ```env
        REACT_APP_API_URL=http://localhost:5000/api
        ```

3. Build and run the Docker containers:

    ```bash
    docker-compose build
    docker-compose up
    ```

Detailed documentation can be found in Documentation.md file