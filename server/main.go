package main
import (
	"net/http"
	"strings"
	"fmt"
)
func sayHello(w http.ResponseWriter, r *http.Request) {
	fmt.Print("Request made to ", r.URL.Path)
	message := r.URL.Path
	message = strings.TrimPrefix(message, "/")
	message = "Hello " + message
	w.Write([]byte(message))
}
func main() {
	fmt.Print("Serving on port 8080")
	http.HandleFunc("/", sayHello)
	if err := http.ListenAndServe(":8080", nil); err != nil {
		panic(err)
	}
}