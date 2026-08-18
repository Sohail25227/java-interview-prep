// AUTO-GENERATED from 'DSA Master Sheet.xlsx' — the full 502-problem master sheet.
// Hierarchy: Phase -> Topic -> Subtopic -> Problem.
// difficulty: 1..5 (matches the ★ rating in the sheet).
// Creator: Digital COE Gen AI Team.

// Points scale by star-difficulty (harder problems reward more).
export const DIFFICULTY_POINTS = { 1: 10, 2: 15, 3: 20, 4: 30, 5: 40 }

export const DIFFICULTY_LABEL = { 1: 'Very Easy', 2: 'Easy', 3: 'Medium', 4: 'Hard', 5: 'Very Hard' }

// status pipeline (mirrors the sheet's Status column)
export const STATUS_ORDER = ['not_attempted', 'tried', 'logic', 'code', 'done']
export const STATUS_META = {
  not_attempted: { label: 'Not Attempted', short: 'To do', emoji: '⚪' },
  tried:         { label: "Tried (couldn't think of logic)", short: 'Tried', emoji: '🟠' },
  logic:         { label: "Logic Done (couldn't code)", short: 'Logic', emoji: '🟡' },
  code:          { label: 'Code Done (has error)', short: 'Coding', emoji: '🔵' },
  done:          { label: 'Done', short: 'Done', emoji: '🟢' },
}

export const dsaPhases = [
  {
    id: "phase-1",
    title: "Phase 1 · Fundamentals & Linear DS",
    emoji: "🧱",
    color: "#f59e0b",
    topics: [
      {
        id: "phase-1-arrays",
        name: "Arrays",
        subtopics: [
          {
            name: "Array Basics",
            problems: [
              { id: "dsa-1", sr: 1, name: "Find Element at a Given Index", difficulty: 1, url: "https://www.geeksforgeeks.org/problems/c-array-print-an-element-set-25933/1" },
              { id: "dsa-2", sr: 2, name: "Min and Max in Array", difficulty: 1, url: "https://www.geeksforgeeks.org/problems/find-minimum-and-maximum-element-in-an-array4428/1" },
              { id: "dsa-3", sr: 3, name: "Sum of Array", difficulty: 1, url: "https://www.geeksforgeeks.org/problems/sum-of-array2326/1" },
              { id: "dsa-4", sr: 4, name: "Sum of Digits", difficulty: 1, url: "https://www.geeksforgeeks.org/problems/sum-of-digits1742/1" },
              { id: "dsa-5", sr: 5, name: "Check If Array is Sorted", difficulty: 1, url: "https://www.geeksforgeeks.org/problems/check-if-an-array-is-sorted0701/1" },
              { id: "dsa-6", sr: 6, name: "Alternates In Array", difficulty: 1, url: "https://www.geeksforgeeks.org/problems/print-alternate-elements-of-an-array/0" },
            ],
          },
          {
            name: "Core Manipulations",
            problems: [
              { id: "dsa-7", sr: 7, name: "Remove Duplicates from Array", difficulty: 2, url: "https://leetcode.com/problems/remove-duplicates-from-sorted-array/description/" },
              { id: "dsa-8", sr: 8, name: "Second Largest in Array", difficulty: 2, url: "https://www.geeksforgeeks.org/problems/second-largest3735/1" },
              { id: "dsa-9", sr: 9, name: "Reverse an Array", difficulty: 2, url: "https://www.geeksforgeeks.org/problems/reverse-an-array/1" },
              { id: "dsa-10", sr: 10, name: "Missing Number", difficulty: 2, url: "https://leetcode.com/problems/missing-number/description/" },
              { id: "dsa-11", sr: 11, name: "Segregate 0s and 1s", difficulty: 2, url: "https://www.geeksforgeeks.org/problems/segregate-0s-and-1s5106/1" },
              { id: "dsa-12", sr: 12, name: "Maximum Consecutive Ones", difficulty: 2, url: "https://leetcode.com/problems/max-consecutive-ones/description/" },
              { id: "dsa-13", sr: 13, name: "Palindromic Array", difficulty: 2, url: "https://www.geeksforgeeks.org/problems/palindromic-array-1587115620/1" },
              { id: "dsa-14", sr: 14, name: "Move Zeroes to End", difficulty: 2, url: "https://leetcode.com/problems/move-zeroes/description/" },
              { id: "dsa-15", sr: 15, name: "Sort array with 0's 1's and 2's (Dutch Flag)", difficulty: 2, url: "https://leetcode.com/problems/sort-colors/" },
            ],
          },
          {
            name: "Intermediate Problems",
            problems: [
              { id: "dsa-16", sr: 16, name: "Equilibrium Point", difficulty: 3, url: "https://www.geeksforgeeks.org/problems/equilibrium-point-1587115620/1" },
              { id: "dsa-17", sr: 17, name: "Reverse Integer", difficulty: 3, url: "https://leetcode.com/problems/reverse-integer/description/" },
              { id: "dsa-18", sr: 18, name: "Leaders in Array", difficulty: 3, url: "https://www.geeksforgeeks.org/problems/leaders-in-an-array-1587115620/1?itm_source=geeksforgeeks&itm_medium=article&itm_campaign=practice_card" },
              { id: "dsa-19", sr: 19, name: "Increasing Array", difficulty: 3, url: "https://cses.fi/problemset/task/1094" },
              { id: "dsa-20", sr: 20, name: "Rearrange Array Elements by Sign", difficulty: 3, url: "https://leetcode.com/problems/rearrange-array-elements-by-sign/" },
              { id: "dsa-21", sr: 21, name: "Rotate Array by One", difficulty: 3, url: "https://www.geeksforgeeks.org/problems/cyclically-rotate-an-array-by-one2614/1" },
              { id: "dsa-22", sr: 22, name: "Majority Element I (Boyer - Moore)", difficulty: 3, url: "https://leetcode.com/problems/majority-element/" },
            ],
          },
          {
            name: "Advanced Problems",
            problems: [
              { id: "dsa-23", sr: 23, name: "Rotate Array by K steps", difficulty: 4, url: "https://leetcode.com/problems/rotate-array/" },
              { id: "dsa-24", sr: 24, name: "Wiggle Sort II", difficulty: 4, url: "https://leetcode.com/problems/wiggle-sort-ii/description/" },
              { id: "dsa-25", sr: 25, name: "Majority Element II", difficulty: 4, url: "https://leetcode.com/problems/majority-element-ii/" },
              { id: "dsa-26", sr: 26, name: "Best Time to Buy and Sell Stock", difficulty: 4, url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/description/" },
              { id: "dsa-27", sr: 27, name: "Next Permutation", difficulty: 4, url: "https://leetcode.com/problems/next-permutation/" },
              { id: "dsa-28", sr: 28, name: "Maximum Value Of Expression", difficulty: 4, url: "https://www.geeksforgeeks.org/problems/maximum-value-of-expression2515/1" },
              { id: "dsa-29", sr: 29, name: "First Missing Positive", difficulty: 5, url: "https://leetcode.com/problems/first-missing-positive/" },
            ],
          },
        ],
      },
      {
        id: "phase-1-2d-arrays",
        name: "2D Arrays",
        subtopics: [
          {
            name: "Matrix Basics",
            problems: [
              { id: "dsa-30", sr: 30, name: "Sum of elements in a matrix", difficulty: 2, url: "https://www.geeksforgeeks.org/problems/sum-of-elements-in-a-matrix2000/1" },
              { id: "dsa-31", sr: 31, name: "Count Number Of Zeroes", difficulty: 2, url: "https://www.geeksforgeeks.org/problems/count-zeros-in-a-sorted-matrix/1" },
              { id: "dsa-32", sr: 32, name: "Count Negative Numbers in a matrix", difficulty: 2, url: "https://leetcode.com/problems/count-negative-numbers-in-a-sorted-matrix/" },
              { id: "dsa-33", sr: 33, name: "Matrix Diagonal Sum", difficulty: 2, url: "https://leetcode.com/problems/matrix-diagonal-sum/" },
            ],
          },
          {
            name: "Matrix Operations",
            problems: [
              { id: "dsa-34", sr: 34, name: "Addition of Two Square Matrix", difficulty: 3, url: "https://www.geeksforgeeks.org/problems/addition-of-two-square-matrices4916/1" },
              { id: "dsa-35", sr: 35, name: "Multiply Matrices", difficulty: 3, url: "https://www.geeksforgeeks.org/problems/multiply-matrices/1" },
              { id: "dsa-36", sr: 36, name: "Transpose Matrix", difficulty: 3, url: "https://leetcode.com/problems/transpose-matrix/" },
            ],
          },
          {
            name: "Advanced Matrix",
            problems: [
              { id: "dsa-37", sr: 37, name: "Spiral Matrix", difficulty: 4, url: "https://leetcode.com/problems/spiral-matrix/" },
              { id: "dsa-38", sr: 38, name: "ZigZag Matrix", difficulty: 4, url: "https://www.geeksforgeeks.org/problems/print-matrix-in-zig-zag-fashion--122748/1" },
              { id: "dsa-39", sr: 39, name: "Rotate Matrix (90°)", difficulty: 4, url: "https://leetcode.com/problems/rotate-image/" },
              { id: "dsa-40", sr: 40, name: "Determine Whether matrix can be obtained by rotation", difficulty: 4, url: "https://leetcode.com/problems/determine-whether-matrix-can-be-obtained-by-rotation/" },
              { id: "dsa-41", sr: 41, name: "Set Matrix Zeroes", difficulty: 5, url: "https://leetcode.com/problems/set-matrix-zeroes/" },
            ],
          },
        ],
      },
      {
        id: "phase-1-basic-maths",
        name: "Basic Maths",
        subtopics: [
          {
            name: "Number Theory Basics",
            problems: [
              { id: "dsa-42", sr: 42, name: "Check if a number is Armstrong", difficulty: 1, url: "https://www.geeksforgeeks.org/problems/armstrong-numbers2727/1" },
              { id: "dsa-43", sr: 43, name: "Print all Divisors of a Number", difficulty: 1, url: "https://www.geeksforgeeks.org/problems/all-divisors-of-a-number/1" },
              { id: "dsa-44", sr: 44, name: "Check if a number is Prime", difficulty: 1, url: "https://www.geeksforgeeks.org/problems/prime-number2314/1" },
              { id: "dsa-45", sr: 45, name: "GCD / HCF of 2 numbers", difficulty: 1, url: "https://www.geeksforgeeks.org/problems/gcd-of-two-numbers3459/1" },
              { id: "dsa-46", sr: 46, name: "Prime Factorisation of a Number", difficulty: 2, url: "https://www.geeksforgeeks.org/problems/largest-prime-factor2601/1" },
              { id: "dsa-47", sr: 47, name: "Count Primes in range L to R", difficulty: 3, url: "https://www.geeksforgeeks.org/problems/count-primes-in-range1604/1" },
            ],
          },
        ],
      },
      {
        id: "phase-1-strings",
        name: "Strings",
        subtopics: [
          {
            name: "String Fundamentals",
            problems: [
              { id: "dsa-48", sr: 48, name: "Maximum Occuring Character", difficulty: 1, url: "https://www.geeksforgeeks.org/problems/maximum-occuring-character-1587115620/1" },
              { id: "dsa-49", sr: 49, name: "Remove Spaces", difficulty: 1, url: "https://www.geeksforgeeks.org/problems/remove-spaces0128/1" },
              { id: "dsa-50", sr: 50, name: "Print first letter of every word in the string", difficulty: 2, url: "https://www.geeksforgeeks.org/problems/print-first-letter-of-every-word-in-the-string3632/1" },
              { id: "dsa-51", sr: 51, name: "Remove Consecutive Characters", difficulty: 2, url: "https://www.geeksforgeeks.org/problems/consecutive-elements2306/1" },
              { id: "dsa-52", sr: 52, name: "Valid Palindrome", difficulty: 2, url: "https://leetcode.com/problems/valid-palindrome/description/" },
              { id: "dsa-53", sr: 53, name: "Valid Anagram", difficulty: 2, url: "https://leetcode.com/problems/valid-anagram/" },
              { id: "dsa-54", sr: 54, name: "Isomorphic Strings", difficulty: 2, url: "https://leetcode.com/problems/isomorphic-strings/" },
            ],
          },
          {
            name: "String Manipulation",
            problems: [
              { id: "dsa-55", sr: 55, name: "Delete Characters To Make Fancy String", difficulty: 3, url: "https://leetcode.com/problems/delete-characters-to-make-fancy-string/description/" },
              { id: "dsa-56", sr: 56, name: "Reverse Words in a String", difficulty: 3, url: "https://leetcode.com/problems/reverse-words-in-a-string/" },
              { id: "dsa-57", sr: 57, name: "String to integer (atoi)", difficulty: 3, url: "https://leetcode.com/problems/string-to-integer-atoi/" },
              { id: "dsa-58", sr: 58, name: "Roman to integer", difficulty: 3, url: "https://leetcode.com/problems/roman-to-integer/description/" },
              { id: "dsa-59", sr: 59, name: "Rotate String", difficulty: 3, url: "https://leetcode.com/problems/rotate-string/description/" },
              { id: "dsa-60", sr: 60, name: "Longest common prefix", difficulty: 3, url: "https://leetcode.com/problems/longest-common-prefix/description/" },
            ],
          },
          {
            name: "Advanced Problems",
            problems: [
              { id: "dsa-61", sr: 61, name: "Longest palindromic substring", difficulty: 4, url: "https://leetcode.com/problems/longest-palindromic-substring/" },
              { id: "dsa-62", sr: 62, name: "Multiply Two Strings", difficulty: 4, url: "https://www.geeksforgeeks.org/problems/multiply-two-strings/1" },
              { id: "dsa-63", sr: 63, name: "Maximum Nesting Depth of the Parentheses", difficulty: 4, url: "https://leetcode.com/problems/maximum-nesting-depth-of-the-parentheses/" },
              { id: "dsa-64", sr: 64, name: "Beauty Of All substrings", difficulty: 4, url: "https://leetcode.com/problems/sum-of-beauty-of-all-substrings/" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "phase-2",
    title: "Phase 2 · Searching Algorithms",
    emoji: "🔍",
    color: "#22c55e",
    topics: [
      {
        id: "phase-2-binary-search",
        name: "Binary Search",
        subtopics: [
          {
            name: "BS on 1D Array Basics",
            problems: [
              { id: "dsa-65", sr: 65, name: "Search X in sorted array", difficulty: 2, url: "https://leetcode.com/problems/binary-search/description/" },
              { id: "dsa-66", sr: 66, name: "Lower Bound", difficulty: 2, url: "https://www.geeksforgeeks.org/problems/implement-lower-bound/1" },
              { id: "dsa-67", sr: 67, name: "Upper Bound", difficulty: 2, url: "https://www.geeksforgeeks.org/problems/implement-upper-bound/1" },
              { id: "dsa-68", sr: 68, name: "Search insert position", difficulty: 2, url: "https://leetcode.com/problems/search-insert-position/" },
              { id: "dsa-69", sr: 69, name: "Floor In Sorted Array", difficulty: 2, url: "https://www.geeksforgeeks.org/problems/floor-in-a-sorted-array-1587115620/1" },
              { id: "dsa-70", sr: 70, name: "Ceil In Sorted Array", difficulty: 2, url: "https://www.geeksforgeeks.org/problems/ceil-in-a-sorted-array/1" },
              { id: "dsa-71", sr: 71, name: "Guess Number Higher or Lower API", difficulty: 2, url: "https://leetcode.com/problems/guess-number-higher-or-lower/description/" },
              { id: "dsa-72", sr: 72, name: "First 1 in a Sorted Binary Array", difficulty: 2, url: "https://www.geeksforgeeks.org/problems/index-of-first-1-in-a-sorted-array-of-0s-and-1s4048/1" },
              { id: "dsa-73", sr: 73, name: "Kth Missing Positive Number", difficulty: 2, url: "https://leetcode.com/problems/kth-missing-positive-number/description/" },
              { id: "dsa-74", sr: 74, name: "Find minimum in Rotated Sorted Array", difficulty: 2, url: "https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/" },
            ],
          },
          {
            name: "BS on 1D Array Intermediate",
            problems: [
              { id: "dsa-75", sr: 75, name: "First and last occurrence", difficulty: 3, url: "https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/description/" },
              { id: "dsa-76", sr: 76, name: "Search in rotated sorted array-I", difficulty: 3, url: "https://leetcode.com/problems/search-in-rotated-sorted-array/" },
              { id: "dsa-77", sr: 77, name: "Search in rotated sorted array-II", difficulty: 3, url: "https://leetcode.com/problems/search-in-rotated-sorted-array-ii/" },
              { id: "dsa-78", sr: 78, name: "Single element in a Sorted Array", difficulty: 3, url: "https://leetcode.com/problems/single-element-in-a-sorted-array/" },
              { id: "dsa-79", sr: 79, name: "Find kth Rotation", difficulty: 3, url: "https://www.geeksforgeeks.org/problems/rotation4723/1" },
              { id: "dsa-80", sr: 80, name: "Find Peak Element", difficulty: 3, url: "https://leetcode.com/problems/find-peak-element/" },
            ],
          },
          {
            name: "BS on 2D Arrays",
            problems: [
              { id: "dsa-81", sr: 81, name: "Count Negative Numbers in a Sorted Matrix", difficulty: 2, url: "https://leetcode.com/problems/count-negative-numbers-in-a-sorted-matrix/description/" },
              { id: "dsa-82", sr: 82, name: "Find row with maximum 1's", difficulty: 2, url: "https://leetcode.com/problems/row-with-maximum-ones/description/" },
              { id: "dsa-83", sr: 83, name: "Search a 2D Matrix I", difficulty: 2, url: "https://leetcode.com/problems/search-a-2d-matrix/description/" },
              { id: "dsa-84", sr: 84, name: "Search a 2D Matrix II", difficulty: 3, url: "https://leetcode.com/problems/search-a-2d-matrix-ii/description/" },
              { id: "dsa-85", sr: 85, name: "Find Peak Element - II", difficulty: 4, url: "https://leetcode.com/problems/find-a-peak-element-ii/description/" },
              { id: "dsa-86", sr: 86, name: "Median in a row-wise sorted Matrix", difficulty: 4, url: "https://www.geeksforgeeks.org/problems/median-in-a-row-wise-sorted-matrix1527/1" },
            ],
          },
          {
            name: "BS on Answer",
            problems: [
              { id: "dsa-87", sr: 87, name: "Sqrt (x)", difficulty: 2, url: "https://leetcode.com/problems/sqrtx/" },
              { id: "dsa-88", sr: 88, name: "Valid Perfect Square", difficulty: 2, url: "https://leetcode.com/problems/valid-perfect-square/description/" },
              { id: "dsa-89", sr: 89, name: "Find Nth root of a number", difficulty: 3, url: "https://www.geeksforgeeks.org/problems/find-nth-root-of-m5843/1" },
              { id: "dsa-90", sr: 90, name: "Koko eating bananas", difficulty: 3, url: "https://leetcode.com/problems/koko-eating-bananas/" },
              { id: "dsa-91", sr: 91, name: "Find the Smallest Divisor Given a Threshold", difficulty: 3, url: "https://leetcode.com/problems/find-the-smallest-divisor-given-a-threshold/" },
              { id: "dsa-92", sr: 92, name: "Minimum Speed to Arrive on Time", difficulty: 3, url: "https://leetcode.com/problems/minimum-speed-to-arrive-on-time/" },
              { id: "dsa-93", sr: 93, name: "Minimum days to make M bouquets", difficulty: 3, url: "https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/" },
              { id: "dsa-94", sr: 94, name: "Capacity to Ship Packages Within D Days", difficulty: 3, url: "https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/" },
              { id: "dsa-95", sr: 95, name: "Book Allocation Problem", difficulty: 3, url: "https://www.geeksforgeeks.org/problems/allocate-minimum-number-of-pages0937/1" },
              { id: "dsa-96", sr: 96, name: "Split Array Largest Sum", difficulty: 4, url: "https://leetcode.com/problems/split-array-largest-sum/" },
              { id: "dsa-97", sr: 97, name: "Painter's Partition Problem", difficulty: 4, url: "https://www.geeksforgeeks.org/problems/the-painters-partition-problem1535/1" },
              { id: "dsa-98", sr: 98, name: "K-th element of two sorted Arrays", difficulty: 4, url: "https://www.geeksforgeeks.org/problems/k-th-element-of-two-sorted-array1317/1" },
              { id: "dsa-99", sr: 99, name: "Aggressive Cows", difficulty: 5, url: "https://www.geeksforgeeks.org/problems/aggressive-cows/0" },
              { id: "dsa-100", sr: 100, name: "Minimize Max Distance to Gas Station", difficulty: 5, url: "https://www.geeksforgeeks.org/problems/minimize-max-distance-to-gas-station/1" },
              { id: "dsa-101", sr: 101, name: "Median of Two Sorted Arrays", difficulty: 5, url: "https://leetcode.com/problems/median-of-two-sorted-arrays/description/" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "phase-3",
    title: "Phase 3 · Algorithmic Thinking",
    emoji: "🧩",
    color: "#38bdf8",
    topics: [
      {
        id: "phase-3-recursion",
        name: "Recursion",
        subtopics: [
          {
            name: "Introduction to Recursion",
            problems: [
              { id: "dsa-102", sr: 102, name: "Print 1 to N without using loops", difficulty: 1, url: "https://www.geeksforgeeks.org/problems/print-1-to-n-without-using-loops3621/1" },
              { id: "dsa-103", sr: 103, name: "Print N to 1 without loop", difficulty: 1, url: null },
              { id: "dsa-104", sr: 104, name: "Sum of first N numbers", difficulty: 1, url: "https://www.geeksforgeeks.org/problems/sum-of-series2811/1" },
              { id: "dsa-105", sr: 105, name: "Factorial of a given number", difficulty: 1, url: "https://www.geeksforgeeks.org/problems/factorial5739/1" },
              { id: "dsa-106", sr: 106, name: "Fibonacci Number", difficulty: 1, url: "https://leetcode.com/problems/fibonacci-number/" },
            ],
          },
          {
            name: "Recursion on Arrays & Math",
            problems: [
              { id: "dsa-107", sr: 107, name: "Reverse an array", difficulty: 2, url: "https://www.geeksforgeeks.org/problems/reverse-an-array/1" },
              { id: "dsa-108", sr: 108, name: "Pow(x, n)", difficulty: 2, url: "https://leetcode.com/problems/powx-n/" },
              { id: "dsa-109", sr: 109, name: "Count Good Numbers", difficulty: 2, url: "https://leetcode.com/problems/count-good-numbers/" },
              { id: "dsa-110", sr: 110, name: "Recursive Implementation of atoi()", difficulty: 3, url: "https://www.geeksforgeeks.org/problems/implement-atoi/1" },
            ],
          },
          {
            name: "Recursion On strings",
            problems: [
              { id: "dsa-111", sr: 111, name: "Generate Binary Strings Without Consecutive 1s", difficulty: 3, url: "https://leetcode.com/problems/generate-binary-strings-without-adjacent-zeros/" },
            ],
          },
        ],
      },
      {
        id: "phase-3-sorting",
        name: "Sorting",
        subtopics: [
          {
            name: "Sorting Fundamentals",
            problems: [
              { id: "dsa-112", sr: 112, name: "Linear Search", difficulty: 1, url: "https://www.geeksforgeeks.org/problems/search-an-element-in-an-array-1587115621/1" },
              { id: "dsa-113", sr: 113, name: "Sort An Array (Implement Merge / Quick Sort)", difficulty: 2, url: "https://leetcode.com/problems/sort-an-array/description/" },
              { id: "dsa-114", sr: 114, name: "Sort Array By Parity", difficulty: 2, url: "https://leetcode.com/problems/sort-array-by-parity-ii/description/?envType=problem-list-v2&envId=sorting" },
              { id: "dsa-115", sr: 115, name: "Maximum Gap", difficulty: 3, url: "https://leetcode.com/problems/maximum-gap/description/?envType=problem-list-v2&envId=sorting" },
            ],
          },
          {
            name: "Custom Comparator Sorting",
            problems: [
              { id: "dsa-116", sr: 116, name: "Sort Elements by Decreasing Frequency", difficulty: 3, url: "https://www.geeksforgeeks.org/problems/sorting-elements-of-an-array-by-frequency-1587115621/1" },
              { id: "dsa-117", sr: 117, name: "Reorder Data In Log Files", difficulty: 4, url: "https://leetcode.com/problems/reorder-data-in-log-files/description/?envType=problem-list-v2&envId=sorting" },
            ],
          },
          {
            name: "Advanced Sorting",
            problems: [
              { id: "dsa-118", sr: 118, name: "Merge Intervals", difficulty: 3, url: "https://leetcode.com/problems/merge-intervals/description/" },
              { id: "dsa-119", sr: 119, name: "Count Inversions (Merge Sort)", difficulty: 5, url: "https://www.geeksforgeeks.org/problems/inversion-of-array-1587115620/1" },
              { id: "dsa-120", sr: 120, name: "Reverse Pairs (Merge Sort)", difficulty: 5, url: "https://leetcode.com/problems/reverse-pairs/" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "phase-4",
    title: "Phase 4 · Object Oriented Concepts",
    emoji: "🧰",
    color: "#a855f7",
    topics: [
      {
        id: "phase-4-oops",
        name: "OOPS",
        subtopics: [
          {
            name: "OOPS Fundamentals",
            problems: [
              { id: "dsa-121", sr: 121, name: "Classes, Objects & Constructors", difficulty: 1, url: null },
              { id: "dsa-122", sr: 122, name: "Inheritance & Polymorphism", difficulty: 2, url: null },
              { id: "dsa-123", sr: 123, name: "Encapsulation & Abstraction", difficulty: 2, url: null },
              { id: "dsa-124", sr: 124, name: "Interfaces & Abstract Classes", difficulty: 3, url: null },
            ],
          },
          {
            name: "Design Patterns",
            problems: [
              { id: "dsa-125", sr: 125, name: "Singleton Pattern", difficulty: 3, url: null },
              { id: "dsa-126", sr: 126, name: "Factory Pattern", difficulty: 4, url: null },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "phase-5",
    title: "Phase 5 · Advanced Linear DS",
    emoji: "🔗",
    color: "#ec4899",
    topics: [
      {
        id: "phase-5-linkedlist",
        name: "Linkedlist",
        subtopics: [
          {
            name: "Foundation",
            problems: [
              { id: "dsa-127", sr: 127, name: "Array to Linked List", difficulty: 1, url: "https://www.geeksforgeeks.org/problems/introduction-to-linked-list/1" },
              { id: "dsa-128", sr: 128, name: "Count Nodes / Find Length of Linked List", difficulty: 1, url: "https://www.geeksforgeeks.org/problems/count-nodes-of-linked-list/1" },
              { id: "dsa-129", sr: 129, name: "Search in a Linked List", difficulty: 1, url: "https://www.geeksforgeeks.org/problems/search-in-linked-list-1664434326/1" },
            ],
          },
          {
            name: "Insertion and Deletion",
            problems: [
              { id: "dsa-130", sr: 130, name: "Insert Node at Head / Tail", difficulty: 2, url: "https://www.hackerrank.com/challenges/insert-a-node-at-the-tail-of-a-linked-list/problem" },
              { id: "dsa-131", sr: 131, name: "Insert in Middle of Linked List", difficulty: 2, url: "https://www.geeksforgeeks.org/problems/insert-in-middle-of-linked-list/1" },
              { id: "dsa-132", sr: 132, name: "Remove Linked List Elements (By Value)", difficulty: 2, url: "https://leetcode.com/problems/remove-linked-list-elements/" },
              { id: "dsa-133", sr: 133, name: "Remove Duplicates from Sorted List", difficulty: 2, url: "https://leetcode.com/problems/remove-duplicates-from-sorted-list/" },
              { id: "dsa-134", sr: 134, name: "Delete Node in a Linked List (Given only node ref)", difficulty: 3, url: "https://leetcode.com/problems/delete-node-in-a-linked-list/" },
              { id: "dsa-135", sr: 135, name: "Remove Duplicates from Unsorted List", difficulty: 3, url: "https://leetcode.com/problems/remove-duplicates-from-an-unsorted-linked-list/" },
              { id: "dsa-136", sr: 136, name: "Delete the Middle Node of a Linked List", difficulty: 3, url: "https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/" },
            ],
          },
          {
            name: "Fast and Slow Pointer",
            problems: [
              { id: "dsa-137", sr: 137, name: "Middle of the Linked List", difficulty: 2, url: "https://leetcode.com/problems/middle-of-the-linked-list/" },
              { id: "dsa-138", sr: 138, name: "Linked List Cycle", difficulty: 2, url: "https://leetcode.com/problems/linked-list-cycle/" },
              { id: "dsa-139", sr: 139, name: "Intersection of Two Linked Lists", difficulty: 2, url: "https://leetcode.com/problems/intersection-of-two-linked-lists/" },
              { id: "dsa-140", sr: 140, name: "Length of Loop in Linked List", difficulty: 3, url: "https://www.geeksforgeeks.org/problems/find-length-of-loop/1" },
              { id: "dsa-141", sr: 141, name: "Linked List Cycle II (Find Starting Point)", difficulty: 3, url: "https://leetcode.com/problems/linked-list-cycle-ii/" },
              { id: "dsa-142", sr: 142, name: "Remove Loop in Linked List", difficulty: 3, url: "https://www.geeksforgeeks.org/problems/remove-loop-in-linked-list/1" },
              { id: "dsa-143", sr: 143, name: "Remove Nth Node From End of List", difficulty: 3, url: "https://leetcode.com/problems/remove-nth-node-from-end-of-list/" },
            ],
          },
          {
            name: "Reversals and Rotations",
            problems: [
              { id: "dsa-144", sr: 144, name: "Reverse a Linked List (Iterative & Recursive)", difficulty: 2, url: "https://leetcode.com/problems/reverse-linked-list/" },
              { id: "dsa-145", sr: 145, name: "Palindrome Linked List", difficulty: 2, url: "https://leetcode.com/problems/palindrome-linked-list/" },
              { id: "dsa-146", sr: 146, name: "Swap Nodes in Pairs", difficulty: 3, url: "https://leetcode.com/problems/swap-nodes-in-pairs/" },
              { id: "dsa-147", sr: 147, name: "Odd Even Linked List (By Index)", difficulty: 3, url: "https://leetcode.com/problems/odd-even-linked-list/" },
              { id: "dsa-148", sr: 148, name: "Reorder List", difficulty: 4, url: "https://leetcode.com/problems/reorder-list/" },
              { id: "dsa-149", sr: 149, name: "Rotate List", difficulty: 4, url: "https://leetcode.com/problems/rotate-list/" },
            ],
          },
          {
            name: "Math in Linked List",
            problems: [
              { id: "dsa-150", sr: 150, name: "Add One to a Number Represented by LL", difficulty: 3, url: "https://www.geeksforgeeks.org/problems/add-1-to-a-number-represented-as-linked-list/1" },
              { id: "dsa-151", sr: 151, name: "Add Two Numbers (Reverse Order)", difficulty: 3, url: "https://leetcode.com/problems/add-two-numbers/" },
              { id: "dsa-152", sr: 152, name: "Add Two Numbers II (Forward Order)", difficulty: 4, url: "https://leetcode.com/problems/add-two-numbers-ii/" },
            ],
          },
          {
            name: "Sorting, Merging & Segregating",
            problems: [
              { id: "dsa-153", sr: 153, name: "Merge Two Sorted Lists", difficulty: 2, url: "https://leetcode.com/problems/merge-two-sorted-lists/" },
              { id: "dsa-154", sr: 154, name: "Sort a Linked List of 0s, 1s, and 2s", difficulty: 3, url: "https://www.geeksforgeeks.org/problems/given-a-linked-list-of-0s-1s-and-2s-sort-it/1" },
              { id: "dsa-155", sr: 155, name: "Segregate Even and Odd Nodes (By Value)", difficulty: 3, url: "https://www.geeksforgeeks.org/problems/segregate-even-and-odd-nodes-in-a-linked-list5035/1" },
              { id: "dsa-156", sr: 156, name: "Partition List", difficulty: 4, url: "https://leetcode.com/problems/partition-list/" },
              { id: "dsa-157", sr: 157, name: "Insertion Sort List", difficulty: 4, url: "https://leetcode.com/problems/insertion-sort-list/" },
              { id: "dsa-158", sr: 158, name: "Sort List (Merge Sort on LL)", difficulty: 5, url: "https://leetcode.com/problems/sort-list/" },
            ],
          },
          {
            name: "Doubly Linked Lists (DLL)",
            problems: [
              { id: "dsa-159", sr: 159, name: "Array to Doubly Linked List", difficulty: 1, url: "https://www.geeksforgeeks.org/problems/create-a-doubly-linked-list-from-a-given-array/1" },
              { id: "dsa-160", sr: 160, name: "Insert/Delete in a Doubly Linked List", difficulty: 2, url: null },
              { id: "dsa-161", sr: 161, name: "Reverse a Doubly Linked List", difficulty: 2, url: "https://www.geeksforgeeks.org/problems/reverse-a-doubly-linked-list/1" },
              { id: "dsa-162", sr: 162, name: "Remove Duplicates from Sorted DLL", difficulty: 2, url: "https://www.geeksforgeeks.org/problems/remove-duplicates-from-a-sorted-doubly-linked-list/1" },
              { id: "dsa-163", sr: 163, name: "Insert in Sorted way in a Sorted DLL", difficulty: 3, url: "https://www.geeksforgeeks.org/problems/insert-in-sorted-way-in-a-sorted-dll/1" },
              { id: "dsa-164", sr: 164, name: "Delete all occurrences of a key in DLL", difficulty: 3, url: "https://www.geeksforgeeks.org/problems/delete-all-occurrences-of-a-given-key-in-a-doubly-linked-list/1" },
              { id: "dsa-165", sr: 165, name: "Find Pairs with Given Sum in a DLL", difficulty: 3, url: "https://www.geeksforgeeks.org/problems/find-pairs-with-given-sum-in-doubly-linked-list/1" },
            ],
          },
          {
            name: "Advanced Problems",
            problems: [
              { id: "dsa-166", sr: 166, name: "Copy List with Random Pointer (Clone LL)", difficulty: 4, url: "https://leetcode.com/problems/copy-list-with-random-pointer/" },
              { id: "dsa-167", sr: 167, name: "Flattening a Linked List", difficulty: 4, url: "https://www.geeksforgeeks.org/problems/flattening-a-linked-list/1" },
              { id: "dsa-168", sr: 168, name: "Reverse Linked List in Groups of Size K", difficulty: 5, url: "https://leetcode.com/problems/reverse-nodes-in-k-group/" },
              { id: "dsa-169", sr: 169, name: "Reverse Alternate K Nodes", difficulty: 5, url: "https://leetcode.com/problems/reverse-nodes-in-k-group/description/" },
            ],
          },
        ],
      },
      {
        id: "phase-5-stacks",
        name: "Stacks",
        subtopics: [
          {
            name: "Core Implementation",
            problems: [
              { id: "dsa-170", sr: 170, name: "Implement Stack using Arrays", difficulty: 1, url: "https://www.geeksforgeeks.org/problems/implement-stack-using-array/1" },
              { id: "dsa-171", sr: 171, name: "Implement Stack using Linked List", difficulty: 1, url: "https://www.geeksforgeeks.org/problems/implement-stack-using-linked-list/1" },
            ],
          },
          {
            name: "Parentheses & String Parsing",
            problems: [
              { id: "dsa-172", sr: 172, name: "Valid Parentheses", difficulty: 2, url: "https://leetcode.com/problems/valid-parentheses/" },
              { id: "dsa-173", sr: 173, name: "Remove Outermost Parentheses", difficulty: 2, url: "https://leetcode.com/problems/remove-outermost-parentheses/" },
              { id: "dsa-174", sr: 174, name: "Remove All Adjacent Duplicates In String", difficulty: 2, url: "https://leetcode.com/problems/remove-all-adjacent-duplicates-in-string/" },
              { id: "dsa-175", sr: 175, name: "Minimum Add to Make Parentheses Valid", difficulty: 2, url: "https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/" },
              { id: "dsa-176", sr: 176, name: "Minimum Remove to Make Valid Parentheses", difficulty: 3, url: "https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/" },
              { id: "dsa-177", sr: 177, name: "Evaluate Reverse Polish Notation", difficulty: 3, url: "https://leetcode.com/problems/evaluate-reverse-polish-notation/" },
            ],
          },
          {
            name: "Recursion Based Stack Problems",
            problems: [
              { id: "dsa-178", sr: 178, name: "Sort a Stack Using Recursion", difficulty: 3, url: "https://www.geeksforgeeks.org/problems/sort-a-stack/1" },
              { id: "dsa-179", sr: 179, name: "Reverse a Stack (Using Recursion)", difficulty: 3, url: "https://www.geeksforgeeks.org/problems/reverse-a-stack/1" },
            ],
          },
          {
            name: "Expression Conversions",
            problems: [
              { id: "dsa-180", sr: 180, name: "Infix to Postfix Conversion", difficulty: 2, url: "https://www.geeksforgeeks.org/problems/infix-to-postfix-1587115620/1" },
              { id: "dsa-181", sr: 181, name: "Prefix to Infix Conversion", difficulty: 2, url: "https://www.geeksforgeeks.org/problems/prefix-to-infix-conversion/1" },
              { id: "dsa-182", sr: 182, name: "Postfix to Prefix Conversion", difficulty: 2, url: "https://www.geeksforgeeks.org/problems/postfix-to-prefix-conversion/1" },
              { id: "dsa-183", sr: 183, name: "Infix to Prefix Conversion", difficulty: 3, url: "https://www.geeksforgeeks.org/problems/infix-to-prefix-notation/1" },
            ],
          },
          {
            name: "The Monotonic Stack Pattern",
            problems: [
              { id: "dsa-184", sr: 184, name: "Next Greater Element I", difficulty: 2, url: "https://leetcode.com/problems/next-greater-element-i/" },
              { id: "dsa-185", sr: 185, name: "Next Smaller Element / Help Classmates", difficulty: 3, url: "https://www.geeksforgeeks.org/problems/help-classmates--141631/1" },
              { id: "dsa-186", sr: 186, name: "Next Greater Element II (Circular Array)", difficulty: 3, url: "https://leetcode.com/problems/next-greater-element-ii/" },
              { id: "dsa-187", sr: 187, name: "Stock Span Problem", difficulty: 3, url: "https://leetcode.com/problems/online-stock-span/" },
              { id: "dsa-188", sr: 188, name: "Number of Greater Elements to the Right", difficulty: 3, url: "https://www.geeksforgeeks.org/problems/number-of-nges-to-the-right/1" },
              { id: "dsa-189", sr: 189, name: "Asteroid Collision", difficulty: 3, url: "https://leetcode.com/problems/asteroid-collision/" },
              { id: "dsa-190", sr: 190, name: "Remove K Digits", difficulty: 4, url: "https://leetcode.com/problems/remove-k-digits/" },
              { id: "dsa-191", sr: 191, name: "Remove Duplicate Letters", difficulty: 4, url: "https://leetcode.com/problems/remove-duplicate-letters/" },
            ],
          },
          {
            name: "Advanced Monotonic Stack & Applications",
            problems: [
              { id: "dsa-192", sr: 192, name: "Largest Rectangle in Histogram", difficulty: 4, url: "https://leetcode.com/problems/largest-rectangle-in-histogram/" },
              { id: "dsa-193", sr: 193, name: "Sum of Subarray Minimums", difficulty: 4, url: "https://leetcode.com/problems/sum-of-subarray-minimums/" },
              { id: "dsa-194", sr: 194, name: "Sum of Subarray Ranges", difficulty: 4, url: "https://leetcode.com/problems/sum-of-subarray-ranges/" },
              { id: "dsa-195", sr: 195, name: "Maximal Rectangle (2D Grid)", difficulty: 5, url: "https://leetcode.com/problems/maximal-rectangle/" },
            ],
          },
          {
            name: "Classic Design Problems",
            problems: [
              { id: "dsa-196", sr: 196, name: "Min Stack (Design a stack with O(1) getMin)", difficulty: 3, url: "https://leetcode.com/problems/min-stack/description/" },
              { id: "dsa-197", sr: 197, name: "The Celebrity Problem (Elimination via Stack)", difficulty: 3, url: "https://www.geeksforgeeks.org/problems/the-celebrity-problem/1" },
            ],
          },
        ],
      },
      {
        id: "phase-5-queues",
        name: "Queues",
        subtopics: [
          {
            name: "Queue Implementation",
            problems: [
              { id: "dsa-198", sr: 198, name: "Implement Queue using Arrays", difficulty: 1, url: "https://www.geeksforgeeks.org/problems/implement-queue-using-array/1" },
              { id: "dsa-199", sr: 199, name: "Implement Queue using Linked List", difficulty: 1, url: "https://www.geeksforgeeks.org/problems/implement-queue-using-linked-list/1" },
              { id: "dsa-200", sr: 200, name: "Implement Queue using Stacks", difficulty: 2, url: "https://leetcode.com/problems/implement-queue-using-stacks/" },
              { id: "dsa-201", sr: 201, name: "Implement Stack using Queues", difficulty: 2, url: "https://leetcode.com/problems/implement-stack-using-queues/" },
              { id: "dsa-202", sr: 202, name: "Reverse First K elements of Queue", difficulty: 2, url: "https://www.geeksforgeeks.org/problems/reverse-first-k-elements-of-queue/1" },
            ],
          },
          {
            name: "Queue Applications",
            problems: [
              { id: "dsa-203", sr: 203, name: "Number of Students Unable to Eat Lunch", difficulty: 2, url: "https://leetcode.com/problems/number-of-students-unable-to-eat-lunch/" },
              { id: "dsa-204", sr: 204, name: "First non-repeating character in a stream", difficulty: 3, url: "https://leetcode.com/problems/first-unique-character-in-a-string/" },
            ],
          },
          {
            name: "Deque & Sliding Window Max",
            problems: [
              { id: "dsa-205", sr: 205, name: "Sliding Window Maximum", difficulty: 4, url: "https://leetcode.com/problems/sliding-window-maximum/" },
              { id: "dsa-206", sr: 206, name: "Longest Continuous Subarray With Abs Diff ≤ Limit", difficulty: 4, url: "https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit/" },
              { id: "dsa-207", sr: 207, name: "Constrained Subsequence Sum", difficulty: 5, url: "https://leetcode.com/problems/constrained-subsequence-sum/" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "phase-6",
    title: "Phase 6 · Hierarchical DS",
    emoji: "🌳",
    color: "#14b8a6",
    topics: [
      {
        id: "phase-6-binary-trees",
        name: "Binary Trees",
        subtopics: [
          {
            name: "Traversals & Views (Fundamentals)",
            problems: [
              { id: "dsa-208", sr: 208, name: "Preorder Traversal (Recursive & Iterative)", difficulty: 3, url: "https://leetcode.com/problems/binary-tree-preorder-traversal/" },
              { id: "dsa-209", sr: 209, name: "Inorder Traversal (Recursive & Iterative)", difficulty: 3, url: "https://leetcode.com/problems/binary-tree-inorder-traversal/" },
              { id: "dsa-210", sr: 210, name: "Postorder Traversal (Recursive & Iterative)", difficulty: 3, url: "https://leetcode.com/problems/binary-tree-postorder-traversal/" },
              { id: "dsa-211", sr: 211, name: "Binary Tree Level Order Traversal", difficulty: 4, url: "https://leetcode.com/problems/binary-tree-level-order-traversal/" },
              { id: "dsa-212", sr: 212, name: "Binary Tree Zigzag Level Order Traversal", difficulty: 4, url: "https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/" },
              { id: "dsa-213", sr: 213, name: "Left / Right View of Binary Tree", difficulty: 4, url: "https://leetcode.com/problems/binary-tree-right-side-view/" },
              { id: "dsa-214", sr: 214, name: "Top / Bottom View of Binary Tree", difficulty: 4, url: "https://www.geeksforgeeks.org/problems/bottom-view-of-binary-tree/1" },
              { id: "dsa-215", sr: 215, name: "Boundary Traversal of Binary Tree", difficulty: 4, url: "https://www.geeksforgeeks.org/problems/boundary-traversal-of-binary-tree/1" },
              { id: "dsa-216", sr: 216, name: "Diagonal Traversal of Binary Tree", difficulty: 4, url: "https://www.geeksforgeeks.org/problems/diagonal-traversal-of-binary-tree/1" },
              { id: "dsa-217", sr: 217, name: "Vertical Order Traversal of a Binary Tree", difficulty: 5, url: "https://leetcode.com/problems/vertical-order-traversal-of-a-binary-tree/" },
            ],
          },
          {
            name: "Tree Properties & Dimensions",
            problems: [
              { id: "dsa-218", sr: 218, name: "Maximum Depth of Binary Tree", difficulty: 3, url: "https://leetcode.com/problems/maximum-depth-of-binary-tree/" },
              { id: "dsa-219", sr: 219, name: "Same Tree", difficulty: 3, url: "https://leetcode.com/problems/same-tree/" },
              { id: "dsa-220", sr: 220, name: "Invert Binary Tree", difficulty: 3, url: "https://leetcode.com/problems/invert-binary-tree/" },
              { id: "dsa-221", sr: 221, name: "Symmetric Tree", difficulty: 4, url: "https://leetcode.com/problems/symmetric-tree/" },
              { id: "dsa-222", sr: 222, name: "Maximum Width of Binary Tree", difficulty: 4, url: "https://leetcode.com/problems/maximum-width-of-binary-tree/" },
              { id: "dsa-223", sr: 223, name: "Count Complete Tree Nodes", difficulty: 4, url: "https://leetcode.com/problems/count-complete-tree-nodes/" },
              { id: "dsa-224", sr: 224, name: "Diameter of Binary Tree", difficulty: 5, url: "https://leetcode.com/problems/diameter-of-binary-tree/" },
              { id: "dsa-225", sr: 225, name: "Balanced Binary Tree", difficulty: 5, url: "https://leetcode.com/problems/balanced-binary-tree/" },
            ],
          },
          {
            name: "Paths, Sums & LCA",
            problems: [
              { id: "dsa-226", sr: 226, name: "Path Sum I", difficulty: 3, url: "https://leetcode.com/problems/path-sum/" },
              { id: "dsa-227", sr: 227, name: "Path Sum II", difficulty: 4, url: "https://leetcode.com/problems/path-sum-ii/" },
              { id: "dsa-228", sr: 228, name: "Sum Root to Leaf Numbers", difficulty: 4, url: "https://leetcode.com/problems/sum-root-to-leaf-numbers/" },
              { id: "dsa-229", sr: 229, name: "Maximum Difference Between Node and Ancestor", difficulty: 4, url: "https://leetcode.com/problems/maximum-difference-between-node-and-ancestor/" },
              { id: "dsa-230", sr: 230, name: "Lowest Common Ancestor of a Binary Tree", difficulty: 5, url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/" },
              { id: "dsa-231", sr: 231, name: "Binary Tree Maximum Path Sum", difficulty: 5, url: "https://leetcode.com/problems/binary-tree-maximum-path-sum/" },
              { id: "dsa-232", sr: 232, name: "Path Sum III", difficulty: 5, url: "https://leetcode.com/problems/path-sum-iii/" },
            ],
          },
          {
            name: "Graph-Like Traversals in Trees",
            problems: [
              { id: "dsa-233", sr: 233, name: "Minimum time taken to burn the BT", difficulty: 4, url: "https://www.geeksforgeeks.org/problems/burning-tree/1" },
              { id: "dsa-234", sr: 234, name: "All Nodes Distance K in Binary Tree", difficulty: 5, url: "https://leetcode.com/problems/all-nodes-distance-k-in-binary-tree/" },
              { id: "dsa-235", sr: 235, name: "Step-By-Step Directions From a Binary Tree Node to Another", difficulty: 5, url: "https://leetcode.com/problems/step-by-step-directions-from-a-binary-tree-node-to-another/description/" },
            ],
          },
          {
            name: "Structural Modifications & Construction",
            problems: [
              { id: "dsa-236", sr: 236, name: "Merge Two Binary Trees", difficulty: 3, url: "https://leetcode.com/problems/merge-two-binary-trees/" },
              { id: "dsa-237", sr: 237, name: "Children Sum Property in a Binary Tree", difficulty: 3, url: "https://www.geeksforgeeks.org/problems/children-sum-parent/1" },
              { id: "dsa-238", sr: 238, name: "Construct Binary Tree from Preorder and Inorder Traversal", difficulty: 5, url: "https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/" },
              { id: "dsa-239", sr: 239, name: "Construct Binary Tree from Inorder and Postorder Traversal", difficulty: 4, url: "https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/" },
              { id: "dsa-240", sr: 240, name: "Flatten Binary Tree to Linked List", difficulty: 4, url: "https://leetcode.com/problems/flatten-binary-tree-to-linked-list/" },
              { id: "dsa-241", sr: 241, name: "Serialize and Deserialize Binary Tree", difficulty: 5, url: "https://leetcode.com/problems/serialize-and-deserialize-binary-tree/" },
            ],
          },
        ],
      },
      {
        id: "phase-6-binary-search-trees",
        name: "Binary Search Trees",
        subtopics: [
          {
            name: "Core Properties & Search",
            problems: [
              { id: "dsa-242", sr: 242, name: "Search in a Binary Search Tree", difficulty: 2, url: "https://leetcode.com/problems/search-in-a-binary-search-tree/" },
              { id: "dsa-243", sr: 243, name: "Find Minimum/Maximum in BST", difficulty: 2, url: "https://www.geeksforgeeks.org/problems/minimum-element-in-bst/1" },
              { id: "dsa-244", sr: 244, name: "Insert into a Binary Search Tree", difficulty: 3, url: "https://leetcode.com/problems/insert-into-a-binary-search-tree/" },
              { id: "dsa-245", sr: 245, name: "Floor and Ceil in a BST", difficulty: 3, url: "https://www.geeksforgeeks.org/problems/implementing-ceil-in-bst/1" },
              { id: "dsa-246", sr: 246, name: "Inorder Successor in BST", difficulty: 4, url: "https://www.geeksforgeeks.org/problems/inorder-successor-in-bst/1" },
              { id: "dsa-247", sr: 247, name: "Lowest Common Ancestor of a Binary Search Tree", difficulty: 4, url: "https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/" },
              { id: "dsa-248", sr: 248, name: "Validate Binary Search Tree", difficulty: 5, url: "https://leetcode.com/problems/validate-binary-search-tree/" },
              { id: "dsa-249", sr: 249, name: "Kth Smallest Element in a BST", difficulty: 5, url: "https://leetcode.com/problems/kth-smallest-element-in-a-bst/" },
            ],
          },
          {
            name: "Standard Modifications & Deletions",
            problems: [
              { id: "dsa-250", sr: 250, name: "Delete Node in a BST", difficulty: 4, url: "https://leetcode.com/problems/delete-node-in-a-bst/" },
              { id: "dsa-251", sr: 251, name: "Two Sum IV - Input is a BST", difficulty: 5, url: "https://leetcode.com/problems/two-sum-iv-input-is-a-bst/" },
            ],
          },
          {
            name: "Construction & Advanced Operations",
            problems: [
              { id: "dsa-252", sr: 252, name: "Convert Sorted Array to Binary Search Tree", difficulty: 3, url: "https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/" },
              { id: "dsa-253", sr: 253, name: "Construct BST from Preorder Traversal", difficulty: 4, url: "https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/" },
              { id: "dsa-254", sr: 254, name: "Balance a Binary Search Tree", difficulty: 4, url: "https://leetcode.com/problems/balance-a-binary-search-tree/" },
              { id: "dsa-255", sr: 255, name: "Merge Two Balanced Binary Search Trees", difficulty: 4, url: "https://www.geeksforgeeks.org/problems/merge-two-bst-s/1" },
              { id: "dsa-256", sr: 256, name: "Recover Binary Search Tree", difficulty: 5, url: "https://leetcode.com/problems/recover-binary-search-tree/" },
              { id: "dsa-257", sr: 257, name: "Largest BST in a Binary Tree", difficulty: 5, url: "https://leetcode.com/problems/maximum-sum-bst-in-binary-tree/" },
            ],
          },
        ],
      },
      {
        id: "phase-6-tries",
        name: "Tries",
        subtopics: [
          {
            name: "Implementation & String Search",
            problems: [
              { id: "dsa-258", sr: 258, name: "Implement Trie (Prefix Tree)", difficulty: 4, url: "https://leetcode.com/problems/implement-trie-prefix-tree/" },
              { id: "dsa-259", sr: 259, name: "Design Add and Search Words Data Structure", difficulty: 4, url: "https://leetcode.com/problems/design-add-and-search-words-data-structure/" },
              { id: "dsa-260", sr: 260, name: "Longest Word with All Prefixes", difficulty: 4, url: "https://www.geeksforgeeks.org/problems/find-the-longest-string--170645/1" },
              { id: "dsa-261", sr: 261, name: "Number of Distinct Substrings in a String", difficulty: 4, url: "https://www.geeksforgeeks.org/problems/count-of-distinct-substrings/1" },
              { id: "dsa-262", sr: 262, name: "Word Search II", difficulty: 5, url: "https://leetcode.com/problems/word-search-ii/" },
            ],
          },
          {
            name: "Bitwise Tries (Advanced)",
            problems: [
              { id: "dsa-263", sr: 263, name: "Maximum XOR of Two Numbers in an Array", difficulty: 5, url: "https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/" },
              { id: "dsa-264", sr: 264, name: "Maximum XOR With an Element From Array", difficulty: 5, url: "https://leetcode.com/problems/maximum-xor-with-an-element-from-array/" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "phase-7",
    title: "Phase 7 · Core DS & Techniques",
    emoji: "⚙️",
    color: "#6366f1",
    topics: [
      {
        id: "phase-7-hashmaps",
        name: "Hashmaps",
        subtopics: [
          {
            name: "Hashmap Fundamentals",
            problems: [
              { id: "dsa-265", sr: 265, name: "Contains Duplicate", difficulty: 1, url: "https://leetcode.com/problems/contains-duplicate/" },
              { id: "dsa-266", sr: 266, name: "Valid Anagram (Hashmap Approach)", difficulty: 1, url: "https://leetcode.com/problems/valid-anagram/" },
              { id: "dsa-267", sr: 267, name: "Unique Number of Occurrences", difficulty: 1, url: "https://leetcode.com/problems/unique-number-of-occurrences/" },
              { id: "dsa-268", sr: 268, name: "Find distinct elements / Find the Frequency", difficulty: 1, url: "https://www.geeksforgeeks.org/problems/find-distinct-elements--130928/1" },
              { id: "dsa-269", sr: 269, name: "Two Sum", difficulty: 2, url: "https://leetcode.com/problems/two-sum/" },
              { id: "dsa-270", sr: 270, name: "Intersection of Two Arrays", difficulty: 2, url: "https://leetcode.com/problems/intersection-of-two-arrays/" },
              { id: "dsa-271", sr: 271, name: "Count Number of Pairs With Absolute Difference K", difficulty: 2, url: "https://leetcode.com/problems/count-number-of-pairs-with-absolute-difference-k/" },
              { id: "dsa-272", sr: 272, name: "Design HashMap", difficulty: 3, url: "https://leetcode.com/problems/design-hashmap/" },
            ],
          },
          {
            name: "Intermediate Hashmap Problems",
            problems: [
              { id: "dsa-273", sr: 273, name: "Group Anagrams", difficulty: 3, url: "https://leetcode.com/problems/group-anagrams/" },
              { id: "dsa-274", sr: 274, name: "Longest Consecutive Sequence", difficulty: 3, url: "https://leetcode.com/problems/longest-consecutive-sequence/" },
              { id: "dsa-275", sr: 275, name: "Subarray Sum Equals K", difficulty: 3, url: "https://leetcode.com/problems/subarray-sum-equals-k/" },
              { id: "dsa-276", sr: 276, name: "Contiguous Array / Largest subarray with 0 sum", difficulty: 3, url: "https://leetcode.com/problems/contiguous-array/" },
              { id: "dsa-277", sr: 277, name: "Count subarrays with given XOR", difficulty: 3, url: "https://www.geeksforgeeks.org/problems/count-subarray-with-given-xor/1" },
              { id: "dsa-278", sr: 278, name: "Subarray Sums Divisible by K", difficulty: 3, url: "https://leetcode.com/problems/subarray-sums-divisible-by-k/" },
              { id: "dsa-279", sr: 279, name: "Continuous Subarray Sum", difficulty: 3, url: "https://leetcode.com/problems/continuous-subarray-sum/description/" },
            ],
          },
          {
            name: "Advanced / Multi Concept",
            problems: [
              { id: "dsa-280", sr: 280, name: "Maximum Size Subarray Sum Equals k", difficulty: 3, url: "https://www.geeksforgeeks.org/problems/longest-sub-array-with-sum-k0809/1" },
              { id: "dsa-281", sr: 281, name: "Top K Frequent Elements", difficulty: 3, url: "https://leetcode.com/problems/top-k-frequent-elements/" },
              { id: "dsa-282", sr: 282, name: "LRU Cache (Least Recently Used)", difficulty: 4, url: "https://leetcode.com/problems/lru-cache/" },
              { id: "dsa-283", sr: 283, name: "LFU Cache (Least Frequently Used)", difficulty: 5, url: "https://leetcode.com/problems/lfu-cache/" },
            ],
          },
        ],
      },
      {
        id: "phase-7-heaps-priority-queues",
        name: "Heaps / Priority Queues",
        subtopics: [
          {
            name: "Heap Fundamentals",
            problems: [
              { id: "dsa-284", sr: 284, name: "Check if an array represents a min heap", difficulty: 2, url: "https://www.geeksforgeeks.org/problems/does-array-represent-heap4345/1" },
              { id: "dsa-285", sr: 285, name: "Convert Min Heap to Max Heap", difficulty: 2, url: "https://www.geeksforgeeks.org/problems/convert-min-heap-to-max-heap-1666385109/1" },
              { id: "dsa-286", sr: 286, name: "Implement Min/Max Heap", difficulty: 3, url: null },
            ],
          },
          {
            name: "The Top-K Pattern",
            problems: [
              { id: "dsa-287", sr: 287, name: "Last Stone Weight", difficulty: 3, url: "https://leetcode.com/problems/last-stone-weight/" },
              { id: "dsa-288", sr: 288, name: "Kth Largest Element in an Array", difficulty: 4, url: "https://leetcode.com/problems/kth-largest-element-in-an-array/" },
              { id: "dsa-289", sr: 289, name: "K Closest Points to Origin", difficulty: 4, url: "https://leetcode.com/problems/k-closest-points-to-origin/" },
              { id: "dsa-290", sr: 290, name: "Sort a K Sorted Array / Nearly Sorted Algorithm", difficulty: 4, url: "https://www.geeksforgeeks.org/problems/nearly-sorted-1587115620/1" },
              { id: "dsa-291", sr: 291, name: "Top K Frequent Elements (Heap Approach)", difficulty: 4, url: "https://leetcode.com/problems/top-k-frequent-elements/" },
            ],
          },
          {
            name: "Merging & Combinations",
            problems: [
              { id: "dsa-292", sr: 292, name: "Minimum Cost of Ropes", difficulty: 4, url: "https://www.geeksforgeeks.org/problems/minimum-cost-of-ropes-1587115620/1" },
              { id: "dsa-293", sr: 293, name: "Merge K Sorted Lists", difficulty: 5, url: "https://leetcode.com/problems/merge-k-sorted-lists/" },
              { id: "dsa-294", sr: 294, name: "Kth Smallest Element in a Sorted Matrix", difficulty: 4, url: "https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/" },
            ],
          },
          {
            name: "Advanced / Two-Heaps / Scheduling",
            problems: [
              { id: "dsa-295", sr: 295, name: "Task Scheduler", difficulty: 5, url: "https://leetcode.com/problems/task-scheduler/" },
              { id: "dsa-296", sr: 296, name: "Reorganize String", difficulty: 5, url: "https://leetcode.com/problems/reorganize-string/" },
              { id: "dsa-297", sr: 297, name: "Minimum Number of Refueling Stops", difficulty: 5, url: "https://leetcode.com/problems/minimum-number-of-refueling-stops/" },
              { id: "dsa-298", sr: 298, name: "Find Median from Data Stream", difficulty: 5, url: "https://leetcode.com/problems/find-median-from-data-stream/" },
            ],
          },
        ],
      },
      {
        id: "phase-7-prefix-sum",
        name: "Prefix Sum",
        subtopics: [
          {
            name: "1d Prefix Sum",
            problems: [
              { id: "dsa-299", sr: 299, name: "Running Sum of 1D Array", difficulty: 1, url: "https://leetcode.com/problems/running-sum-of-1d-array/description/" },
              { id: "dsa-300", sr: 300, name: "Find the Highest Altitude", difficulty: 2, url: "https://leetcode.com/problems/range-sum-query-immutable/description/" },
              { id: "dsa-301", sr: 301, name: "Find Pivot Index", difficulty: 2, url: "https://leetcode.com/problems/find-pivot-index/" },
              { id: "dsa-302", sr: 302, name: "Range Sum Query - Immutable", difficulty: 2, url: "https://leetcode.com/problems/range-sum-query-immutable/" },
              { id: "dsa-303", sr: 303, name: "Product of Array Except Self", difficulty: 3, url: "https://leetcode.com/problems/product-of-array-except-self/" },
              { id: "dsa-304", sr: 304, name: "Corporate Flight Bookings", difficulty: 4, url: "https://leetcode.com/problems/corporate-flight-bookings/description/" },
              { id: "dsa-305", sr: 305, name: "Trapping Rain Water (Prefix Max / Min)", difficulty: 4, url: "https://leetcode.com/problems/trapping-rain-water/" },
            ],
          },
          {
            name: "2d Prefix Sum",
            problems: [
              { id: "dsa-306", sr: 306, name: "Range Sum Query 2D - Immutable", difficulty: 3, url: "https://leetcode.com/problems/range-sum-query-2d-immutable/description/" },
              { id: "dsa-307", sr: 307, name: "Matrix Block Sum", difficulty: 3, url: "https://leetcode.com/problems/matrix-block-sum/" },
              { id: "dsa-308", sr: 308, name: "Maximum Sum of a 2D Subgrid of size K x K", difficulty: 4, url: "https://www.geeksforgeeks.org/problems/coins-of-geekland--141631/1" },
            ],
          },
        ],
      },
      {
        id: "phase-7-two-pointers-sliding-window",
        name: "Two Pointers & Sliding Window",
        subtopics: [
          {
            name: "Two Pointers Basics",
            problems: [
              { id: "dsa-309", sr: 309, name: "Move Zeroes (Two Pointer Intution)", difficulty: 1, url: "https://leetcode.com/problems/move-zeroes/" },
              { id: "dsa-310", sr: 310, name: "Valid Palindrome (Two Pointers)", difficulty: 1, url: "https://leetcode.com/problems/valid-palindrome/" },
              { id: "dsa-311", sr: 311, name: "Two Sum II - Input Array Is Sorted", difficulty: 2, url: "https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/description/" },
              { id: "dsa-312", sr: 312, name: "Sort Colors (Dutch National Flag)", difficulty: 2, url: "https://leetcode.com/problems/sort-colors/" },
              { id: "dsa-313", sr: 313, name: "Container With Most Water", difficulty: 3, url: "https://leetcode.com/problems/container-with-most-water/" },
              { id: "dsa-314", sr: 314, name: "3Sum", difficulty: 3, url: "https://leetcode.com/problems/3sum/" },
            ],
          },
          {
            name: "Fixed Size Slding Window",
            problems: [
              { id: "dsa-315", sr: 315, name: "Maximum Average Subarray I", difficulty: 2, url: "https://leetcode.com/problems/maximum-average-subarray-i/" },
              { id: "dsa-316", sr: 316, name: "Max Sum Subarray of size K", difficulty: 2, url: "https://leetcode.com/problems/maximum-sum-of-distinct-subarrays-with-length-k/" },
              { id: "dsa-317", sr: 317, name: "Number of Sub-arrays of Size K and Average Greater than or Equal to Threshold", difficulty: 2, url: "https://leetcode.com/problems/number-of-sub-arrays-of-size-k-and-average-greater-than-or-equal-to-threshold/" },
              { id: "dsa-318", sr: 318, name: "Minimum Consecutive Cards to Pick Up", difficulty: 2, url: "https://leetcode.com/problems/minimum-consecutive-cards-to-pick-up/" },
              { id: "dsa-319", sr: 319, name: "Maximum Points You Can Obtain from Cards", difficulty: 3, url: "https://leetcode.com/problems/maximum-points-you-can-obtain-from-cards/" },
            ],
          },
          {
            name: "Variable Size Sliding Window",
            problems: [
              { id: "dsa-320", sr: 320, name: "Find All Anagrams in a String", difficulty: 3, url: "https://leetcode.com/problems/find-all-anagrams-in-a-string/" },
              { id: "dsa-321", sr: 321, name: "Permutation in String", difficulty: 3, url: "https://leetcode.com/problems/permutation-in-string/" },
              { id: "dsa-322", sr: 322, name: "Minimum Size Subarray Sum", difficulty: 3, url: "https://leetcode.com/problems/minimum-size-subarray-sum/" },
              { id: "dsa-323", sr: 323, name: "Longest Substring Without Repeating Characters", difficulty: 3, url: "https://leetcode.com/problems/longest-substring-without-repeating-characters/" },
              { id: "dsa-324", sr: 324, name: "Longest Repeating Character Replacement", difficulty: 3, url: "https://leetcode.com/problems/longest-repeating-character-replacement/" },
              { id: "dsa-325", sr: 325, name: "Max Consecutive Ones III", difficulty: 3, url: "https://leetcode.com/problems/max-consecutive-ones-iii/" },
              { id: "dsa-326", sr: 326, name: "Fruit Into Baskets", difficulty: 3, url: "https://leetcode.com/problems/fruit-into-baskets/" },
              { id: "dsa-327", sr: 327, name: "Maximum Erasure Value", difficulty: 3, url: "https://leetcode.com/problems/maximum-erasure-value/" },
              { id: "dsa-328", sr: 328, name: "Number of Substrings Containing All Three Characters", difficulty: 3, url: "https://leetcode.com/problems/number-of-substrings-containing-all-three-characters/" },
            ],
          },
          {
            name: "Advanced Sliding Window / Counting / Atmost K",
            problems: [
              { id: "dsa-329", sr: 329, name: "Binary Subarrays With Sum", difficulty: 3, url: "https://leetcode.com/problems/binary-subarrays-with-sum/" },
              { id: "dsa-330", sr: 330, name: "Count Number of Nice Subarrays", difficulty: 3, url: "https://leetcode.com/problems/count-number-of-nice-subarrays/" },
              { id: "dsa-331", sr: 331, name: "Subarrays with K Different Integers", difficulty: 4, url: "https://leetcode.com/problems/subarrays-with-k-different-integers/" },
              { id: "dsa-332", sr: 332, name: "Minimum Window Subsequence", difficulty: 4, url: "https://leetcode.com/problems/minimum-window-subsequence/" },
              { id: "dsa-333", sr: 333, name: "Minimum Window Substring", difficulty: 5, url: "https://leetcode.com/problems/minimum-window-substring/" },
            ],
          },
        ],
      },
      {
        id: "phase-7-bit-manipulation",
        name: "Bit Manipulation",
        subtopics: [
          {
            name: "Bit Basics & Properties",
            problems: [
              { id: "dsa-334", sr: 334, name: "K-th Bit is Set or Not", difficulty: 1, url: "https://www.geeksforgeeks.org/problems/check-whether-k-th-bit-is-set-or-not-1587115620/1" },
              { id: "dsa-335", sr: 335, name: "Check if a Number is Odd or Not", difficulty: 1, url: "https://www.geeksforgeeks.org/problems/odd-or-even3618/1" },
              { id: "dsa-336", sr: 336, name: "Check If Number Power of 2 or Not", difficulty: 2, url: "https://leetcode.com/problems/power-of-two/" },
              { id: "dsa-337", sr: 337, name: "Number Of Even and Odd Bits", difficulty: 2, url: "https://leetcode.com/problems/number-of-even-and-odd-bits/description/" },
              { id: "dsa-338", sr: 338, name: "Minimum Bit Flips To Convert Number", difficulty: 3, url: "https://leetcode.com/problems/minimum-bit-flips-to-convert-number/" },
            ],
          },
          {
            name: "XOR Tricks",
            problems: [
              { id: "dsa-339", sr: 339, name: "Swap Two Numbers (XOR Trick)", difficulty: 2, url: "https://www.geeksforgeeks.org/problems/swap-two-numbers3844/1" },
              { id: "dsa-340", sr: 340, name: "Single Number I", difficulty: 2, url: "https://leetcode.com/problems/single-number/description/" },
              { id: "dsa-341", sr: 341, name: "Is Binary Number Multiple of 3", difficulty: 2, url: "https://www.geeksforgeeks.org/problems/is-binary-number-multiple-of-30654/1?page=1&category=Bit%20Magic&sortBy=submissions" },
              { id: "dsa-342", sr: 342, name: "Find the repeating and missing number", difficulty: 3, url: "https://leetcode.com/problems/find-missing-and-repeated-values/" },
              { id: "dsa-343", sr: 343, name: "Single Number II", difficulty: 4, url: "https://leetcode.com/problems/single-number-ii/" },
              { id: "dsa-344", sr: 344, name: "Single Number III", difficulty: 5, url: "https://leetcode.com/problems/single-number-iii/description/" },
            ],
          },
          {
            name: "Bit Counting & Advanced",
            problems: [
              { id: "dsa-345", sr: 345, name: "Count Set Bits From 1 to N", difficulty: 4, url: "https://www.geeksforgeeks.org/problems/count-total-set-bits-1587115620/1?page=1&category=Bit%20Magic&sortBy=submissions" },
              { id: "dsa-346", sr: 346, name: "Bleak Numbers", difficulty: 4, url: "https://www.geeksforgeeks.org/problems/bleak-numbers1552/1?page=6&category=Bit%20Magic&sortBy=difficulty" },
              { id: "dsa-347", sr: 347, name: "Minimum Xor Pair", difficulty: 4, url: "https://www.geeksforgeeks.org/problems/minimum-xor-value-pair/1" },
              { id: "dsa-348", sr: 348, name: "Divide Two Integers (Bit Shifting)", difficulty: 4, url: "https://leetcode.com/problems/divide-two-integers/description/" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "phase-8",
    title: "Phase 8 · Standard Algorithms",
    emoji: "📐",
    color: "#ef4444",
    topics: [
      {
        id: "phase-8-greedy",
        name: "Greedy",
        subtopics: [
          {
            name: "Basics & Array Manipulation",
            problems: [
              { id: "dsa-349", sr: 349, name: "Assign Cookies", difficulty: 1, url: "https://leetcode.com/problems/assign-cookies/" },
              { id: "dsa-350", sr: 350, name: "Lemonade Change", difficulty: 2, url: "https://leetcode.com/problems/lemonade-change/" },
              { id: "dsa-351", sr: 351, name: "Maximize Sum of Array After K Negations", difficulty: 2, url: "https://leetcode.com/problems/maximize-sum-of-array-after-k-negations/" },
              { id: "dsa-352", sr: 352, name: "Shortest Job First", difficulty: 2, url: "https://www.geeksforgeeks.org/problems/shortest-job-first/1" },
              { id: "dsa-353", sr: 353, name: "Activity Selection / N Meetings in One Room", difficulty: 2, url: "https://www.geeksforgeeks.org/problems/n-meetings-in-one-room-1587115620/1" },
            ],
          },
          {
            name: "Intervals & Scheduling",
            problems: [
              { id: "dsa-354", sr: 354, name: "Merge Intervals (Greedy View)", difficulty: 3, url: "https://leetcode.com/problems/merge-intervals/" },
              { id: "dsa-355", sr: 355, name: "Insert Interval", difficulty: 3, url: "https://leetcode.com/problems/insert-interval/" },
              { id: "dsa-356", sr: 356, name: "Non-overlapping Intervals", difficulty: 3, url: "https://leetcode.com/problems/non-overlapping-intervals/" },
              { id: "dsa-357", sr: 357, name: "Minimum Number of Arrows to Burst Balloons", difficulty: 3, url: "https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/" },
              { id: "dsa-358", sr: 358, name: "Job Sequencing Problem", difficulty: 3, url: "https://www.geeksforgeeks.org/problems/job-sequencing-problem-1587115620/1" },
              { id: "dsa-359", sr: 359, name: "Minimum Platforms required for a railway", difficulty: 3, url: "https://www.geeksforgeeks.org/problems/minimum-platforms-1587115620/1" },
              { id: "dsa-360", sr: 360, name: "Maximum Meetings in One Room", difficulty: 3, url: "https://www.geeksforgeeks.org/problems/maximum-meetings-in-one-room/1" },
              { id: "dsa-361", sr: 361, name: "Task Scheduler (Greedy Approach)", difficulty: 3, url: "https://leetcode.com/problems/task-scheduler/" },
            ],
          },
          {
            name: "Array & Jump Greedy",
            problems: [
              { id: "dsa-362", sr: 362, name: "Jump Game", difficulty: 3, url: "https://leetcode.com/problems/jump-game/" },
              { id: "dsa-363", sr: 363, name: "Valid Parenthesis String", difficulty: 3, url: "https://leetcode.com/problems/valid-parenthesis-string/" },
              { id: "dsa-364", sr: 364, name: "Gas Station", difficulty: 3, url: "https://leetcode.com/problems/gas-station/" },
              { id: "dsa-365", sr: 365, name: "Jump Game II", difficulty: 3, url: "https://leetcode.com/problems/jump-game-ii/" },
            ],
          },
          {
            name: "Advanced Greedy",
            problems: [
              { id: "dsa-366", sr: 366, name: "Minimize the Heights II", difficulty: 4, url: "https://www.geeksforgeeks.org/problems/minimize-the-heights3351/1" },
              { id: "dsa-367", sr: 367, name: "Candy", difficulty: 4, url: "https://leetcode.com/problems/candy/description/" },
              { id: "dsa-368", sr: 368, name: "Huffman Decoding / Coding", difficulty: 4, url: "https://www.geeksforgeeks.org/problems/huffman-encoding3345/1" },
              { id: "dsa-369", sr: 369, name: "Minimum Number of Taps to Open to Water a Garden", difficulty: 4, url: "https://leetcode.com/problems/minimum-number-of-taps-to-open-to-water-a-garden/" },
              { id: "dsa-370", sr: 370, name: "Course Schedule III", difficulty: 5, url: "https://leetcode.com/problems/course-schedule-iii/" },
            ],
          },
        ],
      },
      {
        id: "phase-8-graphs",
        name: "Graphs",
        subtopics: [
          {
            name: "Graphs Fundamentals & Traversals",
            problems: [
              { id: "dsa-371", sr: 371, name: "BFS of Graph", difficulty: 1, url: "https://www.geeksforgeeks.org/problems/bfs-traversal-of-graph/1" },
              { id: "dsa-372", sr: 372, name: "DFS of Graph", difficulty: 1, url: "https://www.geeksforgeeks.org/problems/depth-first-traversal-for-a-graph/1" },
              { id: "dsa-373", sr: 373, name: "Find if Path Exists in Graph", difficulty: 2, url: "https://leetcode.com/problems/find-if-path-exists-in-graph/" },
              { id: "dsa-374", sr: 374, name: "Number of Provinces", difficulty: 2, url: "https://leetcode.com/problems/number-of-provinces/" },
              { id: "dsa-375", sr: 375, name: "Clone Graph", difficulty: 3, url: "https://leetcode.com/problems/clone-graph/" },
              { id: "dsa-376", sr: 376, name: "Is Graph Bipartite?", difficulty: 3, url: "https://leetcode.com/problems/is-graph-bipartite/" },
            ],
          },
          {
            name: "Matrix / Grid BFS Problems",
            problems: [
              { id: "dsa-377", sr: 377, name: "Flood Fill", difficulty: 2, url: "https://leetcode.com/problems/flood-fill/" },
              { id: "dsa-378", sr: 378, name: "Max Area of Island", difficulty: 2, url: "https://leetcode.com/problems/max-area-of-island/" },
              { id: "dsa-379", sr: 379, name: "Number of Islands", difficulty: 3, url: "https://leetcode.com/problems/number-of-islands/" },
              { id: "dsa-380", sr: 380, name: "Rotting Oranges", difficulty: 3, url: "https://leetcode.com/problems/rotting-oranges/" },
              { id: "dsa-381", sr: 381, name: "01 Matrix / Distance of nearest cell having 1", difficulty: 3, url: "https://www.geeksforgeeks.org/problems/distance-of-nearest-cell-having-1-1587115620/1" },
              { id: "dsa-382", sr: 382, name: "Surrounded Regions", difficulty: 3, url: "https://leetcode.com/problems/surrounded-regions/" },
              { id: "dsa-383", sr: 383, name: "Number of Enclaves", difficulty: 3, url: "https://leetcode.com/problems/number-of-enclaves/" },
              { id: "dsa-384", sr: 384, name: "Shortest Path in Binary Matrix", difficulty: 3, url: "https://leetcode.com/problems/shortest-path-in-binary-matrix/" },
              { id: "dsa-385", sr: 385, name: "Swim in Rising Water", difficulty: 4, url: "https://leetcode.com/problems/swim-in-rising-water/" },
              { id: "dsa-386", sr: 386, name: "Making A Large Island", difficulty: 4, url: "https://leetcode.com/problems/making-a-large-island/description/" },
            ],
          },
          {
            name: "Cycle Detection",
            problems: [
              { id: "dsa-387", sr: 387, name: "Cycle Detection in Undirected Graph", difficulty: 2, url: "https://www.geeksforgeeks.org/problems/detect-cycle-in-an-undirected-graph/1" },
              { id: "dsa-388", sr: 388, name: "Detect Cycle in a Directed Graph", difficulty: 3, url: "https://www.geeksforgeeks.org/problems/detect-cycle-in-a-directed-graph/1" },
              { id: "dsa-389", sr: 389, name: "Find Eventual Safe States", difficulty: 3, url: "https://leetcode.com/problems/find-eventual-safe-states/" },
            ],
          },
          {
            name: "Topological Sorting (Kahn's Algorithm)",
            problems: [
              { id: "dsa-390", sr: 390, name: "Topological Sort", difficulty: 2, url: "https://www.geeksforgeeks.org/problems/topological-sort/1" },
              { id: "dsa-391", sr: 391, name: "Course Schedule", difficulty: 3, url: "https://leetcode.com/problems/course-schedule/" },
              { id: "dsa-392", sr: 392, name: "Course Schedule II", difficulty: 3, url: "https://leetcode.com/problems/course-schedule-ii/" },
              { id: "dsa-393", sr: 393, name: "Alien Dictionary", difficulty: 4, url: "https://www.geeksforgeeks.org/problems/alien-dictionary/1" },
              { id: "dsa-394", sr: 394, name: "Parallel Courses III", difficulty: 4, url: "https://leetcode.com/problems/parallel-courses-iii/" },
            ],
          },
          {
            name: "Shortest Path Algorithms (Dijkstra, Bellman-Ford, Floyd-Warshall)",
            problems: [
              { id: "dsa-395", sr: 395, name: "Shortest Path in Undirected Graph (Unit Weights)", difficulty: 2, url: "https://www.geeksforgeeks.org/problems/shortest-path-in-undirected-graph-having-unit-distance/1" },
              { id: "dsa-396", sr: 396, name: "Shortest Path in DAG", difficulty: 2, url: "https://www.geeksforgeeks.org/problems/shortest-path-in-undirected-graph/1" },
              { id: "dsa-397", sr: 397, name: "Dijkstra's Algorithm", difficulty: 3, url: "https://www.geeksforgeeks.org/problems/implementing-dijkstra-set-1-adjacency-matrix/1" },
              { id: "dsa-398", sr: 398, name: "Network Delay Time", difficulty: 3, url: "https://leetcode.com/problems/network-delay-time/" },
              { id: "dsa-399", sr: 399, name: "Path With Minimum Effort", difficulty: 3, url: "https://leetcode.com/problems/path-with-minimum-effort/" },
              { id: "dsa-400", sr: 400, name: "Cheapest Flights Within K Stops", difficulty: 3, url: "https://leetcode.com/problems/cheapest-flights-within-k-stops/description/" },
              { id: "dsa-401", sr: 401, name: "Path with Maximum Probability", difficulty: 3, url: "https://leetcode.com/problems/path-with-maximum-probability/" },
              { id: "dsa-402", sr: 402, name: "Bellman-Ford Algorithm", difficulty: 3, url: "https://www.geeksforgeeks.org/problems/distance-from-the-source-bellman-ford-algorithm/1" },
              { id: "dsa-403", sr: 403, name: "Floyd Warshall Algorithm", difficulty: 3, url: "https://www.geeksforgeeks.org/problems/implementing-floyd-warshall2042/1" },
              { id: "dsa-404", sr: 404, name: "Find the City With the Smallest Number of Neighbors", difficulty: 3, url: "https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/" },
              { id: "dsa-405", sr: 405, name: "Minimum Multiplications to Reach End", difficulty: 3, url: "https://www.geeksforgeeks.org/problems/minimum-multiplications-to-reach-end/1" },
              { id: "dsa-406", sr: 406, name: "Number of Ways to Arrive at Destination", difficulty: 3, url: "https://leetcode.com/problems/number-of-ways-to-arrive-at-destination/" },
            ],
          },
          {
            name: "Minimum Spanning Tree (MST)",
            problems: [
              { id: "dsa-407", sr: 407, name: "Minimum Spanning Tree", difficulty: 2, url: "https://www.geeksforgeeks.org/problems/minimum-spanning-tree/1" },
              { id: "dsa-408", sr: 408, name: "Prim's Algorithm", difficulty: 3, url: "https://www.geeksforgeeks.org/problems/minimum-spanning-tree/1" },
              { id: "dsa-409", sr: 409, name: "Min Cost to Connect All Points (Kruskal)", difficulty: 3, url: "https://leetcode.com/problems/min-cost-to-connect-all-points/" },
            ],
          },
          {
            name: "Disjoint Set Union (DSU) / Union Find",
            problems: [
              { id: "dsa-410", sr: 410, name: "Disjoint Set", difficulty: 2, url: "https://www.geeksforgeeks.org/problems/disjoint-set-union-find/1" },
              { id: "dsa-411", sr: 411, name: "Number of Operations to Make Network Connected", difficulty: 3, url: "https://leetcode.com/problems/number-of-operations-to-make-network-connected/" },
              { id: "dsa-412", sr: 412, name: "Accounts Merge", difficulty: 3, url: "https://leetcode.com/problems/accounts-merge/" },
              { id: "dsa-413", sr: 413, name: "Most Stones Removed with Same Row or Column", difficulty: 3, url: "https://leetcode.com/problems/most-stones-removed-with-same-row-or-column/" },
              { id: "dsa-414", sr: 414, name: "Redundant Connection", difficulty: 3, url: "https://leetcode.com/problems/redundant-connection/" },
              { id: "dsa-415", sr: 415, name: "Evaluate Division", difficulty: 4, url: "https://leetcode.com/problems/evaluate-division/description/" },
              { id: "dsa-416", sr: 416, name: "Number of Islands II", difficulty: 4, url: "https://leetcode.com/problems/number-of-islands-ii/" },
            ],
          },
          {
            name: "Bridges, Articulation Points & Strongly Connected Components",
            problems: [
              { id: "dsa-417", sr: 417, name: "Kosaraju's Algorithm", difficulty: 4, url: null },
              { id: "dsa-418", sr: 418, name: "Tarjan's Algorithm / Bridges in Graph", difficulty: 4, url: "https://www.geeksforgeeks.org/problems/bridge-edge-in-graph/1" },
              { id: "dsa-419", sr: 419, name: "Articulation Point in Graph", difficulty: 4, url: "https://www.geeksforgeeks.org/problems/articulation-point-1/1" },
              { id: "dsa-420", sr: 420, name: "Critical Connections in a Network", difficulty: 4, url: "https://leetcode.com/problems/critical-connections-in-a-network/" },
            ],
          },
          {
            name: "Advanced Graphs Problems",
            problems: [
              { id: "dsa-421", sr: 421, name: "Snake and Ladder Problem", difficulty: 3, url: "https://leetcode.com/problems/snakes-and-ladders/" },
              { id: "dsa-422", sr: 422, name: "Word Ladder", difficulty: 4, url: "https://leetcode.com/problems/word-ladder/" },
              { id: "dsa-423", sr: 423, name: "Reorder Routes to Make All Paths Lead to the City Zero", difficulty: 4, url: "https://leetcode.com/problems/reorder-routes-to-make-all-paths-lead-to-the-city-zero/" },
              { id: "dsa-424", sr: 424, name: "Word Ladder II", difficulty: 5, url: "https://leetcode.com/problems/word-ladder-ii/" },
              { id: "dsa-425", sr: 425, name: "Escape the Spreading Fire", difficulty: 5, url: "https://leetcode.com/problems/escape-the-spreading-fire/" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "phase-9",
    title: "Phase 9 · Exhaustive Search & Optimisation",
    emoji: "🚀",
    color: "#eab308",
    topics: [
      {
        id: "phase-9-backtracking",
        name: "Backtracking",
        subtopics: [
          {
            name: "Subsequence & Subset Fundamentals",
            problems: [
              { id: "dsa-426", sr: 426, name: "Check if subsequence with sum K Exists", difficulty: 2, url: "https://www.geeksforgeeks.org/problems/check-if-there-exists-a-subsequence-with-sum-k/1" },
              { id: "dsa-427", sr: 427, name: "Count all subsequences with sum K", difficulty: 2, url: null },
              { id: "dsa-428", sr: 428, name: "Subsets / Power Set", difficulty: 3, url: "https://leetcode.com/problems/subsets/" },
              { id: "dsa-429", sr: 429, name: "Subsets II (With Duplicates)", difficulty: 3, url: "https://leetcode.com/problems/subsets-ii/" },
              { id: "dsa-430", sr: 430, name: "Subset Sums", difficulty: 3, url: "https://www.geeksforgeeks.org/problems/subset-sums2234/1" },
            ],
          },
          {
            name: "Combinations",
            problems: [
              { id: "dsa-431", sr: 431, name: "Combination Sum I", difficulty: 3, url: "https://leetcode.com/problems/combination-sum/" },
              { id: "dsa-432", sr: 432, name: "Combination Sum II", difficulty: 3, url: "https://leetcode.com/problems/combination-sum-ii/" },
              { id: "dsa-433", sr: 433, name: "Combination Sum III", difficulty: 3, url: "https://leetcode.com/problems/combination-sum-iii/" },
              { id: "dsa-434", sr: 434, name: "N Digit numbers with digits in increasing order", difficulty: 3, url: "https://www.geeksforgeeks.org/problems/n-digit-numbers-with-digits-in-increasing-order5903/1" },
            ],
          },
          {
            name: "Permutations",
            problems: [
              { id: "dsa-435", sr: 435, name: "Permutations II (With Duplicates)", difficulty: 3, url: "https://leetcode.com/problems/permutations-ii/" },
              { id: "dsa-436", sr: 436, name: "Letter Combinations of a Phone Number", difficulty: 3, url: "https://leetcode.com/problems/letter-combinations-of-a-phone-number/" },
              { id: "dsa-437", sr: 437, name: "Generate Parentheses", difficulty: 3, url: "https://leetcode.com/problems/generate-parentheses/" },
            ],
          },
          {
            name: "String BackTracking",
            problems: [
              { id: "dsa-438", sr: 438, name: "Palindrome Partitioning", difficulty: 4, url: "https://leetcode.com/problems/palindrome-partitioning/" },
              { id: "dsa-439", sr: 439, name: "Word Break", difficulty: 4, url: "https://leetcode.com/problems/word-break/" },
              { id: "dsa-440", sr: 440, name: "Remove Invalid Parentheses", difficulty: 5, url: "https://leetcode.com/problems/remove-invalid-parentheses/" },
              { id: "dsa-441", sr: 441, name: "Expression Add Operators", difficulty: 5, url: "https://leetcode.com/problems/expression-add-operators/" },
            ],
          },
          {
            name: "Grid & Maze Backtracking",
            problems: [
              { id: "dsa-442", sr: 442, name: "Rat in a Maze", difficulty: 4, url: "https://www.geeksforgeeks.org/problems/rat-in-a-maze-problem/1" },
              { id: "dsa-443", sr: 443, name: "Word Search", difficulty: 4, url: "https://leetcode.com/problems/word-search/" },
              { id: "dsa-444", sr: 444, name: "M-Coloring Problem", difficulty: 4, url: "https://www.geeksforgeeks.org/problems/m-coloring-problem-1587115620/1" },
              { id: "dsa-445", sr: 445, name: "N-Queens", difficulty: 5, url: "https://leetcode.com/problems/n-queens/" },
              { id: "dsa-446", sr: 446, name: "N-Queens II", difficulty: 5, url: "https://leetcode.com/problems/n-queens-ii/" },
              { id: "dsa-447", sr: 447, name: "Sudoku Solver", difficulty: 5, url: "https://leetcode.com/problems/sudoku-solver/" },
            ],
          },
        ],
      },
      {
        id: "phase-9-dynamic-programming",
        name: "Dynamic Programming",
        subtopics: [
          {
            name: "1D DP (Intro to State & Transitions)",
            problems: [
              { id: "dsa-448", sr: 448, name: "Fibonacci Number", difficulty: 1, url: "https://leetcode.com/problems/fibonacci-number/" },
              { id: "dsa-449", sr: 449, name: "Climbing Stairs", difficulty: 1, url: "https://leetcode.com/problems/climbing-stairs/" },
              { id: "dsa-450", sr: 450, name: "Min Cost Climbing Stairs", difficulty: 2, url: "https://leetcode.com/problems/min-cost-climbing-stairs/" },
              { id: "dsa-451", sr: 451, name: "Frog Jump", difficulty: 2, url: "https://leetcode.com/problems/frog-jump/" },
              { id: "dsa-452", sr: 452, name: "Frog Jump with K Distances", difficulty: 2, url: "https://leetcode.com/problems/frog-jump-ii/" },
              { id: "dsa-453", sr: 453, name: "House Robber", difficulty: 2, url: "https://leetcode.com/problems/house-robber/" },
              { id: "dsa-454", sr: 454, name: "House Robber II", difficulty: 3, url: "https://leetcode.com/problems/house-robber-ii/" },
              { id: "dsa-455", sr: 455, name: "Decode Ways", difficulty: 3, url: "https://leetcode.com/problems/decode-ways/" },
            ],
          },
          {
            name: "2D Grids & Paths",
            problems: [
              { id: "dsa-456", sr: 456, name: "Unique Paths", difficulty: 2, url: "https://leetcode.com/problems/unique-paths/" },
              { id: "dsa-457", sr: 457, name: "Unique Paths II", difficulty: 3, url: "https://leetcode.com/problems/unique-paths-ii/" },
              { id: "dsa-458", sr: 458, name: "Minimum Path Sum", difficulty: 3, url: "https://leetcode.com/problems/minimum-path-sum/" },
              { id: "dsa-459", sr: 459, name: "Triangle", difficulty: 3, url: "https://leetcode.com/problems/triangle/" },
              { id: "dsa-460", sr: 460, name: "Minimum Falling Path Sum", difficulty: 3, url: "https://leetcode.com/problems/minimum-falling-path-sum/" },
              { id: "dsa-461", sr: 461, name: "Dungeon Game", difficulty: 4, url: "https://leetcode.com/problems/dungeon-game/" },
              { id: "dsa-462", sr: 462, name: "Cherry Pickup II / Ninja and his Friends", difficulty: 4, url: "https://leetcode.com/problems/cherry-pickup-ii/" },
            ],
          },
          {
            name: "0/1 Knapsack & Subsets",
            problems: [
              { id: "dsa-463", sr: 463, name: "Subset Sum Problem", difficulty: 2, url: "https://www.geeksforgeeks.org/problems/subset-sum-problem-1611555638/1" },
              { id: "dsa-464", sr: 464, name: "Partition Equal Subset Sum", difficulty: 3, url: "https://leetcode.com/problems/partition-equal-subset-sum/" },
              { id: "dsa-465", sr: 465, name: "Count Subsets with Sum K", difficulty: 3, url: "https://www.naukri.com/code360/problems/count-subsets-with-sum-k_3952532" },
              { id: "dsa-466", sr: 466, name: "Target Sum", difficulty: 3, url: "https://www.geeksforgeeks.org/problems/target-sum-1626326450/1" },
              { id: "dsa-467", sr: 467, name: "Count Partitions with Given Difference", difficulty: 3, url: "https://www.geeksforgeeks.org/problems/partitions-with-given-difference/1" },
              { id: "dsa-468", sr: 468, name: "0/1 Knapsack Problem", difficulty: 3, url: "https://www.geeksforgeeks.org/problems/0-1-knapsack-problem0945/1" },
              { id: "dsa-469", sr: 469, name: "Partition Array Into Two Arrays to Minimize Sum Difference", difficulty: 4, url: "https://leetcode.com/problems/partition-array-into-two-arrays-to-minimize-sum-difference/" },
              { id: "dsa-470", sr: 470, name: "Last Stone Weight II", difficulty: 4, url: "https://leetcode.com/problems/last-stone-weight-ii/" },
            ],
          },
          {
            name: "Unbounded Knapsack",
            problems: [
              { id: "dsa-471", sr: 471, name: "Rod Cutting Problem", difficulty: 3, url: "https://www.geeksforgeeks.org/problems/rod-cutting0840/1" },
              { id: "dsa-472", sr: 472, name: "Coin Change", difficulty: 3, url: "https://leetcode.com/problems/coin-change/" },
              { id: "dsa-473", sr: 473, name: "Coin Change II", difficulty: 3, url: "https://leetcode.com/problems/coin-change-ii/" },
              { id: "dsa-474", sr: 474, name: "Perfect Squares", difficulty: 3, url: "https://leetcode.com/problems/perfect-squares/" },
            ],
          },
          {
            name: "DP on Strings (LCS & Edit Distance Patterns)",
            problems: [
              { id: "dsa-475", sr: 475, name: "Longest Common Subsequence", difficulty: 3, url: "https://leetcode.com/problems/longest-common-subsequence/" },
              { id: "dsa-476", sr: 476, name: "Print Longest Common Subsequence", difficulty: 3, url: "https://www.geeksforgeeks.org/problems/print-all-lcs-sequences3413/1" },
              { id: "dsa-477", sr: 477, name: "Longest Common Substring", difficulty: 3, url: "https://www.geeksforgeeks.org/problems/longest-common-substring1452/1" },
              { id: "dsa-478", sr: 478, name: "Longest Palindromic Subsequence", difficulty: 3, url: "https://leetcode.com/problems/longest-palindromic-subsequence/" },
              { id: "dsa-479", sr: 479, name: "Minimum Insertions to Make String Palindrome", difficulty: 3, url: "https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/" },
              { id: "dsa-480", sr: 480, name: "Delete Operation for Two Strings", difficulty: 3, url: "https://leetcode.com/problems/delete-operation-for-two-strings/" },
              { id: "dsa-481", sr: 481, name: "Shortest Common Supersequence", difficulty: 4, url: "https://leetcode.com/problems/shortest-common-supersequence/description/" },
              { id: "dsa-482", sr: 482, name: "Distinct Subsequences", difficulty: 4, url: "https://leetcode.com/problems/distinct-subsequences/" },
              { id: "dsa-483", sr: 483, name: "Edit Distance", difficulty: 4, url: "https://leetcode.com/problems/edit-distance/" },
              { id: "dsa-484", sr: 484, name: "Wildcard Matching", difficulty: 4, url: "https://leetcode.com/problems/wildcard-matching/" },
              { id: "dsa-485", sr: 485, name: "Regular Expression Matching", difficulty: 5, url: "https://leetcode.com/problems/regular-expression-matching/" },
            ],
          },
          {
            name: "DP on Stocks",
            problems: [
              { id: "dsa-486", sr: 486, name: "Best Time to Buy and Sell Stock", difficulty: 1, url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/" },
              { id: "dsa-487", sr: 487, name: "Best Time to Buy and Sell Stock II", difficulty: 2, url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/" },
              { id: "dsa-488", sr: 488, name: "Best Time to Buy and Sell Stock with Cooldown", difficulty: 2, url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/" },
              { id: "dsa-489", sr: 489, name: "Best Time to Buy and Sell Stock with Transaction Fee", difficulty: 3, url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/" },
              { id: "dsa-490", sr: 490, name: "Best Time to Buy and Sell Stock III", difficulty: 4, url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/" },
              { id: "dsa-491", sr: 491, name: "Best Time to Buy and Sell Stock IV", difficulty: 4, url: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/" },
            ],
          },
          {
            name: "Longest Increasing Subsequence (LIS)",
            problems: [
              { id: "dsa-492", sr: 492, name: "Longest Increasing Subsequence", difficulty: 3, url: "https://leetcode.com/problems/longest-increasing-subsequence/" },
              { id: "dsa-493", sr: 493, name: "Print Longest Increasing Subsequence", difficulty: 3, url: "https://www.geeksforgeeks.org/problems/printing-longest-increasing-subsequence/1" },
              { id: "dsa-494", sr: 494, name: "Largest Divisible Subset", difficulty: 3, url: "https://leetcode.com/problems/largest-divisible-subset/" },
              { id: "dsa-495", sr: 495, name: "Longest String Chain", difficulty: 3, url: "https://leetcode.com/problems/longest-string-chain/" },
              { id: "dsa-496", sr: 496, name: "Longest Bitonic Subsequence", difficulty: 4, url: "https://www.geeksforgeeks.org/problems/longest-bitonic-subsequence0824/1" },
              { id: "dsa-497", sr: 497, name: "Number of Longest Increasing Subsequences", difficulty: 4, url: "https://leetcode.com/problems/number-of-longest-increasing-subsequence/description/" },
              { id: "dsa-498", sr: 498, name: "Russian Doll Envelopes", difficulty: 5, url: "https://leetcode.com/problems/russian-doll-envelopes/" },
            ],
          },
          {
            name: "Partition DP & Matrix Chain Multiplication (MCM)",
            problems: [
              { id: "dsa-499", sr: 499, name: "Matrix Chain Multiplication", difficulty: 4, url: "https://www.geeksforgeeks.org/problems/matrix-chain-multiplication0303/1" },
              { id: "dsa-500", sr: 500, name: "Minimum Cost to Cut a Stick", difficulty: 4, url: "https://leetcode.com/problems/minimum-cost-to-cut-a-stick/" },
              { id: "dsa-501", sr: 501, name: "Burst Balloons", difficulty: 5, url: "https://leetcode.com/problems/burst-balloons/" },
              { id: "dsa-502", sr: 502, name: "Palindrome Partitioning II", difficulty: 5, url: "https://leetcode.com/problems/palindrome-partitioning-ii/" },
            ],
          },
        ],
      },
    ],
  },
]

export const allDsaProblems = dsaPhases.flatMap((ph) =>
  ph.topics.flatMap((t) => t.subtopics.flatMap((s) => s.problems.map((p) => ({
    ...p, phaseId: ph.id, phaseTitle: ph.title, topic: t.name, subtopic: s.name,
  }))))
)
export const allDsaProblemIds = allDsaProblems.map((p) => p.id)
export const totalDsaProblems = allDsaProblems.length
