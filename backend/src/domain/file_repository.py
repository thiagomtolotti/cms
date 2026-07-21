from abc import ABC, abstractmethod
from pathlib import Path


class FileRepository(ABC):
    @abstractmethod
    def get_from_path(self, path: Path) -> bytes: ...

    @abstractmethod
    def get_complete_path(self, path: Path) -> Path: ...

    @abstractmethod
    def save(self, path: Path, content: bytes) -> None: ...
