[![Stories in Ready](https://badge.waffle.io/shri-2015-org/666.png?label=1-Waiting&title=Waiting)](https://waffle.io/shri-2015-org/666)

# 666 chat

Update all
```
git pull -a
git checkout master
rm -r node_modules
npm cache clean
npm install
```

### Dev
Run dev server:
```
npm run dev
```
Set delay for server replies:
```
SERVER_DELAY_ACTIONS='message' npm run dev # по умолчанию 750 мс
SERVER_DELAY=2000 SERVER_DELAY_ACTIONS='*' npm run dev
```
Set failure for server replies:
```
SERVER_FAILURE_ACTIONS='message topRooms'
```
Allow socket debug
```
(в браузере)
localStorage.debug = 'socket.io-parser decoded*'
```

### Prod
Run prod server:
```
npm run prod
```
