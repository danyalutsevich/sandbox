package config

import (
	"github.com/danyalutsevich/gorm/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Connect() {

	dsn := "postgresql://postgres:root@localhost:5432/gorm"

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		panic(err)
	}

	db.AutoMigrate(&models.Product{})

	DB = db
}
