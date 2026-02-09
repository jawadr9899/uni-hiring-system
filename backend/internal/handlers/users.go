package handlers

import (
	"net/http"
	"time"
	"uhs/internal/models"
	"uhs/internal/responses"
	"uhs/internal/services"
	"uhs/internal/types"

	"github.com/google/uuid"
	"github.com/labstack/echo/v5"
	"golang.org/x/crypto/bcrypt"
)

func GetUsers(userModel types.UserOps) func(c *echo.Context) error {
	return func(c *echo.Context) error {
		users, err := userModel.GetEntities()
		if err != nil {
			return c.JSON(http.StatusInternalServerError, &responses.DefaultResponse{
				Status:  http.StatusInternalServerError,
				Success: false,
				Message: err,
			})
		}
		return responses.JsonResponse(c, http.StatusOK, users...)
	}

}

func Signup(userModel types.UserOps) func(c *echo.Context) error {
	return func(c *echo.Context) error {
		var user models.User
		err := echo.BindBody(c, &user)
		if err != nil {
			c.Logger().Error("Failed to post user")
			return c.JSON(http.StatusBadRequest, responses.DefaultResponse{
				Status:  http.StatusBadRequest,
				Success: false,
				Message: err,
			})
		}
		// check if user already exists in database
		usersList := userModel.GetEntitiesWhere("email = ?", user.Email)
		if len(usersList) > 0 {
			c.Logger().Error("User already exists")
			return c.JSON(http.StatusBadRequest, responses.DefaultResponse{
				Status:  http.StatusBadRequest,
				Success: false,
				Message: "User already exists",
			})
		}
		// generate id for user
		user.Id = uuid.NewString()
		// hash password
		hash, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
		if err != nil {
			c.Logger().Error("Failed to hash password")
			return err
		}
		user.Password = string(hash)

		err = userModel.CreateEntity(&user)
		if err != nil {
			c.Logger().Error("Database failed to put user")
			return c.JSON(http.StatusBadRequest, responses.DefaultResponse{
				Status:  http.StatusBadRequest,
				Success: false,
				Message: err.Error(),
			})
		}
		return responses.JsonResponse(c, http.StatusOK, user)
	}
}

func Login(userModel types.UserOps) func(c *echo.Context) error {
	return func(c *echo.Context) error {
		var user models.User
		err := echo.BindBody(c, &user)
		if err != nil {
			c.Logger().Error("No body found in request")
			return err
		}
		// check if user exists or not in database
		usersList := userModel.GetEntitiesWhere("email = ?", user.Email)
		if len(usersList) == 0 {
			c.Logger().Error("User doesn't exist")
			return c.JSON(http.StatusBadRequest, responses.DefaultResponse{
				Status:  http.StatusBadRequest,
				Success: false,
				Message: "Invalid credentials",
			})
		}
		// check the hash
		err = bcrypt.CompareHashAndPassword([]byte(usersList[0].Password), []byte(user.Password))
		if err != nil {
			c.Logger().Error("Invalid credentials")
			return c.JSON(http.StatusBadRequest, responses.DefaultResponse{
				Status:  http.StatusBadRequest,
				Success: false,
				Message: "Invalid credentials",
			})
		}
		// generate jwt token
		claims := services.NewCustomClaims(usersList[0].Id, usersList[0].Email, time.Now().Add(time.Minute*15))
		token, err := claims.GenerateToken()

		if err != nil {
			c.Logger().Error("Failed to generated jwt token")
			return err
		}
		return c.JSON(http.StatusOK, &responses.DefaultResponse{
			Status:  http.StatusOK,
			Success: true,
			Message: map[string]string{
				"token": token,
			},
		})

	}
}
