package services

import (
	"bytes"
	"io"
	"os"

	"github.com/AbdullahAlzariqi/pdf"
	"github.com/labstack/echo/v5"
)

type PDFOperations interface {
	ProcessPDF(c *echo.Context) error
	ExtractText(c *echo.Context) (string, error)
}

type PDFService struct {
	FilePath  string
	IsDeleted bool
}

func NewPDFService(filePath string) PDFOperations {
	return &PDFService{
		FilePath:  filePath,
		IsDeleted: false,
	}
}

func (p *PDFService) ProcessPDF(c *echo.Context) error {
	file, err := c.FormFile("file")
	if err != nil {
		c.Logger().Error("Filed to get file from multipart data " + err.Error())
		return err
	}
	src, err := file.Open()
	if err != nil {
		c.Logger().Error("Failed to open file from multipart data " + err.Error())
		return err

	}
	dst, err := os.Create(p.FilePath)
	if err != nil {
		c.Logger().Error("Failed to create file " + err.Error())
		return err
	}
	defer dst.Close()

	_, err = io.Copy(dst, src)
	if err != nil {
		c.Logger().Error("Failed to copy data of multipart to destination " + err.Error())
		return err
	}

	return nil
}

func (p *PDFService) ExtractText(c *echo.Context) (string, error) {
	f, r, err := pdf.Open(p.FilePath)
	if err != nil {
		c.Logger().Error("Failed to process pdf " + err.Error())
		return "", err
	}
	defer f.Close()

	var buf bytes.Buffer
	b, err := r.GetPlainText()
	if err != nil {
		c.Logger().Error("Failed to read buffer of pdf " + err.Error())
		return "", err

	}
	// delete the created _.pdf
	err = os.Remove(p.FilePath)
	if err != nil {
		c.Logger().Error("Failed to delete the created pdf file " + err.Error())
		return "", err
	}

	buf.ReadFrom(b)
	return buf.String(), nil
}
