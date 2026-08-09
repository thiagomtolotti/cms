from fastapi import APIRouter
from fastapi.responses import JSONResponse

from .types import MaintainTransactionRequestDTO


class FinancesRouter(APIRouter):
    def __init__(self):
        super().__init__(
            prefix="/finance",
            tags=["Transactions"],
        )

        self.add_api_route(
            "",
            self._list_transactions,
            response_class=JSONResponse,
            methods=["GET"],
        )

        self.add_api_route(
            "/",
            self._list_transactions,
            response_class=JSONResponse,
            methods=["GET"],
        )

        self.add_api_route(
            "",
            self._create_transaction,
            response_class=JSONResponse,
            methods=["POST"],
        )

        self.add_api_route(
            "/",
            self._create_transaction,
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

    def _list_transactions(self):
        return {"message": "List of transactions"}

    def _create_transaction(self, request: MaintainTransactionRequestDTO):
        print(request)

        return {"message": "New transaction created"}
