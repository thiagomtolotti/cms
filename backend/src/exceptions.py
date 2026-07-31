class DomainError(Exception):
    def __init__(self, message: str, status_code: int = 400):
        super().__init__(message)

        self.status_code = status_code


class EntityNotFoundError(DomainError):
    def __init__(self, message: str = "Entity not found"):
        super().__init__(message, status_code=404)


class InvalidObjectError(DomainError):
    def __init__(self, message: str = "Invalid object"):
        super().__init__(message, status_code=400)


class EntityAlreadyExistsError(DomainError):
    def __init__(self, message: str = "Entity already exists"):
        super().__init__(message, status_code=409)


class InvalidTokenError(DomainError):
    def __init__(self, message: str = "Invalid token"):
        super().__init__(message, status_code=401)


class IdentityProviderException(DomainError):
    def __init__(self, message: str = "Identity provider error"):
        super().__init__(message, status_code=500)
