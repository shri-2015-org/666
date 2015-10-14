import { assert } from 'chai';
import '../testUtils';
import { Room } from './Room';

describe('Room: model', () => {
  describe('#create()', () => {
    it('should create a new Room', done => {
      const roomData = {
        roomID: 'roomID',
        name: 'name',
        rating: 0,
      };
      const room = new Room(roomData);
      room.save( (err, createdRoom) => {
        assert.equal(err, null);
        assert.equal(createdRoom.roomID, 'roomID');
        assert.equal(createdRoom.rating, 0);
        done();
      });
    });
    it('should throw Error', done => {
      const roomData = {};
      const room = new Room(roomData);
      room.save( err => {
        assert.equal(err.name, 'ValidationError');
        done();
      });
    });
  });
});
