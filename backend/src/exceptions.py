class DomainError(Exception):
    pass


class EntityNotFoundError(DomainError):
    pass


class InvalidObjectError(DomainError):
    pass


class EntityAlreadyExistsError(DomainError):
    pass


class InvalidTokenError(DomainError):
    pass
