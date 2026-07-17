# Java Interview Prep Plan (3 YOE — mostly fresh learning)

> **Goal:** Learn the foundations in the right order, build a real backend project for the resume, and not miss a single topic. ~70% learning, ~30% revision.

## How to use this

Mark each topic as you go:

| Mark | Meaning |
|------|---------|
| `[ ]` ⬜ | Not started |
| `[~]` 🟡 | In progress / fuzzy, needs more |
| `[x]` ✅ | Confident — can explain in an interview |

---

## Your Starting Point (self-assessed)

| Area | Status | Approach |
|------|--------|----------|
| Core Java | first time | 🔴 Learn from scratch |
| Spring | nothing | 🔴 Learn from scratch |
| System Design | 0 idea | 🔴 Learn from scratch |
| Microservices | idea only | 🔴 Mostly new |
| DSA | 3 yrs back | 🟡 Revise |
| Databases / SQL | 3 yrs back | 🟡 Revise |
| Testing | a little | 🟡 Light learn |
| Backend project | none | ⚠️ Must build one |

---

## Recommended Learning Sequence (dependency-ordered)

> Topics depend on each other — order matters. Don't learn Spring before Core Java, or System Design before you've built something.

```
Phase 1: CORE JAVA        (foundation — no skipping)
           ├──► DSA       (PARALLEL — daily reps, just rusty)
Phase 2: SQL / DATABASES  (quick refresh, needed for Spring)
Phase 3: SPRING BOOT      (needs Core Java)
Phase 4: BUILD A PROJECT  (Spring + REST + JPA + Testing + RESUME material)
Phase 5: MICROSERVICES    (extend the project: Docker, Kafka, 2nd service)
Phase 6: SYSTEM DESIGN    (now it makes sense — you've seen the pieces)
Phase 7: BEHAVIORAL       (STAR stories — light, near the end)
```

**Key idea:** The project in Phase 4 *is* your resume project. Learning Spring and building resume material is the same effort.

---

## 1. Core Java (home turf — must be airtight)

### 1.1 OOP & Language Fundamentals
- [ ] `equals()` / `hashCode()` contract
- [ ] `==` vs `.equals()`, String pool / interning
- [ ] `final` vs `finally` vs `finalize()`
- [ ] Abstract class vs interface (+ default methods)
- [ ] Overloading vs overriding, covariant return types
- [ ] `static` vs instance members
- [ ] Immutability (how to build an immutable class)
- [ ] Pass-by-value semantics
- [ ] String vs StringBuilder vs StringBuffer

### 1.2 Collections Framework
- [ ] `HashMap` internals (buckets, collisions, treeification, load factor, resizing)
- [ ] `ArrayList` vs `LinkedList`
- [ ] `HashMap` vs `ConcurrentHashMap` vs `Hashtable`
- [ ] `HashSet` vs `TreeSet` vs `LinkedHashSet`
- [ ] `Comparable` vs `Comparator`
- [ ] Fail-fast vs fail-safe iterators (`ConcurrentModificationException`)
- [ ] When to use which collection (Big-O of operations)

### 1.3 Concurrency & Multithreading
- [ ] Thread lifecycle, `Runnable` vs `Callable` vs `Future`
- [ ] `synchronized` vs `volatile` vs `Atomic*`
- [ ] `ExecutorService` / thread pools
- [ ] Deadlock, livelock, race conditions
- [ ] `wait()` / `notify()` / `notifyAll()`
- [ ] `CompletableFuture`
- [ ] `CountDownLatch`, `Semaphore`, `CyclicBarrier`
- [ ] Java Memory Model (happens-before, visibility)
- [ ] Virtual threads / Project Loom (Java 21)

### 1.4 JVM Internals & Memory
- [ ] Memory areas: Heap, Stack, Metaspace
- [ ] Garbage collection (generational model, GC roots, eligibility)
- [ ] Modern collectors: G1 (default), ZGC, Shenandoah
- [ ] `StackOverflowError` vs `OutOfMemoryError`
- [ ] Class loading basics (classloaders, loading process)

### 1.5 Exception Handling
- [ ] Checked vs unchecked exceptions
- [ ] try-with-resources / `AutoCloseable`
- [ ] Custom exceptions, exception chaining
- [ ] Best practices (don't swallow, don't catch `Throwable`)

### 1.6 Modern Java (8 -> 21)
- [ ] Streams API (map/filter/reduce/collect, lazy eval)
- [ ] Lambdas & functional interfaces (`Function`, `Predicate`, `Supplier`, `Consumer`)
- [ ] `Optional` (proper use)
- [ ] Records (Java 16+)
- [ ] Sealed classes
- [ ] Pattern matching & switch expressions
- [ ] `var` (local type inference)

---

## 2. Data Structures & Algorithms (pass/fail gate — ~15 patterns)

- [ ] Hash maps / hashing
- [ ] Two pointers
- [ ] Sliding window
- [ ] Binary search
- [ ] BFS / DFS (trees + graphs)
- [ ] Heaps / priority queues
- [ ] Stacks / queues
- [ ] Linked list manipulation
- [ ] Sorting + intervals
- [ ] Recursion / backtracking
- [ ] Dynamic programming (basics; go deep only for FAANG)
- [ ] Tree traversals + BST operations
- [ ] Graph fundamentals (topological sort, union-find)
- [ ] Prefix sums
- [ ] Bit manipulation (light)

**Target:** 100–150 quality problems. Always narrate time/space complexity out loud.

---

## 3. System Design (your biggest differentiator now)

- [ ] Requirements gathering (functional vs non-functional)
- [ ] Estimating scale, latency, consistency, failure tolerance
- [ ] Building blocks: load balancers, caching, databases, queues
- [ ] SQL vs NoSQL (choose by access pattern)
- [ ] Caching strategies + invalidation
- [ ] Async processing / message queues
- [ ] Read-heavy vs write-heavy design
- [ ] Idempotency, pagination, API versioning
- [ ] Observability (health, errors, throughput, latency)

### Practice scenarios (8–10, one-page outline each)
- [ ] URL shortener
- [ ] Rate limiter
- [ ] Notification system
- [ ] News feed / timeline
- [ ] Chat / messaging system
- [ ] File storage service
- [ ] Key-value store
- [ ] Ride-hailing / nearby-drivers

**Target:** Timed 30–45 min live explanations.

---

## 4. Spring & Backend Ecosystem (job-market core)

- [ ] Spring Boot 3 / 4 (DI, auto-config, starters)
- [ ] REST API design
- [ ] Spring Data JPA / Hibernate
- [ ] Spring Security (auth/authz basics)
- [ ] Bean lifecycle, scopes, profiles
- [ ] Exception handling (`@ControllerAdvice`)
- [ ] Validation, configuration management
- [ ] Spring AOP basics

---

## 5. Microservices & Distributed Systems

- [ ] Microservices architecture + inter-service communication (REST/gRPC)
- [ ] Event-driven patterns
- [ ] Kafka (producers, consumers, topics, partitions)
- [ ] Service discovery, API gateway
- [ ] Resilience (retries, circuit breakers, resilience4j)
- [ ] Distributed systems concepts (consistency models, idempotency, failure modes)
- [ ] Saga pattern / distributed transactions

---

## 6. Cloud, DevOps & Production Readiness

- [ ] Docker (containerization, Dockerfile, layers)
- [ ] Kubernetes (deployments, services, scaling, configmaps/secrets)
- [ ] CI/CD (GitHub Actions / Jenkins / GitLab CI)
- [ ] One cloud provider (AWS: EC2, RDS, S3, IAM, EKS, Lambda)
- [ ] Observability stack: OpenTelemetry, Prometheus/Grafana, ELK
- [ ] Twelve-factor app principles

---

## 7. Testing

- [ ] JUnit 5
- [ ] Mockito
- [ ] Integration testing
- [ ] Testcontainers
- [ ] Contract / API testing

---

## 8. Databases & SQL

- [ ] SQL queries, joins
- [ ] Indexing (how/when indexes help)
- [ ] Transactions, ACID, isolation levels
- [ ] Query optimization / execution plans
- [ ] PostgreSQL specifics
- [ ] NoSQL basics (when/why)

---

## 9. Behavioral (the soft-skill gate)

- [ ] STAR story: ownership / leading a feature end-to-end
- [ ] STAR story: conflict resolution
- [ ] STAR story: major bug / production incident you solved
- [ ] STAR story: technical tradeoff / judgment call
- [ ] STAR story: mentoring / helping a teammate
- [ ] STAR story: tight deadline / pressure
- [ ] STAR story: a failure & what you learned
- [ ] STAR story: disagreeing with a decision

---

## Progress Summary

| Section | ✅ Done | 🟡 In Progress | ⬜ Not Started |
|---------|--------|---------------|---------------|
| 1. Core Java | | | |
| 2. DSA | | | |
| 3. System Design | | | |
| 4. Spring | | | |
| 5. Microservices | | | |
| 6. Cloud/DevOps | | | |
| 7. Testing | | | |
| 8. Databases | | | |
| 9. Behavioral | | | |

_Update counts as you progress to see momentum and remaining gaps._
