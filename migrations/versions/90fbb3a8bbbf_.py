"""empty message

Revision ID: 90fbb3a8bbbf
Revises: 9a5671d7487b
Create Date: 2023-03-20 21:21:00.766263

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '90fbb3a8bbbf'
down_revision = '9a5671d7487b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('patterns', schema=None) as batch_op:
        batch_op.drop_constraint('patterns_description_key', type_='unique')
        batch_op.drop_constraint('patterns_file_type_key', type_='unique')
        batch_op.drop_constraint('patterns_name_key', type_='unique')
        batch_op.drop_constraint('patterns_size_key', type_='unique')

    with op.batch_alter_table('prints', schema=None) as batch_op:
        batch_op.drop_constraint('prints_description_key', type_='unique')
        batch_op.drop_constraint('prints_file_type_key', type_='unique')
        batch_op.drop_constraint('prints_name_key', type_='unique')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('prints', schema=None) as batch_op:
        batch_op.create_unique_constraint('prints_name_key', ['name'])
        batch_op.create_unique_constraint('prints_file_type_key', ['file_type'])
        batch_op.create_unique_constraint('prints_description_key', ['description'])

    with op.batch_alter_table('patterns', schema=None) as batch_op:
        batch_op.create_unique_constraint('patterns_size_key', ['size'])
        batch_op.create_unique_constraint('patterns_name_key', ['name'])
        batch_op.create_unique_constraint('patterns_file_type_key', ['file_type'])
        batch_op.create_unique_constraint('patterns_description_key', ['description'])

    # ### end Alembic commands ###
