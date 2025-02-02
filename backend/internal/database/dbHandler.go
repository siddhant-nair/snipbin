package database

// package main

import (
	"gorm.io/driver/sqlite" // Sqlite driver based on CGO
	// "github.com/glebarez/sqlite" // Pure go SQLite driver, checkout https://github.com/glebarez/sqlite for details
	"gorm.io/gorm"
)

func dbConnect() {
	// func main() {
	_, err := gorm.Open(sqlite.Open("snippetsDB.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect to the database")
	}
}
