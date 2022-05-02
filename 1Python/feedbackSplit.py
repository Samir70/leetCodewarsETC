import functools

def solution(feedback, size):
    return functools.reduce(lambda acc, n: {'cur': acc['cur'] + ' ' + n, 'out': acc['out']} if len(acc['cur'] + ' ' + n) <= size else {'cur':n, 'out': [*acc['out'], n]}, feedback.split(' '), {'cur': '', 'out': []})

print(solution('This is an example of feedback', 8))

#easier to import textwrap and use textwrap.wrap(feedback, size)