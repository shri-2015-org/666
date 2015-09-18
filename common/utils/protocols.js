import { Shape, Enum, Exactly, Invariant, MapOf, OneOf } from './invariants';

export const NOTIFICATION = 'NOTIFICATION';
export const EXCHANGE = 'EXCHANGE';
export const UP = 'UP';
export const DOWN = 'DOWN';

// Invariants

export const Direction = Enum([UP, DOWN]);

export const Notification = Shape({
  type: Exactly(NOTIFICATION),
  direction: Direction,
  dataInvariant: Invariant,
});

export const Exchange = Shape({
  type: Exactly(EXCHANGE),
  direction: Direction,
  requestInvariant: Invariant,
  replyInvariant: Invariant,
});

export const Api = MapOf(
  OneOf([
    Exchange,
    Notification,
  ])
);

// Helpers

export const notification = (direction, dataInvariant) => {
  return {
    type: NOTIFICATION,
    direction,
    dataInvariant,
  };
};

export const exchange = (direction, requestInvariant, replyInvariant) => {
  return {
    type: EXCHANGE,
    direction,
    requestInvariant,
    replyInvariant,
  };
};
