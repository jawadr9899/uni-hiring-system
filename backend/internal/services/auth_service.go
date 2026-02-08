package services

import (
	"log"
	"time"
	"uhs/internal/config"

	"github.com/golang-jwt/jwt/v5"
)

type AuthService interface {
	GenerateToken(userId string, userName string) (jwt.Token, error)
}

type CustomJWTClaims struct {
	Id   string `json:"id"`
	Name string `json:"name"`
	jwt.RegisteredClaims
}

func (auth *CustomJWTClaims) GenerateToken(userId string, userName string) (string, error) {
	claims := &CustomJWTClaims{
		Id:   userId,
		Name: userName,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Minute * 15)),
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	encoded_token, err := token.SignedString(config.GetEnv("JWT_SECRET", "JON_SNOW"))

	if err != nil {
		log.Fatalf("Failed to generate the jwt token %s", err)
		return "", err
	}
	return encoded_token, nil

}
