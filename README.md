# It-Worked-on-my-machine Frontend
- This is the frontend ReactJS web app of Mazematics
- It contains:
    - Teaching Platform (`src/components/teaching`)
    - Learning Platform (`src/components/learning`)
    - Account Management System (`src/components/accounts`)
    - Gaming System (`src/components/game`)

## How to Run Development Server
1. `npm install` (only need to run once to download packages or when the `package.json` is updated)
2. `npm start`

### Fake Backend
- To test the API calls with a fake backend

#### How to Run (in a separate window than the ReactJS app)
1. `npm install -g json-server` (only need to run once to download packages)
2. `json-server -p 3007 -w db.json` (runs json server at localhost:3007, based on the `db.json` file)

### How to Change the Account Type
1. Go to `src/redux/ducks/auth.js`
2. Change the user role in the `initialState` constant

### How to Run Docs Server
1. `npm run docs-dev`

## How to Run Production Server
### First Time
1. Install docker
2. `docker-compose up -d --build` (it may take a while)

### Next Times
1. `docker-compose start`

### How to Stop
1. `docker-compose stop`

### How to View Logs
1. `docker logs mazematics-client -f`