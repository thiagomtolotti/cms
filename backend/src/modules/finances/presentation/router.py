from fastapi import APIRouter
from fastapi.responses import JSONResponse


class FinancesRouter(APIRouter):
    def __init__(self):
        super().__init__(
            prefix="/finance",
            tags=["Transactions"],
        )

        self.add_api_route(
            "",
            lambda: {"message": "List of transactions"},
            response_class=JSONResponse,
            methods=["GET"],
        )

        self.add_api_route(
            "/",
            lambda: {"message": "List of transactions"},
            response_class=JSONResponse,
            methods=["GET"],
        )

        self.add_api_route(
            "/",
            lambda: {"message": "Create a new transaction"},
            response_class=JSONResponse,
            methods=["POST"],
        )

        self.add_api_route(
            "/{transaction_id}",
            lambda: {"message": "Update transaction"},
            response_class=JSONResponse,
            methods=["PUT"],
        )

        self.add_api_route(
            "/{transaction_id}",
            lambda: {"message": "Delete transaction"},
            response_class=JSONResponse,
            methods=["DELETE"],
        )
