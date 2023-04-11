"""empty message

Revision ID: fa4013c32005
Revises: a6293f2573f8
Create Date: 2023-03-17 10:30:36.663951

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'fa4013c32005'
down_revision = 'a6293f2573f8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('favorites',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('files3d_id', sa.Integer(), nullable=False),
    sa.Column('patterns_id', sa.Integer(), nullable=False),
    sa.Column('prints_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['files3d_id'], ['files3d.id'], ),
    sa.ForeignKeyConstraint(['patterns_id'], ['patterns.id'], ),
    sa.ForeignKeyConstraint(['prints_id'], ['prints.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('favorites')
    # ### end Alembic commands ###