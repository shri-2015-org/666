import { Shape, Num, Str } from '~/common/utils/invariants';

export const Message = Shape({
  mid: Str,
  uid: Str,
  text: Str,
  time: Num,
});

export const User = Shape({
  uid: Str,
  name: Str,
  avatar: Str,
});

export const protocol = {
  login: exchange(UP,
    Shape({uid: Str}),
    Shape({user: User})
  ),

  sendMessage: notification(UP,
    Shape({text: Str}),
  ),

  message: notification(DOWN, // bad name?
    Message,
  ),
};
