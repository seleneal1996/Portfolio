const handleSearch = () => {
  if (!searchQuery.trim()) {
    return;
  }

  setIsLoading(true);

  const formattedSearchQuery = searchQuery.charAt(0).toUpperCase() + searchQuery.slice(1).toLowerCase();

  fetch('http://127.0.0.1:8000/videos/filter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: formattedSearchQuery }),
  })
    .then(response => response.json())
    .then(data => {
      setFilteredVideos(data);
      setRecentSearches(prevSearches => [{ query: formattedSearchQuery, videos: data }, ...prevSearches.slice(0, 4)]);
    })
    .catch(error => console.error('Error fetching filtered videos:', error))
    .finally(() => setIsLoading(false));
};
