S=/tmp/claude-0/-home-user-Kirik-Muhur/3cf7c13f-c56a-5d7d-be4e-ce6415e51133/scratchpad; R=/home/user/Kirik-Muhur; T=$R/testler/3D_3_37
N=$R/Kirik_Muhur_3_37_Yoldas_Binek_TEST.html; U=https://127.0.0.1:8443/Kirik_Muhur_3_37_Yoldas_Binek_TEST.html; cd $T; rm -rf $S/z; mkdir -p $S/z
timeout 900 node suite337.js $N $S/z/a > r337_337.log 2>&1
timeout 900 node suite336_binek.js $N $S/z/b > r337_336.log 2>&1
timeout 900 node suite335_regresyon.js $N $U $S/z/c > r337_335.log 2>&1
timeout 900 node suite334_regresyon.js $N $U $S/z/d > r337_334.log 2>&1
timeout 900 node suite333_regresyon.js $N $U $S/z/e > r337_333.log 2>&1
timeout 900 node suite332_regresyon.js $N $U $S/z/f > r337_332.log 2>&1
timeout 900 node suite331_regresyon.js $N $U $S/z/g > r337_331.log 2>&1
timeout 900 node suite330_regresyon.js $N $S/z/h > r337_330.log 2>&1
timeout 900 node suite329_regresyon.js $N $U $S/z/i > r337_329.log 2>&1
timeout 1500 node suite_327_regresyon.js $N $S/z/j > r337_327.log 2>&1
timeout 1500 node suite_3B_regresyon.js $N $S/z/k > r337_3B.log 2>&1
timeout 1800 node suite_3A_regresyon.js $N $R/Kirik_Muhur_3_36_3D_Regresyon_TEST.html $S/z/l https://127.0.0.1:8443 > r337_3A.log 2>&1
L=$(cd $S/srv/www && ls Kirik_Muhur_3_2[4-9]*.html Kirik_Muhur_3_3[0-6]*.html | tr '\n' ',' | sed 's/,$//'); timeout 1500 node gecis3D.js https://127.0.0.1:8443 Kirik_Muhur_3_37_Yoldas_Binek_TEST.html $S/z/m "$L" > r337_gecis.log 2>&1
timeout 1500 node denge_sim.js $N $T/denge_sonuc_3_37.json > r337_denge.log 2>&1
for f in r337_*.log; do echo "$f: $(grep -c ^PASS $f) PASS $(grep -c ^FAIL $f) FAIL"; done; grep -h ^FAIL r337_*.log | cut -c1-500; cat r337_denge.log
