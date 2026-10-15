#!/bin/bash
# Usage: check.sh BASE_URL   e.g. check.sh http://127.0.0.1:4173
B=${1%/}; FAIL=0
UA_FB="facebookexternalhit/1.1"
UA_BR="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36"
pass() { echo "PASS  $*"; }; fail() { echo "FAIL  $*"; FAIL=1; }
# phrase that must be in the raw HTML of each page (proves full policy text, no JS)
declare -a P=("/privacy|How to complain" "/terms|South African courts decide any dispute" "/data-deletion|If you message the business again")
for e in "${P[@]}"; do
  path=${e%%|*}; phrase=${e#*|}
  for UA in "$UA_FB" "$UA_BR"; do
    tag=$([ "$UA" = "$UA_FB" ] && echo fb || echo browser)
    hdr=$(curl -s -D - -o /tmp/.chk.$$ -A "$UA" "$B$path"); body=$(cat /tmp/.chk.$$)
    st=$(echo "$hdr" | head -1 | awk '{print $2}')
    [ "$st" = 200 ] && pass "$path [$tag] status 200" || fail "$path [$tag] status $st"
    grep -qF "$phrase" <<<"$body" && pass "$path [$tag] full text in raw HTML" || fail "$path [$tag] text missing"
    grep -qi '<script' <<<"$body" && fail "$path [$tag] has <script>" || pass "$path [$tag] no script needed"
    { grep -qi noindex <<<"$body" || grep -qi '^x-robots-tag' <<<"$hdr"; } && fail "$path [$tag] noindex/X-Robots-Tag" || pass "$path [$tag] no noindex"
  done
done
st=$(curl -s -o /dev/null -w '%{http_code}' "$B/no-such-page-$$"); [ "$st" = 404 ] && pass "unknown path 404" || fail "unknown path $st"
read st loc < <(curl -s -o /dev/null -w '%{http_code} %{redirect_url}' "$B/timeslot-business/privacy")
[ "$st" = 308 ] && [[ "$loc" == */privacy ]] && pass "/timeslot-business/privacy -> $st $loc" || fail "/timeslot-business/privacy -> $st $loc"
st=$(curl -s -o /tmp/.chk.$$ -w '%{http_code}' "$B/robots.txt")
if [ "$st" = 404 ]; then pass "robots.txt absent (404), blocks nothing"
elif grep -qiE '^disallow: */($|privacy|terms|data-deletion)' /tmp/.chk.$$; then fail "robots.txt blocks a legal page"; else pass "robots.txt $st, does not block legal pages"; fi
for r in / /see-it-work /timeslot-business /support; do
  st=$(curl -s -o /tmp/.chk.$$ -w '%{http_code}' "$B$r"); grep -q 'id="root"' /tmp/.chk.$$ && app=app-shell || app=other
  [ "$st" = 200 ] && [ $app = app-shell ] && pass "SPA route $r 200 app-shell" || fail "SPA route $r $st $app"
done
rm -f /tmp/.chk.$$; echo; [ $FAIL = 0 ] && echo "ALL PASS" || echo "SOME FAILED"; exit $FAIL
