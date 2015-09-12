запрос на логин "loginReq"
{
  uid: uid
}

ответ на логин "loginRes"
{
  name: name,
  avatar: avatar,
  uid: uid
}

отправка сообщение "sendMessage"
{
  text: text,
  uid: uid
}

получение сообщения "message"
{
  text: text,
  uid: uid,
  time: time
}

получение данных другого юзера "getUser"
{
  name: name,
  avatar: avatar,
  uid: uid
}
