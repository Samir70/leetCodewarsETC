import pandas as pd

# https://leetcode.com/problems/create-a-new-column/
def createBonusColumn(employees: pd.DataFrame) -> pd.DataFrame:
    employees['bonus'] = employees['salary'] * 2
    return employees

# https://leetcode.com/problems/reshape-data-concatenate/
# rows of df2 added to df1
def concatenateTables(df1: pd.DataFrame, df2: pd.DataFrame) -> pd.DataFrame:
    return pd.concat([df1, df2])