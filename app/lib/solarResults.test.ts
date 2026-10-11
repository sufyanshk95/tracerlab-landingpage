import { test } from "node:test";
import assert from "node:assert/strict";
import {
  AD_SPEND,
  BOOKING_RECORDS,
  CALC_PROFIT,
  COST_PER_CLOSED_DEAL,
  COST_PER_LEAD,
  EST_REVENUE,
  EST_ROAS,
  FOLLOW_UP_RATE,
  LEAD_TO_SALE,
  SOLAR,
} from "./solarResults";

test("published rates match the specified rounded values", () => {
  assert.equal(LEAD_TO_SALE, 15.2); // 124 / 817
  assert.equal(FOLLOW_UP_RATE, 39.8); // 158 / 397
});

test("advertising cost figures match the specified rounded values", () => {
  assert.equal(COST_PER_LEAD, 60.62); // 49,526.68 / 817
  assert.equal(COST_PER_CLOSED_DEAL, 399.41); // 49,526.68 / 124
});

test("revenue, ROAS and profit match the specified values", () => {
  assert.equal(EST_REVENUE, 3_720_000); // 124 × 30,000
  assert.equal(EST_ROAS, 75.11); // 3,720,000 / 49,526.68
  assert.equal(CALC_PROFIT, 868_000); // 124 × 7,000
});

test("advertising spend is never deducted twice from profit", () => {
  // profitPerDeal is already net of advertising cost, so the total must be the
  // straight product — subtracting AD_SPEND again would be double-counting.
  assert.equal(CALC_PROFIT, SOLAR.closedDeals * SOLAR.profitPerDeal);
  assert.notEqual(CALC_PROFIT, SOLAR.closedDeals * SOLAR.profitPerDeal - AD_SPEND);
});

test("the follow-up cohort is internally consistent", () => {
  assert.ok(SOLAR.followUpConverted <= SOLAR.initiallyUnbooked); // 158 of 397
});

test("recorded booking counts are never used as conversion denominators", () => {
  // Guard against reintroducing the withheld unique-booking metrics: no
  // exported rate may be derived from the un-deduplicated booking records.
  const withheld = [
    (BOOKING_RECORDS.combined / SOLAR.totalLeads) * 100, // 70.7
    (BOOKING_RECORDS.direct / SOLAR.totalLeads) * 100, // 51.4
    (SOLAR.followUpConverted / BOOKING_RECORDS.direct) * 100, // 37.6
    AD_SPEND / BOOKING_RECORDS.combined, // 85.69
  ].map((n) => Math.round(n * 100) / 100);
  const published = [LEAD_TO_SALE, FOLLOW_UP_RATE, COST_PER_LEAD, COST_PER_CLOSED_DEAL, EST_ROAS];
  for (const w of withheld) assert.ok(!published.includes(w), `withheld metric ${w} is published`);
});
