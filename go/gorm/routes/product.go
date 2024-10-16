package routes

import (
	"github.com/danyalutsevich/gorm/config"
	"github.com/danyalutsevich/gorm/models"
	"github.com/gin-gonic/gin"
)

func ProductRoutes(router *gin.Engine) {

	router.GET("/products", func(c *gin.Context) {
		products := []models.Product{}
		config.DB.Find(&products)

		c.JSON(200, gin.H{
			"data": products,
		})
	})

	router.GET("/products/:id", func(c *gin.Context) {
		id := c.Param("id")
		product := models.Product{}
		config.DB.First(&product, id)
		c.JSON(200, product)
	})

	router.POST("/products", func(c *gin.Context) {
		var product models.Product
		c.BindJSON(&product)
		config.DB.Create(&product)
		c.JSON(200, product)
	})

	router.PUT("/products/:id", func(c *gin.Context) {
		id := c.Param("id")
		product := models.Product{}
		config.DB.First(&product, id)
		c.BindJSON(&product)
		config.DB.Save(&product)
		c.JSON(200, product)
	})

	router.DELETE("/products/:id", func(c *gin.Context) {
		id := c.Param("id")
		product := models.Product{}
		config.DB.First(&product, id)
		config.DB.Delete(&product)
		c.JSON(200, gin.H{
			"message": "Product deleted successfully",
		})
	})

}
