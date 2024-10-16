package main

import (
	"net/http"

	"work.ua/api"
)

func main() {
	srv := api.NewServer()
	print("Starting server on http://127.0.0.1:3333")
	http.ListenAndServe(":3333", srv)
}
