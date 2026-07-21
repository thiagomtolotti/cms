from pathlib import Path

from src.domain.file_repository import FileRepository
from src.constants import DATA_PATH


class DiskFileRepository(FileRepository):
    def get_from_path(self, path: Path) -> bytes:
        file_path = DATA_PATH / path

        if not file_path.exists():
            raise FileNotFoundError(f"File not found: {path}")

        with open(file_path, "rb") as file:
            return file.read()

    def get_complete_path(self, path: Path) -> Path:
        file_path = DATA_PATH / path

        if not file_path.exists():
            raise FileNotFoundError(f"File not found: {path}")

        return file_path
