#!/bin/bash
#!/bin/scp
#!/usr/bin/expect -f
echo "****************开始gulp dev********************"
project="business"
rm -rf dist/
gulp dev --project=$project
echo "****************gulp dev 结束********************"
cd dist
# cd $project
expect -c "
  spawn scp -r . root@100.73.16.42:/data/dst/$project/
  expect {
    \"*assword\" {set timeout 300; send \"VMF9>4z@426Y\r\";}
    \"yes/no\" {send \"yes\r\"; exp_continue;}
  }
  expect eof"
echo "****************scp 结束 ********************"
cd ../
# spawn 直接执行scp dist/ 有问题，换做cd 进行 -r .
#scp -r dist/* root@100.73.16.42:/data/dst/songzhongji/
