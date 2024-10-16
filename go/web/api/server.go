package api

import (
	"encoding/json"
	// "gorm.io/driver/postgres"
	"net/http"

	"github.com/google/uuid"
	"github.com/gorilla/mux"
)

type Work struct {
	ID   uuid.UUID `json:"id"`
	Name string    `json:name`
}

type Server struct {
	*mux.Router

	workOffers []Work
}

func NewServer() *Server {
	s := &Server{
		Router:     mux.NewRouter(),
		workOffers: []Work{},
	}
	s.routes()
	return s
}

func (s *Server) routes() {
	s.HandleFunc("/work-offers", s.listWorkOffers()).Methods("GET")
	s.HandleFunc("/work-offers", s.createWorkOffer()).Methods("POST")
	s.HandleFunc("/work-offers/{id}", s.removeWorkOffer()).Methods("DELETE")
}

func (s *Server) createWorkOffer() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var i Work
		if err := json.NewDecoder(r.Body).Decode(&i); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		i.ID = uuid.New()
		s.workOffers = append(s.workOffers, i)

		w.Header().Set("Content-Type", "application/json")
		if err := json.NewEncoder(w).Encode(i); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

	}
}

func (s *Server) listWorkOffers() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		if err := json.NewEncoder(w).Encode(s.workOffers); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
	}
}

func (s *Server) removeWorkOffer() http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		idStr, _ := mux.Vars(r)["id"]
		id, err := uuid.Parse(idStr)

		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
		}

		for i, item := range s.workOffers {
			if item.ID == id {
				s.workOffers = append(s.workOffers[:i], s.workOffers[i+1:]...)
				break
			}
		}

	}
}
