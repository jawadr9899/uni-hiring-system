package config

import "os"

type Config struct {
	Port      string
	DBUrl     string
	JWTSecret string
}

func LoadConfig() *Config {
	return &Config{
		Port:      GetEnv("PORT", "8080"),
		DBUrl:     GetEnv("DATABASE_URL", "sqlite:./dev.db"),
		JWTSecret: GetEnv("JWT_SECRET", "DEFAULT_SECRET_KEY"),
	}
}

func GetEnv(key string, defaultValue string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return defaultValue
}
