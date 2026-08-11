from uuid import UUID

from src.core.db.get_connection import get_connection
from src.modules.finances.domain.transaction import Transaction

from ..domain.transaction_repository import TransactionRepository


class SQLiteTransactionRepository(TransactionRepository):
    def list_(self) -> list[Transaction]:
        query = """
            SELECT id, amount, date, description, type, category
            FROM transactions
        """

        with get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(query)
            rows = cursor.fetchall()

            transactions = [
                Transaction(
                    id=row[0],
                    amount=row[1],
                    date=row[2],
                    description=row[3],
                    type=row[4],
                    category=row[5],
                )
                for row in rows
            ]

            return transactions

    def create(self, transaction: Transaction) -> None:
        query = """
            INSERT INTO transactions (id, amount, date, description, type)
            VALUES (?, ?, ?, ?, ?)
        """

        with get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                query,
                (
                    str(transaction.id),
                    transaction.amount,
                    transaction.date,
                    transaction.description,
                    transaction.type.value,
                ),
            )
            conn.commit()

    def update(self, transaction: Transaction) -> None:
        query = """
            UPDATE transactions
            SET amount = ?, date = ?, description = ?, type = ?
            WHERE id = ?
        """

        with get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(
                query,
                (
                    transaction.amount,
                    transaction.date,
                    transaction.description,
                    transaction.type.value,
                    str(transaction.id),
                ),
            )
            conn.commit()

    def delete(self, id: UUID) -> None:
        query = """
            DELETE FROM transactions
            WHERE id = ?
        """

        with get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(query, (str(id),))
            conn.commit()

    def exists(self, id: UUID) -> bool:
        query = """
            SELECT COUNT(*) FROM transactions WHERE id = ?
        """

        with get_connection() as conn:
            cursor = conn.cursor()
            cursor.execute(query, (str(id),))
            count = cursor.fetchone()[0]

            return count > 0
