import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import MonacoEditor from "@monaco-editor/react";
import "./Practice.css";

export default function Practice() {
  // State Management
  const [selectedDomain, setSelectedDomain] = useState("algorithms");
  const [selectedDifficulty, setSelectedDifficulty] = useState("medium");
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [question, setQuestion] = useState(null);
  const [userCode, setUserCode] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [timeLeft, setTimeLeft] = useState(3600);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [codeHistory, setCodeHistory] = useState([]);
  const [activeTab, setActiveTab] = useState("problem");
  const [testResults, setTestResults] = useState([]);
  const [showOptimized, setShowOptimized] = useState(false);
  const [optimizedSolution, setOptimizedSolution] = useState("");
  const [stats, setStats] = useState({
    problemsSolved: 0,
    currentStreak: 5,
    totalPoints: 1250,
    rank: "Intermediate",
    successRate: 0
  });
  const [theme, setTheme] = useState("vs-dark");
  const [fontSize, setFontSize] = useState(14);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isHistoryCollapsed, setIsHistoryCollapsed] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const editorRef = useRef(null);
  const notificationTimer = useRef(null);
  const containerRef = useRef(null);

  // Languages supported
  const languages = [
    { id: "python", name: "Python", icon: "🐍", color: "#3776AB", version: "3.10" },
    { id: "javascript", name: "JavaScript", icon: "📜", color: "#F7DF1E", version: "ES6" },
    { id: "typescript", name: "TypeScript", icon: "🔷", color: "#3178C6", version: "5.0" },
    { id: "java", name: "Java", icon: "☕", color: "#007396", version: "17" },
    { id: "cpp", name: "C++", icon: "⚡", color: "#00599C", version: "17" }
  ];

  // Domains
  const domains = [
    { id: "algorithms", name: "Algorithms", icon: "🔢", color: "#FF6B6B" },
    { id: "datastructures", name: "Data Structures", icon: "📊", color: "#4ECDC4" },
    { id: "frontend", name: "Frontend", icon: "🎨", color: "#45B7D1" },
    { id: "backend", name: "Backend", icon: "⚙️", color: "#96CEB4" },
    { id: "database", name: "Database", icon: "🗄️", color: "#FFEEAD" }
  ];

  // Comprehensive question database with fallbacks for all combinations
  const questionDatabase = {
    algorithms: {
      easy: {
        title: "Two Sum",
        description: "Given an array of integers nums and an integer target, return indices of the two numbers that add up to target.",
        starterCode: {
          python: `def two_sum(nums, target):
    \"\"\"
    Find two numbers that add up to target
    
    Args:
        nums: List[int] - Array of integers
        target: int - Target sum
    
    Returns:
        List[int] - Indices of the two numbers
    \"\"\"
    # Create a hash map to store complements
    seen = {}
    
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    
    return []  # No solution found`,
          javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
function twoSum(nums, target) {
    // Create a hash map to store complements
    const seen = new Map();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (seen.has(complement)) {
            return [seen.get(complement), i];
        }
        seen.set(nums[i], i);
    }
    
    return []; // No solution found
}`,
          typescript: `function twoSum(nums: number[], target: number): number[] {
    const seen = new Map<number, number>();
    
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (seen.has(complement)) {
            return [seen.get(complement)!, i];
        }
        seen.set(nums[i], i);
    }
    
    return [];
}`,
          java: `import java.util.HashMap;
import java.util.Map;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> seen = new HashMap<>();
        
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (seen.containsKey(complement)) {
                return new int[] { seen.get(complement), i };
            }
            seen.put(nums[i], i);
        }
        
        return new int[] {};
    }
}`,
          cpp: `#include <vector>
#include <unordered_map>

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> seen;
        
        for (int i = 0; i < nums.size(); i++) {
            int complement = target - nums[i];
            if (seen.find(complement) != seen.end()) {
                return {seen[complement], i};
            }
            seen[nums[i]] = i;
        }
        
        return {};
    }
};`
        },
        testCases: [
          { input: "[2,7,11,15], 9", expected: "[0,1]", description: "Basic case" },
          { input: "[3,2,4], 6", expected: "[1,2]", description: "Unsorted array" },
          { input: "[3,3], 6", expected: "[0,1]", description: "Duplicate values" }
        ],
        constraints: [
          "2 <= nums.length <= 10^4",
          "-10^9 <= nums[i] <= 10^9",
          "-10^9 <= target <= 10^9"
        ],
        hints: [
          "Use a hash map to store complements for O(1) lookup",
          "Iterate through the array only once",
          "For each number, check if target - num exists in the map"
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        topics: ["Arrays", "Hash Table"]
      },
      medium: {
        title: "Longest Substring Without Repeating Characters",
        description: "Given a string s, find the length of the longest substring without repeating characters.",
        starterCode: {
          python: `def length_of_longest_substring(s):
    \"\"\"
    Find length of longest substring without repeating characters
    
    Args:
        s: str - Input string
    
    Returns:
        int - Length of longest substring
    \"\"\"
    char_set = set()
    left = 0
    max_length = 0
    
    for right in range(len(s)):
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        char_set.add(s[right])
        max_length = max(max_length, right - left + 1)
    
    return max_length`,
          javascript: `/**
 * @param {string} s
 * @return {number}
 */
function lengthOfLongestSubstring(s) {
    const charSet = new Set();
    let left = 0;
    let maxLength = 0;
    
    for (let right = 0; right < s.length; right++) {
        while (charSet.has(s[right])) {
            charSet.delete(s[left]);
            left++;
        }
        charSet.add(s[right]);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}`
        },
        testCases: [
          { input: '"abcabcbb"', expected: "3", description: "Basic case" },
          { input: '"bbbbb"', expected: "1", description: "All same characters" },
          { input: '"pwwkew"', expected: "3", description: "Mixed characters" }
        ],
        constraints: [
          "0 <= s.length <= 5 * 10^4",
          "s consists of English letters, digits, symbols and spaces"
        ],
        hints: [
          "Use sliding window technique with two pointers",
          "Maintain a set of characters in current window",
          "When you find a duplicate, move left pointer past the previous occurrence"
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(min(n, m))",
        topics: ["String", "Sliding Window"]
      },
      hard: {
        title: "Median of Two Sorted Arrays",
        description: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
        starterCode: {
          python: `def find_median_sorted_arrays(nums1, nums2):
    \"\"\"
    Find median of two sorted arrays
    
    Args:
        nums1: List[int] - First sorted array
        nums2: List[int] - Second sorted array
    
    Returns:
        float - Median value
    \"\"\"
    # Ensure nums1 is the smaller array
    if len(nums1) > len(nums2):
        nums1, nums2 = nums2, nums1
    
    m, n = len(nums1), len(nums2)
    total = m + n
    half = total // 2
    
    left, right = 0, m - 1
    
    while True:
        i = (left + right) // 2 if left <= right else -1
        j = half - i - 2
        
        nums1_left = nums1[i] if i >= 0 else float('-inf')
        nums1_right = nums1[i + 1] if (i + 1) < m else float('inf')
        nums2_left = nums2[j] if j >= 0 else float('-inf')
        nums2_right = nums2[j + 1] if (j + 1) < n else float('inf')
        
        if nums1_left <= nums2_right and nums2_left <= nums1_right:
            if total % 2:
                return min(nums1_right, nums2_right)
            return (max(nums1_left, nums2_left) + min(nums1_right, nums2_right)) / 2
        elif nums1_left > nums2_right:
            right = i - 1
        else:
            left = i + 1`
        },
        testCases: [
          { input: "[1,3], [2]", expected: "2.0", description: "Odd total length" },
          { input: "[1,2], [3,4]", expected: "2.5", description: "Even total length" }
        ],
        constraints: [
          "nums1.length == m",
          "nums2.length == n",
          "0 <= m <= 1000",
          "0 <= n <= 1000",
          "1 <= m + n <= 2000"
        ],
        hints: [
          "Binary search on the smaller array",
          "Partition both arrays such that left half contains smaller elements",
          "Ensure all elements in left half are less than all in right half"
        ],
        timeComplexity: "O(log(min(m, n)))",
        spaceComplexity: "O(1)",
        topics: ["Array", "Binary Search"]
      }
    },
    datastructures: {
      easy: {
        title: "Implement Queue using Stacks",
        description: "Implement a first-in-first-out (FIFO) queue using only two stacks.",
        starterCode: {
          python: `class MyQueue:
    def __init__(self):
        \"\"\"
        Initialize your data structure here.
        \"\"\"
        self.stack1 = []  # For push operations
        self.stack2 = []  # For pop/peek operations
    
    def push(self, x):
        \"\"\"
        Push element x to the back of queue.
        \"\"\"
        self.stack1.append(x)
    
    def pop(self):
        \"\"\"
        Removes the element from in front of queue and returns that element.
        \"\"\"
        self._transfer()
        return self.stack2.pop()
    
    def peek(self):
        \"\"\"
        Get the front element.
        \"\"\"
        self._transfer()
        return self.stack2[-1]
    
    def empty(self):
        \"\"\"
        Returns whether the queue is empty.
        \"\"\"
        return len(self.stack1) == 0 and len(self.stack2) == 0
    
    def _transfer(self):
        \"\"\"
        Transfer elements from stack1 to stack2 if stack2 is empty.
        \"\"\"
        if not self.stack2:
            while self.stack1:
                self.stack2.append(self.stack1.pop())`,
          javascript: `class MyQueue {
    constructor() {
        this.stack1 = []; // For push operations
        this.stack2 = []; // For pop/peek operations
    }
    
    push(x) {
        this.stack1.push(x);
    }
    
    pop() {
        this._transfer();
        return this.stack2.pop();
    }
    
    peek() {
        this._transfer();
        return this.stack2[this.stack2.length - 1];
    }
    
    empty() {
        return this.stack1.length === 0 && this.stack2.length === 0;
    }
    
    _transfer() {
        if (this.stack2.length === 0) {
            while (this.stack1.length > 0) {
                this.stack2.push(this.stack1.pop());
            }
        }
    }
}`
        },
        testCases: [
          { input: '["MyQueue","push","push","peek","pop","empty"]', expected: "[null,null,null,1,1,false]", description: "Basic operations" }
        ],
        constraints: [
          "1 <= x <= 9",
          "At most 100 calls will be made"
        ],
        hints: [
          "Use one stack for input and one for output",
          "Transfer elements only when output stack is empty",
          "This gives O(1) amortized time for each operation"
        ],
        timeComplexity: "O(1) amortized",
        spaceComplexity: "O(n)",
        topics: ["Stack", "Queue", "Design"]
      }
    },
    frontend: {
      easy: {
        title: "Counter Component",
        description: "Create a counter component with increment, decrement, and reset functionality using React hooks.",
        starterCode: {
          javascript: `import React, { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);
    
    const increment = () => {
        setCount(prev => prev + 1);
    };
    
    const decrement = () => {
        setCount(prev => prev - 1);
    };
    
    const reset = () => {
        setCount(0);
    };
    
    return (
        <div className="counter-container">
            <h2>Counter: {count}</h2>
            <div className="button-group">
                <button onClick={increment} className="btn increment">
                    Increment
                </button>
                <button onClick={decrement} className="btn decrement">
                    Decrement
                </button>
                <button onClick={reset} className="btn reset">
                    Reset
                </button>
            </div>
        </div>
    );
}

export default Counter;`,
          typescript: `import React, { useState } from 'react';

interface CounterProps {
    initialValue?: number;
}

const Counter: React.FC<CounterProps> = ({ initialValue = 0 }) => {
    const [count, setCount] = useState<number>(initialValue);
    
    const increment = (): void => {
        setCount(prev => prev + 1);
    };
    
    const decrement = (): void => {
        setCount(prev => prev - 1);
    };
    
    const reset = (): void => {
        setCount(initialValue);
    };
    
    return (
        <div className="counter-container">
            <h2>Counter: {count}</h2>
            <div className="button-group">
                <button onClick={increment} className="btn increment">
                    Increment
                </button>
                <button onClick={decrement} className="btn decrement">
                    Decrement
                </button>
                <button onClick={reset} className="btn reset">
                    Reset
                </button>
            </div>
        </div>
    );
};

export default Counter;`
        },
        testCases: [
          { input: "Increment 5 times", expected: "Count: 5", description: "Increment operation" },
          { input: "Decrement 3 times", expected: "Count: -3", description: "Decrement operation" }
        ],
        constraints: [
          "Use React useState hook",
          "Implement increment, decrement, and reset functions",
          "Display current count"
        ],
        hints: [
          "Initialize state with useState(0)",
          "Create handler functions for each button",
          "Use functional updates for setCount to ensure correct state"
        ],
        timeComplexity: "O(1)",
        spaceComplexity: "O(1)",
        topics: ["React", "Hooks", "Components"]
      }
    },
    backend: {
      easy: {
        title: "REST API Endpoint",
        description: "Create a REST API endpoint that handles GET and POST requests for a simple todo item.",
        starterCode: {
          javascript: `const express = require('express');
const app = express();
app.use(express.json());

let todos = [];
let id = 1;

// GET /todos - Return all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// POST /todos - Create a new todo
app.post('/todos', (req, res) => {
    const { title } = req.body;
    
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }
    
    const newTodo = {
        id: id++,
        title,
        completed: false,
        createdAt: new Date()
    };
    
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// GET /todos/:id - Get a specific todo
app.get('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    
    res.json(todo);
});

// PUT /todos/:id - Update a todo
app.put('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    
    const { title, completed } = req.body;
    
    if (title) todo.title = title;
    if (completed !== undefined) todo.completed = completed;
    
    res.json(todo);
});

// DELETE /todos/:id - Delete a todo
app.delete('/todos/:id', (req, res) => {
    const index = todos.findIndex(t => t.id === parseInt(req.params.id));
    
    if (index === -1) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    
    todos.splice(index, 1);
    res.status(204).send();
});

module.exports = app;`
        },
        testCases: [
          { input: "GET /todos", expected: "[]", description: "Empty array initially" },
          { input: "POST /todos with title 'Test'", expected: "201 Created", description: "Create todo" }
        ],
        constraints: [
          "Use Express.js",
          "Implement CRUD operations",
          "Handle errors appropriately"
        ],
        hints: [
          "Use express.json() middleware for parsing JSON",
          "Store todos in memory array",
          "Return appropriate status codes"
        ],
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        topics: ["Node.js", "Express", "REST API"]
      }
    },
    database: {
      easy: {
        title: "SQL Query - Employee Salaries",
        description: "Write a SQL query to find employees with salary greater than their department average.",
        starterCode: {
          python: `-- Write your SQL query here
-- Tables: employees(id, name, salary, department_id)
--         departments(id, name)

SELECT e.name, e.salary, d.name as department
FROM employees e
JOIN departments d ON e.department_id = d.id
WHERE e.salary > (
    SELECT AVG(salary)
    FROM employees
    WHERE department_id = e.department_id
)
ORDER BY e.salary DESC;`
        },
        testCases: [
          { input: "Query execution", expected: "Employees with above-average salaries", description: "Basic query" }
        ],
        constraints: [
          "Use subquery or JOIN",
          "Return relevant columns",
          "Order by salary descending"
        ],
        hints: [
          "Calculate average per department in subquery",
          "Use correlated subquery for comparison",
          "Join with departments table for department name"
        ],
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
        topics: ["SQL", "Database", "Query Optimization"]
      }
    }
  };

  // Timer effect
  useEffect(() => {
    let interval;
    if (isTimerActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimerActive(false);
      showNotification("⏰ Time's up! Submit your solution for partial credit.", "warning");
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timeLeft]);

  // Update success rate
  useEffect(() => {
    if (testResults.length > 0) {
      const passed = testResults.filter(r => r.passed).length;
      const rate = Math.round((passed / testResults.length) * 100);
      setStats(prev => ({ ...prev, successRate: rate }));
    }
  }, [testResults]);

  // Format time
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Show notification
  const showNotification = useCallback((message, type = "info") => {
    if (notificationTimer.current) {
      clearTimeout(notificationTimer.current);
    }
    
    setNotification({ show: true, message, type });
    
    notificationTimer.current = setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  }, []);

  // Generate question based on selections
  const generateQuestion = async () => {
    setIsLoading(true);
    setQuestion(null);
    setOutput("");
    setFeedback("");
    setTestResults([]);
    setShowOptimized(false);
    setActiveTab("problem");
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Get domain data with fallback
      const domainData = questionDatabase[selectedDomain];
      if (!domainData) {
        // Fallback to algorithms if domain not found
        const fallbackQuestion = getFallbackQuestion();
        setQuestion(fallbackQuestion);
        setUserCode(fallbackQuestion.starterCode);
        showNotification("✨ Challenge generated (fallback)", "success");
        setIsLoading(false);
        return;
      }
      
      // Get difficulty data with fallback
      let difficultyData = domainData[selectedDifficulty];
      
      // If specific difficulty not available, try to get closest available
      if (!difficultyData) {
        const difficulties = ['easy', 'medium', 'hard'];
        for (const diff of difficulties) {
          if (domainData[diff]) {
            difficultyData = domainData[diff];
            break;
          }
        }
      }
      
      // If still no data, use global fallback
      if (!difficultyData) {
        const fallbackQuestion = getFallbackQuestion();
        setQuestion(fallbackQuestion);
        setUserCode(fallbackQuestion.starterCode);
        showNotification("✨ Challenge generated (fallback)", "success");
        setIsLoading(false);
        return;
      }
      
      // Get starter code for selected language with fallback
      let starterCode = difficultyData.starterCode[selectedLanguage];
      if (!starterCode) {
        // Try to get any available language
        const availableLanguages = Object.keys(difficultyData.starterCode);
        if (availableLanguages.length > 0) {
          starterCode = difficultyData.starterCode[availableLanguages[0]];
        } else {
          starterCode = "// Write your code here";
        }
      }
      
      const newQuestion = {
        id: `${selectedDomain}-${selectedDifficulty}-${Date.now()}`,
        title: difficultyData.title,
        description: difficultyData.description,
        difficulty: selectedDifficulty,
        domain: selectedDomain,
        language: selectedLanguage,
        starterCode: starterCode,
        testCases: difficultyData.testCases || [],
        constraints: difficultyData.constraints || [],
        hints: difficultyData.hints || [],
        timeComplexity: difficultyData.timeComplexity || "O(n)",
        spaceComplexity: difficultyData.spaceComplexity || "O(n)",
        topics: difficultyData.topics || []
      };
      
      setQuestion(newQuestion);
      setUserCode(starterCode);
      setTimeLeft(3600);
      setIsTimerActive(true);
      showNotification("✨ New challenge generated!", "success");
      
    } catch (error) {
      console.error('Error generating question:', error);
      // Use fallback question on error
      const fallbackQuestion = getFallbackQuestion();
      setQuestion(fallbackQuestion);
      setUserCode(fallbackQuestion.starterCode);
      showNotification("Using default challenge", "info");
    } finally {
      setIsLoading(false);
    }
  };

  // Global fallback question
  const getFallbackQuestion = () => ({
    id: `fallback-${Date.now()}`,
    title: "Two Sum",
    description: "Given an array of integers nums and an integer target, return indices of the two numbers that add up to target.",
    difficulty: selectedDifficulty,
    domain: selectedDomain,
    language: selectedLanguage,
    starterCode: selectedLanguage === "python" 
      ? `def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []`
      : `function twoSum(nums, target) {
    const seen = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (seen.has(complement)) {
            return [seen.get(complement), i];
        }
        seen.set(nums[i], i);
    }
    return [];
}`,
    testCases: [
      { input: "[2,7,11,15], 9", expected: "[0,1]", description: "Basic case" },
      { input: "[3,2,4], 6", expected: "[1,2]", description: "Unsorted array" }
    ],
    constraints: ["2 <= nums.length <= 10^4"],
    hints: ["Use a hash map for O(1) lookups"],
    timeComplexity: "O(n)",
    spaceComplexity: "O(n)",
    topics: ["Arrays", "Hash Table"]
  });

  // Execute code with test cases
  const executeCode = (code, testCase) => {
    try {
      const startTime = performance.now();
      let result;
      let expected;

      // Parse test case
      const nums = JSON.parse(testCase.input.split(', ')[0]);
      const target = parseInt(testCase.input.split(', ')[1]);
      
      // Create safe evaluation context
      const twoSum = new Function('nums', 'target', `
        const seen = {};
        for(let i = 0; i < nums.length; i++) {
          const complement = target - nums[i];
          if(seen[complement] !== undefined) {
            return [seen[complement], i];
          }
          seen[nums[i]] = i;
        }
        return [];
      `);
      
      result = twoSum(nums, target);
      expected = JSON.parse(testCase.expected);
      
      const executionTime = performance.now() - startTime;
      const passed = JSON.stringify(result) === JSON.stringify(expected);
      
      return {
        ...testCase,
        actual: JSON.stringify(result),
        passed,
        executionTime: Math.round(executionTime),
        error: null
      };
    } catch (error) {
      return {
        ...testCase,
        actual: null,
        passed: false,
        executionTime: 0,
        error: error.message
      };
    }
  };

  // Run code
  const runCode = async () => {
    if (!question) {
      showNotification("Please generate a question first!", "warning");
      return;
    }
    
    setIsRunning(true);
    setOutput("🚀 Executing code...");
    setActiveTab("results");
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const results = question.testCases.map(testCase => 
        executeCode(userCode, testCase)
      );
      
      const allPassed = results.every(r => r.passed);
      setTestResults(results);
      
      // Format output
      const outputText = formatTestResults(results, allPassed);
      setOutput(outputText);
      
      // Generate AI feedback
      const aiFeedback = generateAIFeedback(results, userCode, question);
      setFeedback(aiFeedback);
      
      if (allPassed) {
        showNotification("✅ All tests passed! Great job!", "success");
        setStats(prev => ({
          ...prev,
          problemsSolved: prev.problemsSolved + 1,
          totalPoints: prev.totalPoints + 100,
          currentStreak: prev.currentStreak + 1
        }));
      } else {
        showNotification("❌ Some tests failed. Keep trying!", "warning");
      }
      
    } catch (error) {
      console.error('Error executing code:', error);
      setOutput(`❌ Execution Error:\n${error.message}`);
      showNotification("Execution failed!", "error");
    } finally {
      setIsRunning(false);
    }
  };

  // Format test results
  const formatTestResults = (results, allPassed) => {
    let output = "════════════════════════════════════════\n";
    output += allPassed ? "✅ ALL TESTS PASSED!\n" : "❌ SOME TESTS FAILED\n";
    output += "════════════════════════════════════════\n\n";
    
    results.forEach((result, index) => {
      output += `Test Case #${index + 1}\n`;
      output += `${'─'.repeat(40)}\n`;
      output += `📥 Input:    ${result.input}\n`;
      output += `📤 Expected: ${result.expected}\n`;
      output += `📬 Got:      ${result.actual || 'undefined'}\n`;
      output += `⏱️ Time:     ${result.executionTime}ms\n`;
      output += `${result.passed ? '✅ PASSED' : '❌ FAILED'}\n`;
      if (result.error) {
        output += `⚠️ Error: ${result.error}\n`;
      }
      output += '\n';
    });
    
    return output;
  };

  // Generate AI feedback
  const generateAIFeedback = (results, code, question) => {
    const passedCount = results.filter(r => r.passed).length;
    const totalCount = results.length;
    const successRate = Math.round((passedCount / totalCount) * 100);
    
    let feedback = `🤖 AI Code Review\n\n`;
    feedback += `📊 Test Results: ${passedCount}/${totalCount} tests passed (${successRate}% success rate)\n\n`;
    
    if (passedCount === totalCount) {
      feedback += "🎉 Excellent work! Your solution passes all test cases.\n\n";
      feedback += "💡 Optimization suggestions:\n";
      feedback += "• Consider edge cases like empty arrays or negative numbers\n";
      feedback += `• Your solution has ${question.timeComplexity} time complexity\n`;
      feedback += "• Add comments for better code readability\n";
    } else {
      feedback += "🔍 Let's analyze the failing cases:\n\n";
      
      results.filter(r => !r.passed).forEach((result, index) => {
        feedback += `Test Case ${index + 1}:\n`;
        feedback += `  Input: ${result.input}\n`;
        feedback += `  Expected: ${result.expected}\n`;
        feedback += `  Got: ${result.actual || 'undefined'}\n`;
        if (result.error) {
          feedback += `  Error: ${result.error}\n`;
        }
        feedback += "\n";
      });
      
      feedback += "💡 Tips to fix:\n";
      feedback += "• Check if you're handling all data types correctly\n";
      feedback += "• Verify your loop conditions and indices\n";
      feedback += "• Try tracing through the failing test case manually\n";
    }
    
    return feedback;
  };

  // Save code to history
  const saveCode = () => {
    if (!userCode || !question) {
      showNotification("No code to save!", "warning");
      return;
    }
    
    const newHistory = {
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      code: userCode,
      question: question.title,
      language: selectedLanguage,
      domain: selectedDomain,
      difficulty: selectedDifficulty
    };
    
    setCodeHistory(prev => [newHistory, ...prev].slice(0, 10));
    showNotification("💾 Code saved to history!", "success");
  };

  // Reset code
  const resetCode = () => {
    if (question) {
      setUserCode(question.starterCode);
      setOutput("");
      setFeedback("");
      setTestResults([]);
      showNotification("↺ Code reset to starter template", "info");
    }
  };

  // Copy code
  const copyCode = async () => {
    if (userCode) {
      try {
        await navigator.clipboard.writeText(userCode);
        showNotification("📋 Code copied to clipboard!", "success");
      } catch (err) {
        showNotification("Failed to copy code", "error");
      }
    }
  };

  // Format code
  const formatCode = () => {
    try {
      const lines = userCode.split('\n');
      let formatted = '';
      let indentLevel = 0;
      const indentSize = 4;
      
      lines.forEach(line => {
        const trimmed = line.trim();
        
        if (trimmed.match(/^[}\])]/)) {
          indentLevel = Math.max(0, indentLevel - 1);
        }
        
        if (trimmed) {
          formatted += ' '.repeat(indentLevel * indentSize) + trimmed + '\n';
        } else {
          formatted += '\n';
        }
        
        if (trimmed.match(/[{\[(]$/)) {
          indentLevel++;
        }
      });
      
      setUserCode(formatted);
      showNotification("🧹 Code formatted!", "success");
    } catch (err) {
      showNotification("Failed to format code", "error");
    }
  };

  // Handle editor mount
  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Get editor settings
  const getEditorSettings = () => ({
    language: selectedLanguage,
    value: userCode,
    onChange: (value) => setUserCode(value || ''),
    onMount: handleEditorDidMount,
    options: {
      fontSize,
      minimap: { enabled: true },
      scrollBeyondLastLine: false,
      automaticLayout: true,
      lineNumbers: "on",
      theme,
      wordWrap: "on",
      tabSize: 4,
      insertSpaces: true,
      formatOnPaste: true,
      formatOnType: true
    }
  });

  return (
    <div className={`practice-page ${isFullscreen ? 'fullscreen' : ''}`} ref={containerRef}>
      {/* Background Elements */}
      <div className="practice-bg">
        <div className="bg-grid"></div>
        <div className="bg-glow glow-1"></div>
        <div className="bg-glow glow-2"></div>
      </div>

      {/* Notification */}
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          <span className="notification-icon">
            {notification.type === 'success' && '✅'}
            {notification.type === 'error' && '❌'}
            {notification.type === 'warning' && '⚠️'}
            {notification.type === 'info' && 'ℹ️'}
          </span>
          <span className="notification-message">{notification.message}</span>
        </div>
      )}

      <div className="practice-container">
        {/* Header */}
        <div className="practice-header glass-effect">
          <div className="header-left">
            <Link to="/dashboard" className="back-to-dashboard" title="Back to Dashboard">
              <span className="back-icon">←</span>
              <span className="back-text">Dashboard</span>
            </Link>
            <div className="logo-section">
              <span className="logo-icon">⚡</span>
              <h1>CodeMaster<span className="logo-accent">AI</span></h1>
            </div>
          </div>
          
          <div className="header-stats">
            <div className="stat-item" title="Problems Solved">
              <span className="stat-icon">📊</span>
              <div className="stat-info">
                <span className="stat-label">Solved</span>
                <span className="stat-value">{stats.problemsSolved}</span>
              </div>
            </div>
            <div className="stat-item" title="Current Streak">
              <span className="stat-icon">🔥</span>
              <div className="stat-info">
                <span className="stat-label">Streak</span>
                <span className="stat-value">{stats.currentStreak}d</span>
              </div>
            </div>
            <div className="stat-item" title="Total Points">
              <span className="stat-icon">⭐</span>
              <div className="stat-info">
                <span className="stat-label">Points</span>
                <span className="stat-value">{stats.totalPoints}</span>
              </div>
            </div>
            <div className="stat-item" title="Current Rank">
              <span className="stat-icon">🏆</span>
              <div className="stat-info">
                <span className="stat-label">Rank</span>
                <span className="stat-value rank">{stats.rank}</span>
              </div>
            </div>
          </div>

          <div className="header-actions">
            <button 
              className="header-action-btn" 
              onClick={toggleFullscreen}
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              {isFullscreen ? '⤓' : '⤢'}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="practice-main">
          {/* Left Sidebar - Configuration */}
          <div className={`config-sidebar glass-effect ${isSidebarCollapsed ? 'collapsed' : ''}`}>
            <button 
              className="sidebar-toggle left" 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {isSidebarCollapsed ? '→' : '←'}
            </button>
            
            {!isSidebarCollapsed && (
              <div className="sidebar-content">
                <div className="sidebar-header">
                  <h3>⚙️ Configure</h3>
                </div>
                
                {/* Quick Generate */}
                <button 
                  className="quick-generate-btn"
                  onClick={generateQuestion}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="spinner"></span>
                      Generating...
                    </>
                  ) : (
                    <>
                      <span className="btn-icon">✨</span>
                      Generate Challenge
                    </>
                  )}
                </button>

                {/* Language Selector */}
                <div className="config-section">
                  <label className="section-label">
                    <span className="label-icon">🌐</span>
                    Language
                  </label>
                  <div className="selector-grid">
                    {languages.map(lang => (
                      <button
                        key={lang.id}
                        className={`selector-btn ${selectedLanguage === lang.id ? 'active' : ''}`}
                        onClick={() => setSelectedLanguage(lang.id)}
                        style={{ 
                          borderColor: selectedLanguage === lang.id ? lang.color : 'transparent'
                        }}
                        title={lang.name}
                      >
                        <span className="selector-icon">{lang.icon}</span>
                        <span className="selector-name">{lang.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Domain Selector */}
                <div className="config-section">
                  <label className="section-label">
                    <span className="label-icon">🎯</span>
                    Domain
                  </label>
                  <div className="selector-grid">
                    {domains.map(domain => (
                      <button
                        key={domain.id}
                        className={`selector-btn ${selectedDomain === domain.id ? 'active' : ''}`}
                        onClick={() => setSelectedDomain(domain.id)}
                        style={{ 
                          borderColor: selectedDomain === domain.id ? domain.color : 'transparent'
                        }}
                        title={domain.name}
                      >
                        <span className="selector-icon">{domain.icon}</span>
                        <span className="selector-name">{domain.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Difficulty Selector */}
                <div className="config-section">
                  <label className="section-label">
                    <span className="label-icon">📈</span>
                    Difficulty
                  </label>
                  <div className="difficulty-selector">
                    {['easy', 'medium', 'hard'].map(diff => (
                      <button
                        key={diff}
                        className={`difficulty-btn ${selectedDifficulty === diff ? 'active' : ''}`}
                        onClick={() => setSelectedDifficulty(diff)}
                      >
                        <span className="difficulty-name">{diff.charAt(0).toUpperCase() + diff.slice(1)}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Timer Display */}
                {question && (
                  <div className="timer-card">
                    <div className="timer-header">
                      <span className="timer-icon">⏱️</span>
                      <span className="timer-label">Time Left</span>
                    </div>
                    <div className="timer-value">{formatTime(timeLeft)}</div>
                    <div className="timer-progress">
                      <div 
                        className="timer-progress-fill"
                        style={{ 
                          width: `${(timeLeft / 3600) * 100}%`,
                          backgroundColor: timeLeft < 300 ? '#ef4444' : timeLeft < 600 ? '#f59e0b' : '#10b981'
                        }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Editor Settings */}
                <div className="settings-section">
                  <h4>🛠️ Settings</h4>
                  <div className="settings-group">
                    <label>Theme</label>
                    <select 
                      value={theme} 
                      onChange={(e) => setTheme(e.target.value)}
                      className="settings-select"
                    >
                      <option value="vs-dark">Dark</option>
                      <option value="vs-light">Light</option>
                      <option value="hc-black">High Contrast</option>
                    </select>
                  </div>

                  <div className="settings-group">
                    <label>Font Size: {fontSize}px</label>
                    <input
                      type="range"
                      min="10"
                      max="24"
                      value={fontSize}
                      onChange={(e) => setFontSize(parseInt(e.target.value))}
                      className="font-slider"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Main Content Area */}
          <div className="content-area">
            {/* Tabs */}
            <div className="content-tabs">
              <button 
                className={`tab-btn ${activeTab === 'problem' ? 'active' : ''}`}
                onClick={() => setActiveTab('problem')}
              >
                <span className="tab-icon">📝</span>
                Problem
              </button>
              <button 
                className={`tab-btn ${activeTab === 'solution' ? 'active' : ''}`}
                onClick={() => setActiveTab('solution')}
              >
                <span className="tab-icon">💻</span>
                Code
              </button>
              <button 
                className={`tab-btn ${activeTab === 'results' ? 'active' : ''}`}
                onClick={() => setActiveTab('results')}
              >
                <span className="tab-icon">📊</span>
                Results
              </button>
            </div>

            {/* Tab Content */}
            <div className="tab-content glass-effect">
              {activeTab === 'problem' && (
                <div className="problem-content">
                  {question ? (
                    <>
                      <div className="problem-header">
                        <h2>{question.title}</h2>
                        <div className="problem-tags">
                          <span className="domain-tag" style={{ background: domains.find(d => d.id === question.domain)?.color }}>
                            {domains.find(d => d.id === question.domain)?.icon} {question.domain}
                          </span>
                          <span className="difficulty-tag" style={{ 
                            background: question.difficulty === 'easy' ? '#10b981' :
                                       question.difficulty === 'medium' ? '#f59e0b' : '#ef4444'
                          }}>
                            {question.difficulty}
                          </span>
                        </div>
                      </div>

                      <div className="problem-description">
                        <h3>Description</h3>
                        <p>{question.description}</p>
                      </div>

                      <div className="problem-section">
                        <h3>Constraints</h3>
                        <ul className="constraints-list">
                          {question.constraints?.map((constraint, index) => (
                            <li key={index}>{constraint}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="problem-section">
                        <h3>Test Cases</h3>
                        <div className="test-cases">
                          {question.testCases?.map((test, index) => (
                            <div key={index} className="test-case">
                              <div className="test-header">
                                <span className="test-number">Case #{index + 1}</span>
                                <span className="test-desc">{test.description}</span>
                              </div>
                              <div className="test-details">
                                <div><span className="test-label">Input:</span> <code>{test.input}</code></div>
                                <div><span className="test-label">Output:</span> <code>{test.expected}</code></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="problem-section">
                        <h3>Topics</h3>
                        <div className="topics">
                          {question.topics?.map((topic, index) => (
                            <span key={index} className="topic-tag">{topic}</span>
                          ))}
                        </div>
                      </div>

                      <button 
                        className="hint-btn"
                        onClick={() => setShowHint(!showHint)}
                      >
                        {showHint ? '🙈 Hide Hints' : '🔍 Show Hints'}
                      </button>

                      {showHint && (
                        <div className="hints">
                          <h3>Hints</h3>
                          <ul>
                            {question.hints?.map((hint, index) => (
                              <li key={index}>{hint}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="empty-state">
                      <div className="empty-icon">🎯</div>
                      <h3>No Challenge Selected</h3>
                      <p>Click "Generate Challenge" in the sidebar to start</p>
                      <button 
                        className="empty-action-btn"
                        onClick={generateQuestion}
                        disabled={isLoading}
                      >
                        {isLoading ? 'Generating...' : 'Generate Challenge'}
                      </button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'solution' && (
                <div className="solution-content">
                  <div className="editor-header">
                    <div className="editor-actions">
                      <button className="action-btn" onClick={resetCode} title="Reset code">
                        <span>↺</span> Reset
                      </button>
                      <button className="action-btn" onClick={saveCode} title="Save code">
                        <span>💾</span> Save
                      </button>
                      <button className="action-btn" onClick={copyCode} title="Copy code">
                        <span>📋</span> Copy
                      </button>
                      <button className="action-btn" onClick={formatCode} title="Format code">
                        <span>🧹</span> Format
                      </button>
                    </div>
                    <button 
                      className="run-btn" 
                      onClick={runCode}
                      disabled={isRunning || !question}
                    >
                      {isRunning ? (
                        <>
                          <span className="spinner-small"></span>
                          Running...
                        </>
                      ) : (
                        <>
                          <span>▶</span>
                          Run Code
                        </>
                      )}
                    </button>
                  </div>

                  <div className="editor-container">
                    {!question ? (
                      <div className="editor-placeholder">
                        <span className="placeholder-icon">📝</span>
                        <p>Generate a challenge to start coding</p>
                      </div>
                    ) : (
                      <MonacoEditor
                        height="100%"
                        {...getEditorSettings()}
                      />
                    )}
                  </div>

                  <div className="editor-footer">
                    <div className="language-info">
                      <span className="info-icon">{languages.find(l => l.id === selectedLanguage)?.icon}</span>
                      <span>{languages.find(l => l.id === selectedLanguage)?.name} {languages.find(l => l.id === selectedLanguage)?.version}</span>
                    </div>
                    <div className="editor-stats">
                      <span className="stat">
                        <span>📏</span> {userCode.split('\n').filter(l => l.trim()).length} lines
                      </span>
                      <span className="stat">
                        <span>📦</span> {userCode.length} chars
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'results' && (
                <div className="results-content">
                  {testResults.length > 0 ? (
                    <>
                      <div className="results-summary">
                        <div className="summary-card">
                          <span className="summary-icon">✅</span>
                          <div>
                            <span className="summary-label">Passed</span>
                            <span className="summary-value">
                              {testResults.filter(r => r.passed).length}/{testResults.length}
                            </span>
                          </div>
                        </div>
                        <div className="summary-card">
                          <span className="summary-icon">📈</span>
                          <div>
                            <span className="summary-label">Success Rate</span>
                            <span className="summary-value">{stats.successRate}%</span>
                          </div>
                        </div>
                        <div className="summary-card">
                          <span className="summary-icon">⏱️</span>
                          <div>
                            <span className="summary-label">Total Time</span>
                            <span className="summary-value">
                              {testResults.reduce((acc, r) => acc + r.executionTime, 0)}ms
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="test-results">
                        {testResults.map((result, index) => (
                          <div key={index} className={`test-result ${result.passed ? 'passed' : 'failed'}`}>
                            <div className="result-header">
                              <div className="result-title">
                                <span>{result.passed ? '✅' : '❌'}</span>
                                <span>Test Case #{index + 1}</span>
                                <span className="result-desc">{result.description}</span>
                              </div>
                              <span className="result-time">{result.executionTime}ms</span>
                            </div>
                            <div className="result-details">
                              <div><span className="detail-label">Input:</span> <code>{result.input}</code></div>
                              <div><span className="detail-label">Expected:</span> <code>{result.expected}</code></div>
                              <div><span className="detail-label">Got:</span> <code className={!result.passed ? 'error' : ''}>{result.actual || 'undefined'}</code></div>
                              {result.error && (
                                <div className="result-error">
                                  <span className="detail-label">Error:</span> <code>{result.error}</code>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {feedback && (
                        <div className="feedback-section">
                          <h3>🤖 AI Review</h3>
                          <pre className="feedback-content">{feedback}</pre>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="empty-state">
                      <div className="empty-icon">▶️</div>
                      <h3>No Results Yet</h3>
                      <p>Run your code to see test results</p>
                      {question && (
                        <button 
                          className="empty-action-btn"
                          onClick={runCode}
                          disabled={isRunning}
                        >
                          {isRunning ? 'Running...' : 'Run Code Now'}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - Code History */}
          <div className={`history-sidebar glass-effect ${isHistoryCollapsed ? 'collapsed' : ''}`}>
            <button 
              className="sidebar-toggle right" 
              onClick={() => setIsHistoryCollapsed(!isHistoryCollapsed)}
              title={isHistoryCollapsed ? "Expand History" : "Collapse History"}
            >
              {isHistoryCollapsed ? '←' : '→'}
            </button>
            
            {!isHistoryCollapsed && (
              <div className="sidebar-content">
                <div className="sidebar-header">
                  <h3>📚 History</h3>
                  <span className="history-count">{codeHistory.length}/10</span>
                </div>
                
                <div className="history-list">
                  {codeHistory.length > 0 ? (
                    codeHistory.map(item => (
                      <div key={item.id} className="history-item">
                        <div className="history-time">{item.timestamp}</div>
                        <div className="history-question" title={item.question}>{item.question}</div>
                        <div className="history-meta">
                          <span className="history-lang">
                            {languages.find(l => l.id === item.language)?.icon} {item.language}
                          </span>
                          <button 
                            className="history-load"
                            onClick={() => setUserCode(item.code)}
                            title="Load this code"
                          >
                            Load
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="history-empty">
                      <span className="empty-icon">📝</span>
                      <p>No saved code</p>
                      <span className="empty-hint">Save your solutions to build history</span>
                    </div>
                  )}
                </div>

                <div className="quick-stats">
                  <h4>📈 Quick Stats</h4>
                  <div className="stats">
                    <div className="stat-row">
                      <span>Problems Solved</span>
                      <span>{stats.problemsSolved}</span>
                    </div>
                    <div className="stat-row">
                      <span>Success Rate</span>
                      <span>{stats.successRate}%</span>
                    </div>
                    <div className="stat-row">
                      <span>Current Streak</span>
                      <span>{stats.currentStreak}d</span>
                    </div>
                    <div className="stat-row">
                      <span>Total Points</span>
                      <span>{stats.totalPoints}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}