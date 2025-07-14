# **Sudoku Solver**

This directory contains my JavaScript solution for the "Sudoku Solver" kata from Codewars.

## **Problem Description**

The task is to write a function that solves a 9x9 Sudoku puzzle. The function takes a single argument: a 2D array representing the puzzle, where the value `0` signifies an unknown (empty) square.  
The Sudokus provided for testing are described as "easy" and determinable, meaning they can typically be solved with a brute-force approach without needing to guess and backtrack through multiple possibilities.  
For a detailed understanding of Sudoku rules, you can refer to the [Wikipedia article on Sudoku](http://en.wikipedia.org/wiki/Sudoku).  
**Example Puzzle Input:**  
```
[  
  [5,3,0,0,7,0,0,0,0],  
  [6,0,0,1,9,5,0,0,0],  
  [0,9,8,0,0,0,0,6,0],  
  [8,0,0,0,6,0,0,0,3],  
  [4,0,0,8,0,3,0,0,1],  
  [7,0,0,0,2,0,0,0,6],  
  [0,6,0,0,0,0,2,8,0],  
  [0,0,0,4,1,9,0,0,5],  
  [0,0,0,0,8,0,0,7,9]  
]
```

**Expected Solved Output:**  
```
[  
  [5,3,4,6,7,8,9,1,2],  
  [6,7,2,1,9,5,3,4,8],  
  [1,9,8,3,4,2,5,6,7],  
  [8,5,9,7,6,1,4,2,3],  
  [4,2,6,8,5,3,7,9,1],  
  [7,1,3,9,2,4,8,5,6],  
  [9,6,1,5,3,7,2,8,4],  
  [2,8,7,4,1,9,6,3,5],  
  [3,4,5,2,8,6,1,7,9]  
]
```

## **Codewars Kata Link**

You can find the original kata here: [https://www.codewars.com/kata/sudoku-solver/](https://www.codewars.com/kata/sudoku-solver/)

## **Solution Details**

The provided JavaScript solution employs an iterative brute-force approach to solve the Sudoku puzzle. It leverages several helper functions to determine possible values for empty cells based on Sudoku rules.  
**Core Logic:**  
The `solve(puzzle)` function is the main entry point. It creates a deep copy of the input puzzle to work with, preventing modification of the original. The heart of the solver is the nested `process()` function, which iteratively fills in numbers.  
For each cell in the 9x9 grid:

1. If the cell is empty (`0`) or currently holds an array of possibilities (from a previous iteration), the script calculates the possible numbers that can be placed in that cell.  
2. It gathers all numbers already present in the same 3x3 square, row, and column using `getSquareNums`, `getRowNums`, and `getColumnNums` respectively.  
3. These collected numbers are combined and filtered for uniqueness.  
4. The possible values for the current cell are determined by finding the numbers from 1-9 that are *not* present in the collected `nums`. This is done using the `differ` prototype method.  
5. If only one possible value remains for a cell (`odds.length \== 1`), that value is immediately placed into both the working `board` and the `puzzle` (which will be returned as the solution).  
6. If multiple possibilities exist, these possibilities are stored as an array in the `board` for that cell, and a blank counter is incremented.  
7. The `process()` function calls itself recursively until no more `blank` cells can be filled in a single pass. Since the kata guarantees "easy" puzzles, this iterative elimination approach should converge to a solution.

**Helper Functions and Prototype Extensions:**

* **`Array.prototype.copyNoRef()`:** A custom prototype method to create a deep copy of an array, ensuring that modifications to the copy do not affect the original array. This is crucial for maintaining the integrity of the puzzle state.  
* **`Array.prototype.differ(arr)`:** Another custom prototype method that returns elements from the current array that are *not* present in the `arr` argument. Used to find valid numbers for a cell.  
* **`Array.prototype.unique()`:** A custom prototype method to remove duplicate values from an array.  
* **`processNumsArr(arr)`:** Flattens a 2D array and filters out `0`s (empty cells), returning an array of actual numbers.  
* **`getSquareNums(board, row, col)`:** Extracts all non-zero numbers from the 3x3 square corresponding to the given row and col indices.  
* **`getRowNums(board, pos\_y)`:** Extracts all non-zero numbers from the specified `pos\_y` row.  
* **`getColumnNums(board, pos\_x)`:** Extracts all non-zero numbers from the specified `pos\_x` column.

This solution relies on the property of "easy" Sudokus where a direct elimination strategy is sufficient, without the need for complex backtracking algorithms.

## **Technologies Used**

* JavaScript
