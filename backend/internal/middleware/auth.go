package middleware

import (
	"uhs/internal/config"
	"uhs/internal/services"

	"github.com/golang-jwt/jwt/v5"
	echojwt "github.com/labstack/echo-jwt/v5"
	"github.com/labstack/echo/v5"
)

func Authenticate(cfg *config.Config) echo.MiddlewareFunc {
	return echojwt.WithConfig(echojwt.Config{
		SigningKey: []byte(cfg.JWTSecret),
		NewClaimsFunc: func(c *echo.Context) jwt.Claims {
			return new(services.CustomJWTClaims)
		},
	})
}
