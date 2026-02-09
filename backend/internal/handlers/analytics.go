package handlers

import (
	"net/http"
	"uhs/internal/models"
	"uhs/internal/responses"
	"uhs/internal/services"
	"uhs/internal/types"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"github.com/labstack/echo/v5"
)

func SaveAnalytics(analyticsOps types.AnalyticsOps, pdfOps types.PDFOps) func(c *echo.Context) error {
	return func(c *echo.Context) error {
		// extract token
		token, err := echo.ContextGet[*jwt.Token](c, "user")
		if err != nil {
			c.Logger().Error("Failed to retrieve token from request body " + err.Error())
			return c.JSON(http.StatusUnauthorized, &responses.DefaultResponse{
				Status:  http.StatusUnauthorized,
				Success: false,
				Message: "Invalid or Missing JWT",
			})
		}
		user := token.Claims.(*services.CustomJWTClaims)
		// extract body
		var analytics models.Analytics
		echo.BindBody(c, &analytics)
		// bind id
		analytics.Id = uuid.NewString()
		analytics.UserId = user.UserId

		// initiate
		err = pdfOps.ProcessPDF(c)
		if err != nil {
			c.Logger().Error("Failed to process pdf " + err.Error())
			return c.JSON(http.StatusInternalServerError, &responses.DefaultResponse{
				Status:  http.StatusInternalServerError,
				Success: false,
				Message: "Failed to process pdf",
			})
		}
		text, err := pdfOps.ExtractText(c)
		if err != nil {
			c.Logger().Error("Failed to process the text of pdf " + err.Error())

			return c.JSON(http.StatusInternalServerError, &responses.DefaultResponse{
				Status:  http.StatusInternalServerError,
				Success: false,
				Message: "Failed to process text of pdf",
			})
		}

		// save to db
		err = analyticsOps.CreateEntity(&analytics)
		if err != nil {
			c.Logger().Error("Failed to create analytics " + err.Error())
			return c.JSON(http.StatusBadRequest, &responses.DefaultResponse{
				Status:  http.StatusBadRequest,
				Success: false,
				Message: "Failed to create analytics",
			})
		}
		return c.JSON(http.StatusOK, &responses.DefaultResponse{
			Status:  200,
			Success: true,
			Message: map[string]any{"analytics": analytics, "extract": text},
		})
	}
}
