from uuid import UUID

from fastapi import APIRouter
from fastapi.responses import JSONResponse

from src.modules.finances.application.transaction_service import TransactionService

from .types import ListTransactionsResponseDTO, MaintainTransactionRequestDTO


class FinancesRouter(APIRouter):
    def __init__(self, service: TransactionService):
        self.service = service

        super().__init__(
            prefix="/finance",
            tags=["Transactions"],
        )

        self.add_api_route(
            "",
            self._list_transactions,
            response_class=JSONResponse,
            response_model=ListTransactionsResponseDTO,
            methods=["GET"],
        )

        self.add_api_route(
            "/",
            self._list_transactions,
            response_class=JSONResponse,
            response_model=ListTransactionsResponseDTO,
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
            self._update_transaction,
            response_class=JSONResponse,
            methods=["PUT"],
        )

        self.add_api_route(
            "/{transaction_id}",
            self._delete_transaction,
            response_class=JSONResponse,
            methods=["DELETE"],
        )

    def _list_transactions(self) -> ListTransactionsResponseDTO:
        return ListTransactionsResponseDTO.from_domain(self.service.list_transactions())

    def _create_transaction(self, request: MaintainTransactionRequestDTO):
        self.service.create_transaction(request.to_domain(request))

        return {"message": "New transaction created"}

    def _update_transaction(
        self, transaction_id: UUID, request: MaintainTransactionRequestDTO
    ):
        self.service.update_transaction(
            transaction_id,
            request.to_domain(request),
        )

        return {"message": f"Transaction {transaction_id} updated"}

    def _delete_transaction(self, transaction_id: UUID):
        self.service.delete_transaction(transaction_id)

        return {"message": f"Transaction {transaction_id} deleted"}
