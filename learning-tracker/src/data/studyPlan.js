// 12-week, day-wise study plan grouped into 3 months.
// Sequenced by dependency: Core Java first, DSA in parallel, Spring + project,
// then microservices, system design, testing, behavioral.
// Each day is a trackable item (id) worth POINTS_PER_PLAN_DAY.

export const POINTS_PER_PLAN_DAY = 15

function day(week, d, title, tasks) {
  return { id: `plan-w${week}-d${d}`, week, day: d, title, tasks }
}

export const weeks = [
  // ---------------- MONTH 1: Foundations (Core Java + DSA + SQL) ----------------
  {
    week: 1, month: 1, focus: 'Core Java: OOP foundations + DSA: Arrays & Hashing',
    days: [
      day(1, 1, 'JVM model + OOP pillars', ['Read: JDK/JRE/JVM, bytecode', '4 pillars of OOP with examples', 'DSA: Two Sum, Contains Duplicate']),
      day(1, 2, 'Classes, objects, polymorphism', ['Reference vs object type', 'Overloading vs overriding', 'DSA: Valid Anagram, Group Anagrams']),
      day(1, 3, 'equals & hashCode', ['equals()/hashCode() contract', '== vs .equals(), String pool', 'DSA: Top K Frequent Elements']),
      day(1, 4, 'final, static, immutability', ['final/finally/finalize', 'static vs instance, immutable class', 'DSA: Product of Array Except Self']),
      day(1, 5, 'Interfaces & abstraction', ['Abstract class vs interface', 'default/static interface methods', 'DSA: Valid Sudoku']),
      day(1, 6, 'Strings & wrappers', ['String vs StringBuilder/Buffer', 'Autoboxing, Integer cache', 'DSA: Longest Consecutive Sequence']),
      day(1, 7, 'Review + recall', ['Re-explain weak topics aloud', 'Redo 2 missed DSA problems', 'Update tracker']),
    ],
  },
  {
    week: 2, month: 1, focus: 'Core Java: Collections + DSA: Two Pointers / Sliding Window / Stack',
    days: [
      day(2, 1, 'Collections hierarchy', ['List/Set/Queue/Map overview', 'ArrayList vs LinkedList', 'DSA: Valid Palindrome']),
      day(2, 2, 'HashMap internals', ['Buckets, hashing, collisions', 'Treeification, load factor, resize', 'DSA: 3Sum']),
      day(2, 3, 'Map & Set variants', ['HashMap vs ConcurrentHashMap vs Hashtable', 'HashSet/TreeSet/LinkedHashSet', 'DSA: Container With Most Water']),
      day(2, 4, 'Ordering & iterators', ['Comparable vs Comparator', 'Fail-fast vs fail-safe', 'DSA: Best Time to Buy/Sell Stock']),
      day(2, 5, 'Sliding window', ['Big-O of collection ops', 'DSA: Longest Substring Without Repeating', 'DSA: Longest Repeating Char Replacement']),
      day(2, 6, 'Stack pattern', ['DSA: Valid Parentheses, Min Stack', 'DSA: Daily Temperatures', 'DSA: Generate Parentheses']),
      day(2, 7, 'Review + recall', ['Quiz yourself on collections', 'Redo a hard problem', 'Update tracker']),
    ],
  },
  {
    week: 3, month: 1, focus: 'Core Java: Concurrency + JVM + DSA: Binary Search / Linked List',
    days: [
      day(3, 1, 'Threads basics', ['Thread lifecycle, Runnable/Callable/Future', 'ExecutorService & pools', 'DSA: Binary Search']),
      day(3, 2, 'Synchronization', ['synchronized vs volatile vs Atomic', 'Deadlock & race conditions', 'DSA: Search in Rotated Sorted Array']),
      day(3, 3, 'Advanced concurrency', ['CompletableFuture', 'CountDownLatch/Semaphore', 'DSA: Koko Eating Bananas']),
      day(3, 4, 'JMM + virtual threads', ['Java Memory Model, happens-before', 'Virtual threads (Loom)', 'DSA: Find Min in Rotated Array']),
      day(3, 5, 'JVM memory', ['Heap/Stack/Metaspace', 'GC generational model & collectors', 'DSA: Reverse Linked List']),
      day(3, 6, 'Linked list pattern', ['DSA: Merge Two Sorted Lists', 'DSA: Linked List Cycle', 'DSA: Remove Nth Node From End']),
      day(3, 7, 'Review + recall', ['Explain GC & concurrency aloud', 'LRU Cache (design)', 'Update tracker']),
    ],
  },
  {
    week: 4, month: 1, focus: 'Core Java: Exceptions/Modern + SQL refresh + DSA: Trees',
    days: [
      day(4, 1, 'Exceptions', ['Checked vs unchecked', 'try-with-resources, custom exceptions', 'DSA: Invert/Max Depth Binary Tree']),
      day(4, 2, 'Streams & lambdas', ['Streams: map/filter/reduce/collect', 'Functional interfaces', 'DSA: Same Tree, Subtree']),
      day(4, 3, 'Modern Java', ['Optional, records, sealed classes', 'switch expressions, var', 'DSA: Level Order Traversal']),
      day(4, 4, 'SQL refresh I', ['SELECT/WHERE/GROUP BY/HAVING', 'All JOIN types', 'DSA: Validate BST']),
      day(4, 5, 'SQL refresh II', ['Subqueries, window functions, CTEs', 'Indexing & N+1', 'DSA: LCA of BST']),
      day(4, 6, 'Transactions', ['ACID, isolation levels', 'Optimistic vs pessimistic locking', 'DSA: Binary Tree Right Side View']),
      day(4, 7, 'Month 1 review', ['Mock: 5 core Java questions', 'Mock: 3 DSA problems timed', 'Update tracker + reflect']),
    ],
  },

  // ---------------- MONTH 2: Spring + Resume Project ----------------
  {
    week: 5, month: 2, focus: 'Spring Core + Boot + DSA: Trees/Heap',
    days: [
      day(5, 1, 'Spring IoC/DI', ['IoC & DI: the problem it solves', 'Constructor vs setter vs field injection', 'DSA: Diameter / Balanced Tree']),
      day(5, 2, 'Beans', ['Bean lifecycle & scopes', 'Stereotype annotations', 'DSA: Kth Smallest in BST']),
      day(5, 3, 'Spring Boot basics', ['Auto-configuration, starters', 'application.yml, profiles', 'DSA: Build Tree from Pre/In-order']),
      day(5, 4, 'Boot tooling', ['Actuator, embedded Tomcat, fat jar', 'Spring Initializr walkthrough', 'DSA: Implement Trie']),
      day(5, 5, 'Heap pattern', ['DSA: Kth Largest in Array', 'DSA: K Closest Points', 'DSA: Task Scheduler']),
      day(5, 6, 'AOP + recap', ['Spring AOP basics', 'DSA: Find Median from Data Stream', 'Revisit weak Spring topics']),
      day(5, 7, 'Review + recall', ['Explain DI & bean lifecycle aloud', 'Redo a tree/heap problem', 'Update tracker']),
    ],
  },
  {
    week: 6, month: 2, focus: 'Spring Web + Data JPA + DSA: Backtracking',
    days: [
      day(6, 1, 'REST controllers', ['@RestController, mappings', '@PathVariable/@RequestParam/@RequestBody', 'DSA: Subsets, Permutations']),
      day(6, 2, 'API design', ['ResponseEntity & status codes', 'Validation (@Valid)', 'DSA: Combination Sum']),
      day(6, 3, 'Error handling + DTOs', ['@ControllerAdvice global handling', 'DTOs & mapping', 'DSA: Word Search']),
      day(6, 4, 'JPA basics', ['Entities, @Id, @GeneratedValue', 'Repositories & derived queries', 'DSA: Palindrome Partitioning']),
      day(6, 5, 'JPA relationships', ['@OneToMany/@ManyToOne/@ManyToMany', 'Lazy vs eager, N+1', 'DSA: Letter Combinations']),
      day(6, 6, 'Transactions + queries', ['@Transactional, @Query (JPQL/native)', 'Persistence context', 'DSA: Combination Sum II']),
      day(6, 7, 'Review + recall', ['Explain JPA relationships aloud', 'Redo a backtracking problem', 'Update tracker']),
    ],
  },
  {
    week: 7, month: 2, focus: 'Project build (part 1) + DSA: Graphs',
    days: [
      day(7, 1, 'Project kickoff', ['Pick domain + define entities', 'Init Spring Boot + PostgreSQL', 'DSA: Number of Islands']),
      day(7, 2, 'Data layer', ['Map entities & relationships', 'Repositories + migrations', 'DSA: Clone Graph']),
      day(7, 3, 'CRUD endpoints', ['Build REST CRUD for core entity', 'Test with Postman', 'DSA: Rotting Oranges']),
      day(7, 4, 'More endpoints', ['Add 2nd entity + relations', 'Validation + exception handling', 'DSA: Course Schedule']),
      day(7, 5, 'Service layer', ['Business logic in services', 'DTOs + mapping', 'DSA: Pacific Atlantic Water Flow']),
      day(7, 6, 'Polish', ['Pagination & filtering', 'Swagger/OpenAPI docs', 'DSA: Course Schedule II']),
      day(7, 7, 'Review + recall', ['Demo project to yourself', 'Redo a graph problem', 'Update tracker']),
    ],
  },
  {
    week: 8, month: 2, focus: 'Project build (part 2) + DSA: 1-D DP',
    days: [
      day(8, 1, 'Security I', ['Spring Security filter chain', 'Auth vs authz', 'DSA: Climbing Stairs, House Robber']),
      day(8, 2, 'Security II (JWT)', ['JWT auth flow', 'BCrypt password encoding', 'DSA: Coin Change']),
      day(8, 3, 'Roles', ['Role-based access (@PreAuthorize)', 'Secure endpoints', 'DSA: Longest Increasing Subsequence']),
      day(8, 4, 'Testing the project', ['Unit tests (JUnit5 + Mockito)', 'Service-layer tests', 'DSA: Word Break']),
      day(8, 5, 'Integration tests', ['@WebMvcTest, @DataJpaTest', 'MockMvc controller tests', 'DSA: Maximum Product Subarray']),
      day(8, 6, 'Ship it', ['README + push to GitHub', 'Add to resume', 'DSA: Decode Ways']),
      day(8, 7, 'Month 2 review', ['Mock: explain your project', 'Mock: 3 Spring questions', 'Update tracker + reflect']),
    ],
  },

  // ---------------- MONTH 3: Microservices + System Design + Behavioral ----------------
  {
    week: 9, month: 3, focus: 'Cloud/Docker + project deploy + DSA: 2-D DP',
    days: [
      day(9, 1, 'Docker', ['Images, containers, layers', 'Write a Dockerfile for project', 'DSA: Unique Paths']),
      day(9, 2, 'Compose', ['docker-compose: app + Postgres', 'Run project in containers', 'DSA: Longest Common Subsequence']),
      day(9, 3, 'CI/CD', ['GitHub Actions: build + test', 'Add pipeline to project', 'DSA: Edit Distance']),
      day(9, 4, 'Deploy', ['Deploy to Render/Railway', 'Env config & secrets', 'DSA: Coin Change II']),
      day(9, 5, 'K8s basics', ['Pods, deployments, services', 'ConfigMaps & secrets', 'DSA: Target Sum']),
      day(9, 6, 'Observability', ['Actuator + Prometheus/Grafana', 'Structured logging', 'DSA: Buy/Sell Stock w/ Cooldown']),
      day(9, 7, 'Review + recall', ['Explain your deploy pipeline aloud', 'Redo a DP problem', 'Update tracker']),
    ],
  },
  {
    week: 10, month: 3, focus: 'Microservices + DSA: Greedy / Intervals / Bit',
    days: [
      day(10, 1, 'MS architecture', ['Monolith vs microservices', 'Inter-service comm (REST/gRPC/msg)', 'DSA: Maximum Subarray, Jump Game']),
      day(10, 2, 'MS infra', ['API Gateway, service discovery', 'Centralized config', 'DSA: Merge Intervals']),
      day(10, 3, 'Resilience', ['Retries, timeouts, circuit breaker', 'Resilience4j', 'DSA: Insert Interval']),
      day(10, 4, 'Kafka I', ['Topics, partitions, producers/consumers', 'Add Kafka to project (event)', 'DSA: Meeting Rooms II']),
      day(10, 5, 'Kafka II + patterns', ['Consumer groups, offsets, idempotency', 'Saga pattern, DB-per-service', 'DSA: Non-overlapping Intervals']),
      day(10, 6, 'Distributed data', ['Eventual consistency, outbox/CQRS', 'DSA: Single Number, Counting Bits', 'DSA: Subarray Sum Equals K']),
      day(10, 7, 'Review + recall', ['Explain Kafka & saga aloud', 'Redo an intervals problem', 'Update tracker']),
    ],
  },
  {
    week: 11, month: 3, focus: 'System Design foundations + scenarios',
    days: [
      day(11, 1, 'SD foundations', ['Functional vs non-functional reqs', 'Estimation, latency vs throughput', 'Read 1 SD primer chapter']),
      day(11, 2, 'Scaling & CAP', ['Vertical vs horizontal scaling', 'CAP, consistency, load balancers', 'Watch 1 SD walkthrough']),
      day(11, 3, 'Building blocks I', ['Caching + invalidation (Redis)', 'DB replication/sharding', 'Scenario: URL shortener']),
      day(11, 4, 'Building blocks II', ['Queues & async processing', 'Rate limiting, idempotency, pagination', 'Scenario: Rate limiter']),
      day(11, 5, 'Scenario practice', ['Scenario: Notification system', 'Consistent hashing', 'Observability in design']),
      day(11, 6, 'Scenario practice', ['Scenario: News feed', 'Scenario: Chat system', 'Self-review designs']),
      day(11, 7, 'Review + recall', ['Re-explain 2 designs in 30 min each', 'Note weak areas', 'Update tracker']),
    ],
  },
  {
    week: 12, month: 3, focus: 'System Design finish + Behavioral + Mocks',
    days: [
      day(12, 1, 'More scenarios', ['Scenario: File storage (Dropbox)', 'Scenario: Key-value store', 'Refine approach template']),
      day(12, 2, 'More scenarios', ['Scenario: Ride-hailing/nearby', 'Scenario: E-commerce/payment', 'OOD: Parking lot']),
      day(12, 3, 'Behavioral I', ['Write 4 STAR stories', '"Tell me about yourself" pitch', 'Polish resume']),
      day(12, 4, 'Behavioral II', ['Write 4 more STAR stories', 'Questions to ask interviewer', 'Salary negotiation basics']),
      day(12, 5, 'Mock day I', ['Mock: Core Java + collections', 'Mock: 2 DSA mediums timed', 'Fix gaps found']),
      day(12, 6, 'Mock day II', ['Mock: 1 system design', 'Mock: behavioral round', 'Mock: explain your project']),
      day(12, 7, 'Final review', ['Sweep all 🔴/🟡 tracker items', 'Confidence pass on cheat-sheets', 'You are interview-ready 🎯']),
    ],
  },
]

export const allPlanDayIds = weeks.flatMap((w) => w.days.map((d) => d.id))

export const months = [
  { month: 1, title: 'Month 1 — Foundations', subtitle: 'Core Java + DSA reactivation + SQL refresh', weeks: [1, 2, 3, 4] },
  { month: 2, title: 'Month 2 — Spring + Project', subtitle: 'Spring Boot mastery + your resume backend project', weeks: [5, 6, 7, 8] },
  { month: 3, title: 'Month 3 — Scale + Interview', subtitle: 'Microservices, system design, behavioral, mocks', weeks: [9, 10, 11, 12] },
]
