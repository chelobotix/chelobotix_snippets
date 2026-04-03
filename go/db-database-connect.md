# DB DATABASE connect

## Fragment 1: Basic SQL

github.com/jackc/pgx

```go
package main

import (
	"database/sql"
	"fmt"
	_ "github.com/jackc/pgx/v5/stdlib"
	"log"
)

func main() {
	// connect to DB
	db, err := sql.Open("pgx", "host=localhost port=5432 dbname=test_connect user=x5 password=")

	if err != nil {
		log.Fatal(fmt.Printf("Unable to connect %s", err))
	}

	defer db.Close()

	log.Println("Connect to DB")

	// test connection
	err = db.Ping()
	if err != nil {
		log.Fatal(fmt.Printf("Unable to ping db %s", err))
	}

	log.Println("Pinged to DB")

	// get rows from users
	err = getAllRows(db)
	if err != nil {
		log.Fatal(fmt.Printf("Unable to get the rows from users table %s", err))
	}

	// insert a row
	//query := `INSERT INTO users(id, first_name, last_name) values($1, $2, $3)`
	//
	//_, err = db.Exec(query, 3, "Melissa", "Alarcon")
	//if err != nil {
	//	log.Fatal(fmt.Printf("Error inserting data: %s", err))
	//}

	// update a row
	query := `UPDATE users SET first_name = $1 WHERE id = $2`

	_, err = db.Exec(query, "Mel", 2)
	if err != nil {
		log.Fatal(fmt.Printf("Error updating data: %s", err))
	}

	// Query one row by id
	query = `SELECT first_name FROM users WHERE id = $1`
	var firstName string

	row := db.QueryRow(query, 1)
	err = row.Scan(&firstName)
	if err != nil {
		log.Fatal(fmt.Printf("Error getting one row: %s", err))
	}
	log.Println(firstName)

}

func getAllRows(db *sql.DB) error {
	rows, err := db.Query("SELECT * FROM users")
	if err != nil {
		return err
	}
	defer rows.Close()

	var firstName, lastName string
	var id int

	for rows.Next() {
		err := rows.Scan(&id, &firstName, &lastName)
		if err != nil {
			return err
		}
		log.Println("record:", id, firstName, lastName)

		if err = rows.Err(); err != nil {
			log.Fatal("error getting data from rows", err)
		}
	}

	return nil
}
```

## Fragment 2: DRIVER

```go
// DRIVER
package driver

import (
	"database/sql"
	_ "github.com/jackc/pgconn"
	_ "github.com/jackc/pgx/v5"
	_ "github.com/jackc/pgx/v5/stdlib"
	"time"
)

type DB struct {
	SQL *sql.DB
}

var dbConn = &DB{}

const maxOpenDbConn = 10
const maxIdleConn = 5
const maxDbLifetime = 5 * time.Minute

func ConnectSQL(dsn string) (*DB, error) {
	db, err := NewDatabase(dsn)
	if err != nil {
		panic(err)
	}

	db.SetMaxOpenConns(maxOpenDbConn)
	db.SetMaxIdleConns(maxIdleConn)
	db.SetConnMaxLifetime(maxDbLifetime)

	dbConn.SQL = db

	err = testDB(db)
	if err != nil {
		return nil, err
	}

	return dbConn, nil
}

func testDB(db *sql.DB) error {
	err := db.Ping()
	if err != nil {
		return err
	}

	return nil
}

func NewDatabase(dsn string) (*sql.DB, error) {
	db, err := sql.Open("pgx", dsn)
	if err != nil {
		return nil, err
	}

	if err = db.Ping(); err != nil {
		return nil, err
	}

	return db, nil
}

```
