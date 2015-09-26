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
:no_entry_sign: | :no_entry_sign:  

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
:no_entry_sign: | :no_entry_sign:  

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
:no_entry_sign: | :no_entry_sign:  

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
:no_entry_sign: | :no_entry_sign:  

## `exchange`

Пары запрос-ответ. Клиент делает запрос, сервер отвечает только ему.
Имена socket.io событий нужно начинать с `client-request:` для запросов, `server-response:` для ответов.

Пример: `client-request:joinRoom`.

#### `joinRoom`
* Я хотел бы присоединиться к комнате roomID / к случайной комнате (null).
* Да, пожалуйста. Вас там будут знать как userID.

Данные запроса:
```
{
	exchangeID: string,
	data: {
		roomID: string || null,
	},
}  
```
 
Данные ответа: 
```
{
	exchangeID: string,
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
	exchangeID: string,
	status: 'ERROR',
	description: string,
}
```

Поддержка клиентом | Поддержка сервером
--- | ---
:no_entry_sign: | :no_entry_sign:  


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
	exchangeID: string,
	status: 'OK',
}

/* или */

{
	exchangeID: string,
	status: 'ERROR',
	description: string,
}
```

Поддержка клиентом | Поддержка сервером
--- | ---
:no_entry_sign: | :no_entry_sign:  


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
	exchangeID: string,
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
	exchangeID: string,
	status: 'ERROR',
	description: string,
}
```

Поддержка клиентом | Поддержка сервером
--- | ---
:no_entry_sign: | :no_entry_sign:  
