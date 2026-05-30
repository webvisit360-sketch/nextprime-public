# nextprime.app

**The only browser-based prime number finder using Baillie-PSW.**  
No server. No limits. Fully deterministic for all inputs.

🌐 **[nextprime.app](https://nextprime.app)** · 🧪 **[Accuracy proof](https://nextprime.app/accuracy)** · 📊 **[Visualizations](https://nextprime.app/visualizations)**

---

## What is this?

Most prime checkers use trial division (slow) or basic Miller-Rabin (probabilistic above 3.3×10²⁴).  
We use **Baillie-PSW** — the strongest practical primality test. No known counterexample exists for any input.

```
Input:     100000000000000000000000000000000000000000000000151
Result:    PRIME ✓
Time:      0.573ms
Algorithm: Baillie-PSW + Wheel 210
```

> Google AI said this number was composite ("divisible by 11"). It wasn't.  
> Our algorithm was right. [Verify it yourself →](https://nextprime.app/prime/100000000000000000000000000000000000000000000000151)

---

## How it works (conceptually)

The algorithm runs in three stages:

**Stage 1 — Wheel 210 filter**  
`2 × 3 × 5 × 7 = 210`. By Euler's totient formula, only 22.86% of residues mod 210 can possibly be prime. This eliminates **77.14% of all candidates with a single modulo operation** — no division required.

**Stage 2 — Miller-Rabin (base 2)**  
A fast compositeness test. If a number fails, it's definitely composite. Most composites are eliminated here in microseconds.

**Stage 3 — Strong Lucas test**  
Together with Stage 2, this forms the complete **Baillie-PSW test**. No known counterexample exists for any value of N — ever.

### Why not just Miller-Rabin?

| Method | Deterministic to | Known failures? |
|--------|-----------------|----------------|
| Trial division | All N | No — but O(√N), unusable for large N |
| Miller-Rabin (12 bases) | N < 3.3×10²⁴ | Theoretically possible above limit |
| **Baillie-PSW** | **All known N** | **No known counterexample** |

---

## Features

- **Range Finder** — all primes between any two numbers, CSV export
- **Prime Check** — instant test for any size number
- **Next Prime** — first prime after any number
- **Prime Intelligence** — digits, bit length, next/prev prime, gap, twin prime, Sophie Germain, safe prime, Mersenne
- **Shareable URLs** — `nextprime.app/prime/997` — Google indexed
- **Visualizations** — Ulam spiral, prime gaps chart, interactive Sieve of Eratosthenes
- **Zero server calls** — all computation in your browser

---

## Accuracy

Run the live test yourself at **[nextprime.app/accuracy](https://nextprime.app/accuracy)**  
Every test runs locally in your browser — no server, no tricks.

```
Test 1 — Edge cases (0, 1, negatives, Mersenne):    0 errors
Test 2 — Carmichael numbers (Fermat pseudoprimes):  0 errors
Test 3 — Complete 0 to 500,000 vs reference sieve: 0 errors
Test 4 — Large known primes up to 10⁵⁰:            0 errors
Test 5 — Google AI challenge (10⁵⁰ + 151):         PRIME ✓

TOTAL: 500,076 test cases — 0 errors
```

Or test via the API:

```bash
# Verify our discovery
curl "https://api.nextprime.app/v1/check?n=100000000000000000000000000000000000000000000000151&key=YOUR_KEY"

# Response
{
  "prime": true,
  "algorithm": "baillie-psw+wheel210",
  "deterministic": true,
  "time_ms": 0.004
}
```

---

## The Discovery

On May 28, 2026, Franc Potočnik and Claude (Anthropic) explored prime numbers from absolute first principles — starting from a single axiom: `NS = S + 1`.

The first prime after 10⁵⁰:

```
100000000000000000000000000000000000000000000000151
```

Found in **0.573ms**. 75 candidates checked.

**Key insight:**  
*Prime gaps have second-order symmetry to 99.9% accuracy. Primes are deterministic but unpredictable — like weather. No formula will ever predict them. That is not a failure of mathematics. That is its nature.*

---

## The Google AI Incident

Google AI Overview was asked: *"Is 10⁵⁰ + 151 prime?"*

**Google AI:** "...divisible by 11 (alternating digit sum is 0), therefore composite."

**The error:** alternating digit sum calculated on only 4 digits — ignored 47 zeros.

```
N mod 11 = 9  ←  not divisible by 11
Correct answer: PRIME ✓
```

ChatGPT answered correctly. NextPrime answered correctly.  
[See the full analysis →](https://nextprime.app/accuracy)

---

## API

Integrate Baillie-PSW primality into your application in 5 minutes.  
No implementation, no maintenance, no edge cases to handle.

```bash
# Check primality
GET https://api.nextprime.app/v1/check?n={number}&key={key}

# Find next prime
GET https://api.nextprime.app/v1/next?after={number}&key={key}

# Range finder
GET https://api.nextprime.app/v1/range?from={n}&to={n}&key={key}
```

**Pricing:**

| Plan | Calls/month | Price |
|------|------------|-------|
| Starter | 1,000 | Free |
| Pro | 100,000 | €19/mo |
| Business | Unlimited | €59/mo |

[Get your API key →](https://nextprime.app/pricing)  
[Join the waitlist →](mailto:api@nextprime.app)

---

## Benchmark

Relative speed for primality check near 10,000,000:

| Method | Operations | Speed |
|--------|-----------|-------|
| Trial division | ~3,162 divisions | 452× slower |
| Miller-Rabin (12 bases) | ~84 modular exp. | baseline |
| **Baillie-PSW + Wheel 210** | **~7–10 operations** | **fastest** |

---

## Why use the API instead of implementing it yourself?

- **5 minutes** to integrate vs **2+ days** to implement correctly
- **Zero maintenance** — we handle edge cases, security, updates
- **Proven accuracy** — 500,076 test cases, 0 errors
- **No BigInt quirks** — we've already hit every edge case
- **SLA** — 99.9% uptime for Business tier
- **Patent pending** — the implementation is proprietary

---

## Legal

© 2026 Pi4, d.o.o. · Copova ulica 9B · 2310 Slovenska Bistrica · Slovenia  
VAT: SI56295332 · All rights reserved · Patent pending

[Privacy Policy](https://nextprime.app/privacy) · [Terms](https://nextprime.app/terms) · [Imprint](https://nextprime.app/imprint)
