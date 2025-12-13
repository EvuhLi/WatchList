"""
vectors.py

Builds movie vectors for the Netflix Popular Movies dataset
using kagglehub + TF-IDF + genre + numeric metadata.
"""

import numpy as np
from scipy.sparse import hstack
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import MinMaxScaler
from app.data_loader import load_movies

# -----------------------------
# 1. Load dataset
# -----------------------------
movies = load_movies()
movies = movies.fillna("")  # fill missing descriptions/genres

# -----------------------------
# 2. Genre vector (multi-hot)
# -----------------------------
all_genres = set()
for g in movies["genre"]:
    for item in g.split(","):
        all_genres.add(item.strip())

GENRES = sorted(all_genres)


def encode_genres(genre_str):
    genres = set(g.strip() for g in genre_str.split(","))
    return [1 if g in genres else 0 for g in GENRES]

genre_matrix = np.array(
    movies["genre"].apply(encode_genres).tolist()
)

# -----------------------------
# 3. Description vector (TF-IDF)
# -----------------------------
tfidf_vectorizer = TfidfVectorizer(
    stop_words="english",
    max_features=300,
    ngram_range=(1,2)
)

description_matrix = tfidf_vectorizer.fit_transform(
    movies["description"]
)

# -----------------------------
# 4. Numeric metadata
# -----------------------------
meta_columns = ["rating", "votes", "year"]
meta_data = movies[meta_columns].replace("", 0).astype(float)
scaler = MinMaxScaler()
meta_matrix = scaler.fit_transform(meta_data)

# -----------------------------
# 5. Combine all vectors
# -----------------------------
# movie_vectors = [genres | description | metadata]
movie_vectors = hstack([
    genre_matrix,
    description_matrix,
    meta_matrix
])

# -----------------------------
# 6. User vector builder
# -----------------------------
def build_user_vector(user_text, genre_preferences=None):
    """
    Convert user query into the same vector space.

    user_text: str
        Natural language input (e.g., 'slow emotional drama')
    genre_preferences: list[int] or None
        Optional weights for each genre (same order as GENRES)
    """

    # Description component
    user_desc_vec = tfidf_vectorizer.transform([user_text])

    # Genre component
    if genre_preferences is None:
        user_genre_vec = np.zeros((1, len(GENRES)))
    else:
        user_genre_vec = np.array([genre_preferences])

    # Metadata component (neutral defaults)
    user_meta_vec = np.array([[0.5, 0.5, 0.5]])

    return hstack([
        user_genre_vec,
        user_desc_vec,
        user_meta_vec
    ])

# -----------------------------
# 7. Example usage
# -----------------------------
if __name__ == "__main__":
    user_query = "slow emotional drama about relationships"
    user_vector = build_user_vector(user_query)

    from sklearn.metrics.pairwise import cosine_similarity

    scores = cosine_similarity(movie_vectors, user_vector).flatten()
    top_indices = scores.argsort()[-5:][::-1]

    print("Top 5 recommendations:")
    for idx in top_indices:
        print(movies.iloc[idx]["title"])
