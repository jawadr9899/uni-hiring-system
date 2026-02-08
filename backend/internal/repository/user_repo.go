package repository

import (
	"database/sql"
	"fmt"
	"log"
	"uhs/internal/models"

	"github.com/google/uuid"
	"github.com/labstack/echo/v5"

	_ "github.com/glebarez/go-sqlite"
)

type Database interface {
	CreateUser(name string, email string, password string) (string, error)
	GetUserById(id string) (models.User, error)
	GetAllUsers() ([]models.User, error)
}

type Sqlite struct {
	Db *sql.DB
}

func New(path string, app *echo.Echo) (*Sqlite, error) {
	db, err := sql.Open("sqlite", path)
	if err != nil {
		app.Logger.Error("Failed to open connection to database")
		return nil, err
	}
	if err = db.Ping(); err != nil {
		app.Logger.Error("PING: Failed to test connection to database")
		return nil, err
	}
	_, err = db.Exec(fmt.Sprintf(`CREATE TABLE IF NOT EXISTS users (
		id TEXT PRIMARY KEY DEFAULT "%s",
		name TEXT NOT NULL,
		email TEXT NOT NULL,
		password TEXT NOT NULL
	)`, uuid.NewString()))

	if err != nil {
		app.Logger.Error("Failed to created table for users")
		return nil, err
	}

	return &Sqlite{
		Db: db,
	}, nil
}

func (sqlite *Sqlite) CreateUser(user models.User) (int64, error) {
	stmnt, err := sqlite.Db.Prepare("INSERT INTO users (id,name,email,password) VALUES (?,?,?,?)")

	if err != nil {
		log.Fatal("Failed to create user!")
		return 0, err
	}

	defer stmnt.Close()

	result, err := stmnt.Exec(uuid.NewString(), user.Name, user.Email, user.Password)
	if err != nil {
		log.Fatal("Failed to create user!")
		return 0, err
	}

	id, err := result.LastInsertId()

	if err != nil {
		log.Fatal("Failed to retireve lasInsertId")
		return 0, nil
	}

	return id, nil
}

func (sqlite *Sqlite) GetUserById(id string) (models.User, error) {
	stmnt, err := sqlite.Db.Prepare("SELECT id,name,email,password FROM users WHERE id = ? LIMIT 1")
	if err != nil {
		log.Fatal("Failed to retireve record by id")
		return models.User{}, err
	}

	defer stmnt.Close()

	var user models.User

	err = stmnt.QueryRow(id).Scan(&user.Id, &user.Name, &user.Email, &user.Password)
	if err != nil {
		if err == sql.ErrNoRows {
			return models.User{}, fmt.Errorf("No user found with id %s", id)
		}
		return models.User{}, fmt.Errorf("Query error %s", err)
	}

	return user, nil

}

func (sqlite *Sqlite) GetAllUsers() ([]models.User, error) {
	stmnt, err := sqlite.Db.Prepare("SELECT * FROM users")
	if err != nil {
		return nil, err
	}
	defer stmnt.Close()

	rows, err := stmnt.Query()

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var users []models.User

	for rows.Next() {
		var user models.User
		err := rows.Scan(&user.Id, &user.Name, &user.Email, &user.Password)
		if err != nil {
			return nil, err
		}

		users = append(users, user)
	}

	return users, nil

}
