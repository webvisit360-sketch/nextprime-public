#!/usr/bin/env node
  /**
   * NextPrime — Public API accuracy test
   *
   * Verifies the NextPrime REST API (Baillie-PSW) against a set of known
   * primes and composites. This script talks ONLY to the public HTTP API —
   * it contains no primality implementation of its own.
   *
   * Usage:
   *   NEXTPRIME_API_KEY=your_key node test/accuracy-test.js
   *
   * Get a free key at https://nextprime.app/pricing
   */

  const API_BASE = process.env.NEXTPRIME_API_BASE || "https://api.nextprime.app/v1";
  const API_KEY = process.env.NEXTPRIME_API_KEY;

  if (!API_KEY) {
    console.error("Missing NEXTPRIME_API_KEY — get a free key at https://nextprime.app/pricing");
    process.exit(1);
  }

  // [number-as-string, expectedPrime]
  const CASES = [
    ["0", false],
    ["1", false],
    ["2", true],
    ["3", true],
    ["4", false],
    ["97", true],
    ["100", false],
    ["561", false],          // Carmichael number
    ["1105", false],         // Carmichael number
    ["1729", false],         // Carmichael number
    ["7919", true],          // 1000th prime
    ["7920", false],
    ["999999937", true],     // largest 9-digit prime
    ["999999938", false],
    ["1000000007", true],
    ["100000000000000000000000000000000000000000000000151", true], // 10^50 + 151
  ];

  async function check(n) {
    const url = `${API_BASE}/check?n=${encodeURIComponent(n)}&key=${encodeURIComponent(API_KEY)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status} for n=${n}`);
    const data = await res.json();
    return data.prime;
  }

  async function main() {
    let passed = 0, failed = 0;
    console.log(`NextPrime API accuracy test → ${API_BASE}\n`);
    for (const [n, expected] of CASES) {
      try {
        const actual = await check(n);
        const ok = actual === expected;
        ok ? passed++ : failed++;
        const label = n.length > 24 ? `${n.slice(0, 12)}…${n.slice(-6)}` : n;
        console.log(`${ok ? "PASS" : "FAIL"}  n=${label}  expected=${expected}  got=${actual}`);
      } catch (err) {
        failed++;
        console.log(`ERROR n=${n}  ${err.message}`);
      }
    }
    console.log(`\n${passed}/${CASES.length} passed, ${failed} failed`);
    process.exit(failed === 0 ? 0 : 1);
  }

  main().catch((err) => { console.error(err); process.exit(1); });
  