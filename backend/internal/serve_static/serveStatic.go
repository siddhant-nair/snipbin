package servestatic

import (
	"net/http"
	"path"
	"path/filepath"
	"strings"
)

func SecureFileServer(root string) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Clean the path to prevent directory traversal
		urlPath := path.Clean(r.URL.Path)

		// Prevent directory listing by checking if path ends with "/"
		if strings.HasSuffix(urlPath, "/") {
			http.Error(w, "403 Forbidden", http.StatusForbidden)
			return
		}

		// Get the file path
		filePath := filepath.Join(root, urlPath)

		// Verify the path is within root directory
		if !strings.HasPrefix(filepath.Clean(filePath), filepath.Clean(root)) {
			http.Error(w, "403 Forbidden", http.StatusForbidden)
			return
		}

		// Serve the file
		http.ServeFile(w, r, filePath)
	})
}
