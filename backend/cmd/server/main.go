package main

import (
	// "fmt"
	// "log"
	// "net/http"
	// "github.com/siddhant-nair/snipbin/internal/models"
	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	r.GET("/ping", func(c *gin.Context) {
		c.IndentedJSON(200, gin.H{
			"message": "pong",
			"wow":     "amazinng",
			"moto": gin.H{
				"this": "is a wpw",
			},
		})
	})

	r.Run() // listen and serve on 0.0.0.0:8080
}
