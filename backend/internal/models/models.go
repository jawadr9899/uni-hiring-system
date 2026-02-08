package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Id        string    `gorm:"primaryKey;"`
	Name      string    `json:"name"`
	Email     string    `json:"email"`
	Password  string    `json:"password"`
	Analytics Analytics `gorm:"constraint:onUpdate:CASCADE,onDelete:CASCADE;" json:"-"`
}

type Analytics struct {
	gorm.Model
	Id               string `gorm:"primaryKey"`
	UserId           string `gorm:"uniqueIndex;not null"`
	Dept             string `json:"dept"`
	DegreeLevel      string `json:"degreeLevel"`
	PublicationCount uint   `json:"publicationCount"`
	Experience       uint   `json:"experience"`
	AcademicScore    uint   `json:"academicScore"`
	ResearchScore    uint   `json:"researchScore"`
	TeachingScore    uint   `json:"teachingScore"`
	IndustrialScore  uint   `json:"industrialScore"`
	SalaryScore      uint   `json:"salaryScore"`
	AdminScore       uint   `json:"adminScore"`
	CompositeRank    uint   `json:"compositeRank"`
	Summary          string `json:"summary"`
}
