# Babble

### Dependencies
- Python 3
- VirtualEnv
- PostgreSQL Database
- PostGIS

### Installation
```
virtualenv --python=python3 env
source env/bin/activate
pip install -r requirements.txt
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

### References

1. https://www.creative-tim.com/product/now-ui-kit

---

### Not Implemented
- Interaction
    - Ability to change address in Post
- Database
    - Schema migrations
- Security
    - CSRF protection
