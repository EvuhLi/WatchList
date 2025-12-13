import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

# Import from vectors.py
from app.vectors import (
    movies,
    movie_vectors,
    build_user_vector,
)

def recommend(query: str, top_n: int = 5):
    """
    Recommend movies based on a text query.
    Returns a list of dicts: title, score, rating, year
    """

    # Build user vector
    user_vector = build_user_vector(query)

    # Compute cosine similarity
    similarities = cosine_similarity(movie_vectors, user_vector).flatten()

    # Get top N indices
    top_indices = similarities.argsort()[-top_n:][::-1]

    results = []
    for idx in top_indices:
        movie = movies.iloc[idx]

        results.append({
            "title": movie.get("title", ""),
            "score": float(similarities[idx]),
            "rating": movie.get("rating", None),
            "year": movie.get("year", None),
        })

    return results


# -------------------------------
# Local test (run directly)
# -------------------------------
if __name__ == "__main__":
    test_query = "slowburn drama"
    recommendations = recommend(test_query, top_n=5)

    print(f"\nQuery: {test_query}\n")
    for r in recommendations:
        print(
            f"{r['title']} | score={r['score']:.3f} | rating={r['rating']} | year={r['year']}"
        )
