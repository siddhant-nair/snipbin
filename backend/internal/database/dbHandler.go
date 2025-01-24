package database

import (
	"gorm.io/driver/sqlite" // Sqlite driver based on CGO
	// "github.com/glebarez/sqlite" // Pure go SQLite driver, checkout https://github.com/glebarez/sqlite for details
	"gorm.io/gorm"
)

func dbConnect() {
	_, err := gorm.Open(sqlite.Open("snippet.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect to the database")
	}

}

// github.com/mattn/go-sqlite3
