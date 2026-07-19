"""Initial schema

Revision ID: c365ca95030e
Revises: 03ec23e6ec19
Create Date: 2026-07-19 21:07:59.306793

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'c365ca95030e'
down_revision: Union[str, Sequence[str], None] = '03ec23e6ec19'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    """Upgrade schema."""
    pass


def downgrade() -> None:
    """Downgrade schema."""
    pass
