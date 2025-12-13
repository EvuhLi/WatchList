import os
import kagglehub
import pandas as pd

DATASET_NAME = "narayan63/netflix-popular-movies-dataset"
DATA_DIR = "backend/data"


def load_movies():
    """
    Downloads the Netflix dataset if not already present
    and returns a pandas DataFrame.
    """

    # Download dataset (cached automatically by kagglehub)
    path = kagglehub.dataset_download(DATASET_NAME)

    # Find the CSV file inside the downloaded folder
    csv_files = [f for f in os.listdir(path) if f.endswith(".csv")]
    if not csv_files:
        raise FileNotFoundError("No CSV file found in dataset")

    csv_path = os.path.join(path, csv_files[0])

    # Load CSV
    movies = pd.read_csv(csv_path)

    return movies
