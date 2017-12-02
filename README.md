# Strange Encounters

### Dependencies
- Python 3
- VirtualEnv
- PostgreSQL Database

### Installation
```
virtualenv --python=python3 env
source env/bin/activate
pip install -r requirements.txt
cd frontend
npm install
```

Set the following environment variables for postgres database connection:
- RDS_USERNAME
- RDS_PASSWORD
- RDS_DB_NAME

### Running it
```
source env/bin/activate
python strange_encounters/main.py
```

In another tab:
```
cd frontend
npm start
```

### TODO
- Implement `react-bootstrap`


### References

1. https://codeburst.io/creating-a-full-stack-web-application-with-python-npm-webpack-and-react-8925800503d9
1. https://medium.com/@notrab/getting-started-with-create-react-app-redux-react-router-redux-thunk-d6a19259f71f

---

### Not Implemented
- Security
    - CSRF protection
