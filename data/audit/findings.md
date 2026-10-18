# SEO audit findings: rentersmarthome.us

Collected 2026-10-18, US market (Ahrefs US English database). Sources: Ahrefs API v3 (keywords-explorer-overview, serp-overview, site-explorer, gsc-*), the 26 English posts in `src/content/blog/*.md` and the 136 entries in `data/keywords.json`. About 10,705 Ahrefs units by per-response costs (the shared key's counter rose 17,862 in the same window; the difference can't be attributed from here). Nothing here guarantees a ranking; recommendations are hypotheses from SERP evidence. "Unavailable" = not in Ahrefs' database, not zero searches.

Raw data: `ahrefs-keywords.json` (248 keywords), `serps.json` (43 SERPs + pairwise overlap), `site-metrics.json`, `keyword-url-map.csv` (140 rows).

## 1. Confirmed issues
1. **No measurable organic footprint yet.** DR 0; 0 organic keywords (domain and subdomains); 0 traffic; in none of the 43 top-10 SERPs. Posts are 1–8 days old (2026-10-10 to 10-17), so Ahrefs may not have recorded rankings yet.
2. **All 53 referring domains are spam and nofollow** (52 numbered `8762xxxx.xyz` + `lancelot88-lucky.xyz`, first seen 2026-10-11 to 10-14). No editorial backlinks. Disavow is low priority because they're nofollow; re-check in Google Search Console.
3. **10 of 26 posts target a primary keyword Ahrefs doesn't have, 2 more have volume 0.** No data: heavy-duty-adhesive-hooks, led-strip-lights, magnetic-cabinet-locks, pressure-mounted-baby-gate, smart-light-bulbs, smart-smoke-detector, video-doorbell-without-subscription, voice-assistant-speaker, how-to-baby-proof, wyze-vs-ring-vs-eufy. Volume 0: water-leak-sensor, wireless-security-cameras. Tiny: stud-finder-for-thick-walls (20), smart-lock (30). Cause: the "…for renters / for apartments" long-tail pattern; demand sits on head/mid terms.
4. **84 of 97 pending queue keywords have no Ahrefs data, 3 more show 0.** Only 10 pending keywords have any measured volume. Root cause in the agents: the keyword agent had no Ahrefs tools, so it picked from web search.
5. **A merge contradicts the SERP evidence.** `indoor security camera no subscription` (70/mo, KD 7, TP 1,100) is merged into best-wireless-security-cameras, but its SERP shares 0 top-10 URLs with "security cameras for apartments" and the parent topics differ. Different intent.
6. **Stale stored Ahrefs numbers.** switchbot lock pro review: stored 600/KD 8 → today 20. can i install a smart thermostat in my apartment: stored 200 → 80. apartment security system: stored KD 15/TP 4,600 → KD 11/TP 3,500.

## 2. Potential issues
- **Roundup vs product-led SERPs** (heuristic from URL/title): no-drill motorized blinds (4/4 product or collection pages, TP 30); peephole camera (Amazon, Ring product, shop, Reddit; 4,500/mo but TP 200); matter smart plug (product/listing pages, Reddit, one Engadget roundup at #10); heavy duty adhesive hooks (proxy: retail categories); magnetic cabinet locks (proxy: product pages).
- **Demand sits elsewhere than the primary keyword:**
  - best-magnetic-stud-finder: 100/mo but TP 0 (video, Reddit, Amazon, maker page).
  - best-stud-finder-for-thick-walls: "stud finder for plaster walls" 400/KD 0; "best stud finder for plaster walls" 350/KD 5 with a matching roundup SERP.
  - best-smart-lock-for-renters: parent "renter friendly smart lock" (80, KD 3) shares 4 URLs (same intent, already a secondary).
  - blink-vs-ring-subscription: 150/mo, but "ring vs blink" 4,900/KD 2 shares 4 URLs (same intent, already a secondary).
- **Weak demand:** best water leak detector (proxy 800/mo, TP 50; forum/video/product SERP).
- **Strong incumbents** (DR 75–95: CNET, Wirecutter, Consumer Reports, Wired, SafeHome, security.org): smart smoke detector (KD 20), video doorbell without subscription (KD 13–14). Long-term targets with DR 0.

## 3. Optional improvements
- blink-vs-ring: strengthen "does Blink need a subscription" (200/mo, TP 18,000).
- smart lock: cover "retrofit smart lock" (300, KD 2).
- peephole: cover "ring peephole camera" (4,800, branded, product SERP).
- wireless cameras: retarget primary to "security cameras for apartments" (300, KD 2, TP 1,400) or "best security camera for apartment" (200, KD 0, TP 1,600; forums and low-DR pages).
- baby-proofing guide: align to "how to baby proof apartment" (200, KD 2; guide SERP).
- smart bulbs: use "best smart bulbs" (1,100, KD 0, TP 1,700; several low-DR pages in the top 10).

## 4. Not verifiable
- Indexing, impressions, clicks, positions: GSC tools need an Ahrefs project ID; none exists for the site.
- Metrics for 134 of 248 keywords (not in Ahrefs' database).
- SERPs for 7 post keywords (empty in Ahrefs); head-term proxies used and marked.
- best-voice-assistant-speaker: no data and no SERP even for the proxy.
- wyze-vs-ring-vs-eufy: proxy SERP "wyze vs ring", volume not pulled.
- Page-type labels are heuristics; content quality, internal links and on-page SEO out of scope for this pass.

## 5. Cannibalization
Method: each post mapped to its primary SERP (or a marked proxy); shared top-10 URLs counted per pair (normalized); flagged at ≥3 shared URLs or the same parent topic.

**Post vs post: no pair shares a single top-10 URL or a parent topic.** Checked: smart-lock vs magnetic-cabinet-locks (0); magnetic stud finder vs thick walls (0; keep the angles distinct and interlinked); the five camera/doorbell posts (0 in all 10 pairs; interlink, avoid repeating verdicts); smart-home-for-renters (hub, 0); peephole vs ring-doorbell (1, below threshold).

**Queue vs posts / queue vs queue:**
- `apartment security camera` (parked, 350, KD 1) vs best-wireless-security-cameras: 6 shared URLs, same parent → same intent; use as a target/secondary of the existing post.
- `mini split smart controller` (merged) vs smart-ac-controller: same parent → merge is consistent.
- `apartment security system` (1,600, KD 11) and `alarm system for apartment renters` (200, KD 1): 4 shared URLs → one page at most.
- Wording duplicates without data (couldn't test SERPs): best smart door lock for apartment renters; ring vs blink for apartment renters; best indoor security camera for renters no drilling; smart bulbs for apartment; best smart plug for renters (0); how to make apartment smart without drilling; best smart thermostat for renters no wiring; eufy vs wyze video doorbell for renters.

## 6. Per-post recommendations (nothing changed)
| Post | Primary vol / KD / TP | Recommendation |
|---|---|---|
| alexa-vs-google-home | 1,300 / 2 / 800 | Keep (format matches, reachable, forum-heavy) |
| heavy-duty-adhesive-hooks | n/a (proxy 100/0/50) | Improve, low priority ("command hooks for heavy items" 100, TP 600) |
| led-strip-lights | n/a (proxy 1,400/12/1,800) | Keep/improve; renter angle differentiates |
| magnetic-cabinet-locks | n/a (proxy 1,300/0/150) | Keep, product-led SERP |
| magnetic-stud-finder | 100 / 0 / 0 | Improve or later consolidation candidate (decide with GSC data) |
| matter-smart-plugs | 300 / 1 / 90 | Keep, low ceiling |
| peephole-camera | 4,500 / 0 / 200 | Keep/improve (Ring Peephole Cam; "peephole camera for apartment door" 250, TP 2,200) |
| pressure-mounted-baby-gate | n/a (proxy 100/2/2,900) | Keep; add "pressure mounted baby gate" (1,000/0) |
| smart-light-bulbs | n/a (proxy 1,100/0/1,700) | Keep/improve; most reachable head term found |
| smart-lock | 30 / 9 / 200 | Keep/improve ("renter friendly smart lock", "retrofit smart lock") |
| smart-smoke-detector | n/a (proxy 1,600/20/1,100) | Keep; strong incumbents |
| stud-finder-thick-walls | 20 / n/a | Improve: retarget to plaster-walls keywords |
| video-doorbell-no-subscription | n/a (proxy 1,100/14/5,700) | Keep |
| voice-assistant-speaker | n/a, no SERP | Not verifiable; low priority |
| water-leak-sensor | 0 | Keep, low priority |
| wireless-security-cameras | 0 | Improve: retarget; absorb "apartment security camera"; revisit the indoor-no-subscription merge |
| blink-vs-ring-subscription | 150 / 0 / 1,700 | Improve toward "ring vs blink" and "does blink need a subscription" |
| how-to-baby-proof | n/a (proxy 200/2/150) | Keep |
| how-to-cool-apartment | 200 / 3 / 200 | Keep |
| no-drill-motorized-blinds | 200 / 0 / 30 | Keep, low priority (product SERP) |
| philips-hue-vs-wiz | 200 / 0 / 200 | Keep |
| ring-doorbell-in-apartment | 150 / 0 / 100 | Keep; cover "ring doorbell for apartment" (150, TP 2,100) |
| smart-ac-controller | 250 / 0 / 350 | Keep |
| smart-home-for-renters | 60 / 6 / 70 | Keep as the hub |
| smart-thermostat-in-apartment | 80 / 0 / 250 | Keep (forum SERP, DR 0 site at #4) |
| wyze-vs-ring-vs-eufy | n/a | Keep; interlink with blink-vs-ring |

## 7. Queue
- No data: 84 pending + 1 merged (most "…for renters" long-tail items). Demand unproven.
- 0 or near 0: best smart plug for renters (0), best portable air conditioner for renters (0), best printer for small apartment (0), best vacuum for apartment with pets (10), best office chair for small apartment (10), best high chair for small apartment (10), smart light switch no wiring (20), switchbot lock pro review (20).
- Retail/big brands or wrong intent: smart home starter kit (200/4/70, product SERP), smart space heater (TP 20), apartment door security (700; B2B access-control SERP), best dehumidifier for small apartment.
- Real signal, no duplicate, parked only by the >250 volume rule: ring vs nest doorbell (400/3/1,900), wyze vs blink (350/1), kasa vs tapo (400/0), matter vs zigbee (400/0), door camera for apartment (900/0), plus indoor security camera no subscription (70/7/1,100), best litter box for small apartment (70/3/400), best cat tree for small apartment (30/0/700).
