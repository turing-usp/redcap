import awswrangler as wr
import pandas as pd
from os import getenv


def load_to_aws(df: pd.DataFrame):
    path = getenv("S3PATH")
    database = getenv("DATABASE")
    table = getenv("TABLE")

    if database not in wr.catalog.databases().values:
        wr.catalog.create_database(database)

    wr.s3.to_parquet(
        df=df,
        path=path,
        dataset=True,
        database=database,
        table=table,
        mode="overwrite"
    )


if __name__ == "__main__":
    from dotenv import load_dotenv
    load_dotenv()

    load_to_aws('data.csv')
