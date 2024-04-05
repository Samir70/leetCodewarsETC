-- https://leetcode.com/problems/employees-earning-more-than-their-managers/
# Write your MySQL query statement below
SELECT
  A.name AS Employee
FROM
  Employee A,
  Employee B
WHERE
  A.managerID = B.id
  AND A.salary > B.salary;