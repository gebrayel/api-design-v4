import * as user from '../user';

describe('user handler', () => {
  it('should create a new user', async () => {
    const req = { body: { username: 'hello', password: 'world' } };
    const res = {
      json({ token }) {
        expect(token).toBeTruthy();
      },
    };
    await user.createNewUser(req, res, () => {});
  });
  // it('should sign in a user',()=>{
  //     // test goes here
  // })
});
