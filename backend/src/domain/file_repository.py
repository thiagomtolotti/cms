from abc import ABC, abstractmethod
from pathlib import Path


class FileRepository(ABC):
    @abstractmethod
    def get_from_path(self, path: Path) -> bytes: ...
