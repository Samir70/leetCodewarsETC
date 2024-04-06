import pandas as pd

# https://leetcode.com/problems/create-a-new-column/
def createBonusColumn(employees: pd.DataFrame) -> pd.DataFrame:
    employees['bonus'] = employees['salary'] * 2
    return employees