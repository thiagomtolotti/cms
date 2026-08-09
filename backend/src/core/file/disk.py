from pathlib import Path

from src.core.constants import DATA_PATH
from src.core.file.file_repository import FileRepository


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

    def save(self, path: Path, content: bytes) -> None:
        file_path = DATA_PATH / path

        if not file_path.parent.exists():
            file_path.parent.mkdir(parents=True, exist_ok=True)

        with open(file_path, "wb") as file:
            file.write(content)
