import awswrangler as wr
from os import getenv


def get_from_aws():
    path = getenv("S3PATH")

    return wr.s3.read_parquet(path, dataset=True)


if __name__ == "__main__":
    from dotenv import load_dotenv
    load_dotenv()

    df = get_from_aws()
    print(df.head())
