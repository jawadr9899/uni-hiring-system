package types

import (
	"uhs/internal/models"
	"uhs/internal/services"
)

type UserOps services.DatabaseOperations[models.User]
type AnalyticsOps services.DatabaseOperations[models.Analytics]