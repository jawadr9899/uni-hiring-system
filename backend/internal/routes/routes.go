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
	analyticsServiceOps := services.NewDatabaseService[models.Analytics](db)
	pdfServiceOps := services.NewPDFService("cv.pdf")

	// routes
	api.GET("/all", handlers.GetUsers(userServiceOps), middleware.Authenticate(cfg))
	api.POST("/signup", handlers.Signup(userServiceOps))
	api.POST("/login", handlers.Login(userServiceOps))
	// protected routes
	api.POST("/analytics", handlers.SaveAnalytics(analyticsServiceOps,pdfServiceOps), middleware.Authenticate(cfg))

}
