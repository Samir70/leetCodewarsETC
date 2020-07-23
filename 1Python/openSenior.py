def isSenior(arr): 
    if arr[0]>=55 and arr[1] > 7:
        return "Senior"
    return "Open"

members = [[18, 20],[45, 2],[61, 12],[37, 6],[21, 21],[78, 9], [56, 4]]

status = ['Senior' if age>=55 and handicap>7 else 'Open' for age, handicap in members]
print(members)
print(status)