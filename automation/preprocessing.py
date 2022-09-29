import pandas as pd
import json
import os


def get_all_CSVs(path="../data/"):
    """
    Get all CSVs in a directory
    """
    files = os.listdir(path)
    files = [file for file in files if file.endswith(".csv")]
    print(files)
    return files


def merge_all_CSVs(path="../data/"):
    """
    Merge all CSVs in a directory
    """
    # if merged.csv exists, delete it
    if os.path.exists("../data/merged.csv"):
        os.remove("../data/merged.csv")
    files = get_all_CSVs(path)
    df = pd.DataFrame()
    for file in files:
        df = df.append(pd.read_csv(path + file))
    print(df)
    return df


def clean_data(df):
    df = df.dropna(subset=["Date"])
    df["Date"] = pd.to_datetime(df["Date"])
    df = df.set_index("Date")
    df = df.sort_index()
    df.columns = df.columns.str.strip()
    return df


def save_merged_csv(df, path="../data/merged.csv"):
    df.to_csv(path)


def interpolate(df):
    df = df.interpolate(method="spline", axis=0, order=3).ffill().bfill()
    return df


def generate_currency_dict(df):
    currencies = {}
    columns = df.columns
    print(columns)
    for column in columns:
        print(column)
        column = column.split("   ")
        # get text between brackets
        print(column)

    with open("../data/currencies.json", "w") as f:
        json.dump(currencies, f)
    return currencies


def rename_columns(df):
    # set column code as column name
    df.columns = df.columns.str.split("   ").str[-1]
    # get text between brackets
    df.columns = df.columns.str.extract("\((.*?)\)", expand=False)
    return df


def main(want_interpolation=True):
    df = merge_all_CSVs()
    df = clean_data(df)
    if want_interpolation:
        df = interpolate(df)
    df = rename_columns(df)
    save_merged_csv(df)
    generate_currency_dict(df)


if __name__ == "__main__":
    main()
