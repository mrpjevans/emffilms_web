#!/bin/bash
npm run build
git add .
git commit -m 'Update'
git push
cd dist
git add .
git commit -m 'Update'
git push
cd ../
