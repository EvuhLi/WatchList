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
import pandas as pd
from sentence_transformers import SentenceTransformer


# -----------------------------
# 1. Load dataset
# -----------------------------
movies = load_movies()
movies = movies.fillna("")  # fill missing descriptions/genres
model = SentenceTransformer("all-MiniLM-L6-v2")

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
# Create a working copy of the dataframe
meta_data = movies[meta_columns].copy()

# 1. Clean 'votes': Remove the commas
meta_data['votes'] = meta_data['votes'].astype(str).str.replace(',', '', regex=False)

# 2. Clean 'year': Extract the first 4-digit number found (the start year)
meta_data['year'] = meta_data['year'].astype(str).str.extract(r'(\d{4})')

# 3. Convert all columns to float (handling any potential missing values)
meta_data = meta_data.apply(pd.to_numeric, errors='coerce').fillna(0)

# Now you can scale without error
scaler = MinMaxScaler()
meta_matrix = scaler.fit_transform(meta_data)

print(meta_matrix)


# -----------------------------
# 5. Combine all vectors
# -----------------------------
# movie_vectors = [genres | description | metadata]

# -----------------------------
# 6. User vector builder
# -----------------------------

descriptions = movies["description"].fillna("").tolist()
movie_text_vectors = model.encode(
    descriptions,
    normalize_embeddings=True,
    show_progress_bar=True
)

movie_vectors = np.hstack([
    movie_text_vectors,
    meta_matrix
])

def build_user_vector(query: str):
    text_vec = model.encode(
        [query],
        normalize_embeddings=True
    )
    meta_padding = np.zeros((1, meta_matrix.shape[1]))
    return np.hstack([text_vec, meta_padding])
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
        print(movies.iloc[idx])
