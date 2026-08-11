from uuid import UUID

from fastapi import APIRouter
from fastapi.responses import JSONResponse

from src.modules.finances.application.transaction_service import TransactionService

from ..domain.transaction import Transaction
from .types import (
    GetSankeyResponseDTO,
    ListTransactionsResponseDTO,
    MaintainTransactionRequestDTO,
    SankeyNodeDTO,
    SankeyNodeTargetDTO,
)


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

        self.add_api_route(
            "/sankey",
            self.get_sankey,
            response_class=JSONResponse,
            response_model=GetSankeyResponseDTO,
            methods=["GET"],
        )

    def _list_transactions(self) -> ListTransactionsResponseDTO:
        return ListTransactionsResponseDTO.from_domain(self.service.list_())

    def _create_transaction(self, request: MaintainTransactionRequestDTO):
        self.service.create(request.to_domain(request))

        return {"message": "New transaction created"}

    def _update_transaction(
        self, transaction_id: UUID, request: MaintainTransactionRequestDTO
    ):
        self.service.update(
            Transaction(
                amount=request.amount,
                date=request.date,
                description=request.description,
                type=request.type,
                id=transaction_id,
            )
        )

        return {"message": f"Transaction {transaction_id} updated"}

    def _delete_transaction(self, transaction_id: UUID):
        self.service.delete(transaction_id)

        return {"message": f"Transaction {transaction_id} deleted"}

    def get_sankey(self):
        return GetSankeyResponseDTO(
            nodes=[
                SankeyNodeDTO(
                    id="salario",
                    label="Salário",
                    targets=[
                        SankeyNodeTargetDTO(
                            id="entradas",
                            value=4800,
                        )
                    ],
                ),
                SankeyNodeDTO(
                    id="va",
                    label="VA",
                    targets=[
                        SankeyNodeTargetDTO(
                            id="entradas",
                            value=600,
                        )
                    ],
                ),
                SankeyNodeDTO(
                    id="entradas",
                    label="Entradas",
                    targets=[
                        SankeyNodeTargetDTO(
                            id="aluguel",
                            value=1363,
                        ),
                        SankeyNodeTargetDTO(
                            id="contas",
                            value=350,
                        ),
                        SankeyNodeTargetDTO(
                            id="terapia",
                            value=520,
                        ),
                    ],
                ),
                SankeyNodeDTO(
                    id="contas",
                    label="Contas",
                    targets=[
                        SankeyNodeTargetDTO(
                            id="luz",
                            value=150,
                        ),
                        SankeyNodeTargetDTO(
                            id="internet",
                            value=200,
                        ),
                    ],
                ),
                SankeyNodeDTO(
                    id="aluguel",
                    label="Aluguel",
                    targets=[],
                ),
                SankeyNodeDTO(
                    id="luz",
                    label="Luz",
                    targets=[],
                ),
                SankeyNodeDTO(
                    id="internet",
                    label="Internet",
                    targets=[],
                ),
            ],
        )
