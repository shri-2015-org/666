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


# API :smirk_cat:
 Описание взаимодействия клиентов и сервера.
 
Обозначения:
* :white_check_mark: -- Поддержка есть
* :no_entry_sign: -- Поддержки нет
* :exclamation: -- Есть какая-то проблема (должно быть описание)

## `broadcast`
Сообщения, приходящие от сервера всем кто присоединился. Имена socket.io событий нужно начинать с `broadcast:`

Пример: `broadcast:topRooms`.

#### `topRooms`
Обновление топа. 

Данные:
```
{
	rooms: [{
		roomID: string,
		name: string,
		users: number,
		rating: number,
	}],
}
```  

Поддержка клиентом | Поддержка сервером
--- | ---
:white_check_mark: | :white_check_mark: :exclamation: (mock)

## `roomcast`
Сообщения, приходящие от сервера всем в комнате. Имена socket.io событий нужно начинать с `roomcast:`

Пример: `roomcast:message`.

#### `message`
Пришло новое сообщение. 

Данные:
```
{
	roomID: string,
	userID: string,
	messageID: string,
	text: string,
	time: number,
}
```  

Поддержка клиентом | Поддержка сервером
--- | ---
:white_check_mark: | :white_check_mark: :exclamation: (mock)

#### `attachment`
Сервер добавил метаданные к сообщению.

Данные:
```
{
	roomID: string,
	messageID: string,
  url: string,
  index: number,
	meta: any, // TODO уточнить
}
```

Поддержка клиентом | Поддержка сервером
--- | ---
:white_check_mark: | :white_check_mark: :exclamation: (mock)

#### `joinUser`
Зашел новый пользователь.

Данные:
```
{
	roomID: string,
	userID: string,
	avatar: string,
	nick: string,
}
```  

Поддержка клиентом | Поддержка сервером
--- | ---
:white_check_mark: | :white_check_mark: :exclamation: (mock)

#### `leaveUser`
Пользователь нас покинул.

Данные:
```
{
	roomID: string,
	userID: string,
}
```  

Поддержка клиентом | Поддержка сервером
--- | ---
:white_check_mark: | :white_check_mark: :exclamation: (mock)

## `exchange`

Пары запрос-ответ. Клиент делает запрос, сервер отвечает только ему.
Имена socket.io событий нужно начинать с `client-request:` для запросов, `server-response:` для ответов.
Более того, к ответу в конец нужно дописывать `@{exchangeID}`.

Пример: `client-request:joinRoom` и `server-response:joinRoom@17`

#### `createRoom`
* Я хотел бы создать комнату roomID.
* Да, пожалуйста / Нет, такая уже есть.

Данные запроса:
```
{
	exchangeID: string,
	data: {
		roomID: string,
	},
}
```
 
Данные ответа: 
```
{
	status: 'OK',
}

/* или */

{
	status: 'ERROR',
	description: string,
}
```

Поддержка клиентом | Поддержка сервером
--- | ---
:white_check_mark: | :white_check_mark: :exclamation: (mock)

#### `joinRoom`
* Я хотел бы 
  - присоединиться к комнате roomID (userID, secret - null)
  - присоединиться к случайной комнате (roomID - null)
  - восстановиться в комнате roomID как userID
* Да, пожалуйста. Вас там будут знать / уже знают как userID.

Данные запроса:
```
{
	exchangeID: string,
	data: {
		roomID: string || null,
		userID: string || null,
		secretID: string || null,
	},
}  
```
 
Данные ответа: 
```
{
	status: 'OK',
	data: {
		identity: {
			userID: string,	 
			avatar: string,  
			nick: string, 
			secret: string,  
		},
		room: {
			roomID: string,
			name: string,
			users: [{
				roomID: string,
				userID: string,
				avatar: string,
				nick: string,
			}],
		},
	}
}

/* или */

{
	status: 'ERROR',
	description: string,
}
```

Поддержка клиентом | Поддержка сервером
--- | ---
:white_check_mark: | :white_check_mark: :exclamation: (mock)

#### `leaveRoom`
* Я хотел бы отсоединиться от комнаты roomID.
* Да, пожалуйста. О Вас там забыли.

Данные запроса:
```
{
	exchangeID: string,
	data: {
		roomID: string,
		userID: string,
		secret: string,
	},
}  
```
 
Данные ответа: 
```
{
	status: 'OK',
}

/* или */

{
	status: 'ERROR',
	description: string,
}
```

Поддержка клиентом | Поддержка сервером
--- | ---
:white_check_mark: | :white_check_mark: :exclamation: (mock)


#### `message`
* Я хотел бы отправить сообщение комнате roomID.
* Да, пожалуйста. Ваше сообщение успешно добавленно.

Данные запроса:
```
{
	exchangeID: string,
	data: {
		roomID: string,
		userID: string,
		secret: string,
		text: string,
		time: number,
	}
}  
```
 
Данные ответа: 
```
{
	status: 'OK',
	data: {
		roomID: string,
		userID: string,
		messageID: string,
		text: string,
		time: number,
	}
}

/* или */

{
	status: 'ERROR',
	description: string,
}
```

Поддержка клиентом | Поддержка сервером
--- | ---
:white_check_mark: | :white_check_mark: :exclamation: (mock)

#### `searchRoomID`
* Какие комнаты начинаются с букв `partialRoomID`?
* Да вот такие.

Данные запроса:
```
{
	exchangeID: string,
	data: {
		partialRoomID: string,
	}
}  
```
 
Данные ответа: 
```
{
	status: 'OK',
	data: [{
		roomID: string,
		name: string,
		users: number,
		rating: number,
	}],
}

/* или */

{
	status: 'ERROR',
	description: string,
}
```

Поддержка клиентом | Поддержка сервером
--- | ---
:white_check_mark: | :white_check_mark: :exclamation: (mock)
