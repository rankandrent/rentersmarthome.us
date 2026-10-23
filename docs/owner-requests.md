# Owner requests log (Roman Urdu)

Har kaam jo owner ne kaha: kab kaha, kis baat par kaha, aur abhi status kya hai.
Claude ye file har naye request ke saath update karta hai (CLAUDE.md standing rule).

Status: ✅ ho gaya · 🔁 roz chal raha hai · ⏳ owner ka jawab chahiye · ⏸ ruka hua

## 22 Oct 2026

| Request (owner ke alfaaz) | Us waqt context | Status |
|---|---|---|
| "Search consol btao kasy link karna 3no sites k sath" | Rasty wali video ke baad: GSC data se kaam | ✅ service account teeno sites par, daily snapshot |
| "daily blog ki speed kam kar do cloude ai ki limit end ho rhai ha" | Weekly usage limit bar bar khatam | ✅ Light Mode: har site roz 1 post (translations bhi ruk gayin – ye Claude ka faisla tha) |
| "ab 3 din daily old blogs ko improve kar search consol k data ki based pa ... url na change karna" | GSC link hone ke baad | ✅ Day 1-2 ho gaye → 23 Oct ko daily mein badal diya (neeche) |
| "ADDITIONAL TRAINING – Search Console ranking agent ... kya ya helpful ha?" | Doosre agent ka method text | ⏳ title format "keyword \| benefit", price range, 3-5 pages per run: owner ne jawab nahi diya |
| "deepseek sa b baat ki ha wo b share karo?" | Agent behtar karne ke liye | ⏳ owner ne share nahi ki |
| "every new blog ... indexing k liye submit kar skaty?" | Manual indexing mushkil | ✅ 23 Oct: Indexing API chalu (neeche) |
| "indesing run time pa jis keywrod ka ma kaho bass os keywrod pa hi check karna" | Poori site check par aiterazz | ✅ rule save (index check sirf naam diye keywords) |
| "1 chota sa dashboard bna do ... 3no sites ka search consol ka graph" + "lite color ... keyword, volume, serp, intent, 24h/7d/30d" + "har keywrod k agy button chye serp ka" | OpenSEO screenshot | ✅ https://claude.ai/artifact/LgNhY4KAh6FfnSxKs7AfpF, roz 07:43 UTC refresh |
| "remove all old kewyrods and start working on this keywrods for tripod site ... canablisation nhi honi chye" | ~484 tripod keywords | ✅ 58 naye keywords queue mein |
| "india remove kar do ... security safe k ilawa sab keyword skip ... long tail" + "best safe site k b old keyword remove kar do" | ~550 safe keywords | ✅ 18 naye long-tail keywords |
| "search/?q= ya page nofoollow nhi hona chye follow hona chye" | GSC report | ✅ pehle se noindex, follow |
| Product snippets error screenshot "ya b thek karna" | GSC enhancement error | ✅ code 20 Oct ko theek; ⏳ owner GSC mein "Validate fix" dabaye |
| Crawl stats / host status screenshots | www host bhi crawl ho raha tha | ✅ www → bare domain 301 |

## 23 Oct 2026

| Request | Context | Status |
|---|---|---|
| "daily last 24 hours k according search consol k old blogs pa b working karni" | Ranking improve | 🔁 roz 12:31 UTC, har site 1 post (improve-agent) |
| "har site ka Crawl stats high hona chye" | Crawl stats screenshot | ✅ jo technical ho sakta tha pehle se hai; asal cheez backlinks |
| "Sab new blog index nhi ho rahy indexing sumition tum kar do" | 7 posts not indexed | ✅ 88/95 index the; Indexing API setup (owner ne API enable + Owner banaya) |
| "Google indexing api k tharo kar do index" | — | ✅ 8 URLs bheje; 🔁 har deploy par nayi posts khud jaati hain; 25 Oct re-check |
| "Indexing k liye submit kar da sab link ... site: k sath dekho" | — | ✅ saare English (125) bheje; translations 24 Oct 08:15 UTC; site: RSH 99+, tripod 88, safe 49 |
| "sab product ka content first person tone ma hona chye" | Products third person mein thay | ✅ nayi posts 24 Oct se; purani dheere dheere roz ki improvement ke saath (owner faisla) |
| "Link equity / search intent mismatch / knowledge graph / crawl depth?" | Seekhne ke sawal | ✅ jawab diye; crawl depth theek (2 clicks) |
| "backlink plan bana do" → "prompt format ma do ... off page k agent ko" | — | ✅ rentersmarthome.us/docs/offpage-agent-prompt.md |
| Social profiles (Pinterest/Facebook) for Knowledge Graph | — | ⏳ owner profiles banaye → Claude `sameAs` mein dalega |
| "improve agent ki file" | — | ✅ .claude/agents/improve-agent.md teeno sites |
| "jo zrori hota wo required agent k according update kar diya karo" | Bhoolne ka darr | ✅ CLAUDE.md standing rule |
| "translation waly blog q nhi kar rahy" | Light Mode mein ruki hui | ⏳ owner chune: roz 1 post ×3 languages / roz 2 / band |

## Pehle ke khule sawal (owner ka jawab baqi)

- Peephole post ki de/es/nl translations mein purane Ring Peephole Cam claims hain – theek karein?
- SearchAction schema hatana hai?
- Cloudflare Workers AI permission
- Sources box ki hadd (cap)
- Hunting tripods ke liye alag category?
