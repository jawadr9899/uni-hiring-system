package routes

import (
	"uhs/internal/config"
	"uhs/internal/handlers"
	"uhs/internal/middleware"
	"uhs/internal/models"
	"uhs/internal/services"

	"github.com/labstack/echo/v5"
	"gorm.io/gorm"
)

func SetupRoutes(cfg *config.Config, api *echo.Group, db *gorm.DB) {
	// services
	userServiceOps := services.NewDatabaseService[models.User](db)

	// routes
	api.GET("/user/all", handlers.GetUsers(userServiceOps), middleware.Authenticate(cfg))
	api.POST("/user/signup", handlers.Signup(userServiceOps))
	api.POST("/user/login", handlers.Login(userServiceOps))

}
