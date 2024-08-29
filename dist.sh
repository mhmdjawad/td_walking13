rm -frd dist
rm -frd release.js
rm -frd main.js
mkdir dist
npx google-closure-compiler --js=game.js --js_output_file=release.js --compilation_level=ADVANCED --language_out=ECMASCRIPT_2019 --warning_level=VERBOSE --jscomp_off=* --assume_function_wrapper
npx roadroller "release.js" -o "dist/main.js"
rm -frd release.js
cp spritesheet.gif ./dist/
cp index.html ./dist/
cp style.css ./dist/