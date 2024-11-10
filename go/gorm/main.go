package main

import (
	"github.com/danyalutsevich/gorm/config"
	"github.com/danyalutsevich/gorm/routes"
	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.New()
	config.Connect()
	routes.ProductRoutes(router)
	router.Run(":8080")
}
