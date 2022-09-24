import { SurrealRx } from './reactive';

describe('reactive', () => {
  it('should work', async () => {
    const db = new SurrealRx('http://127.0.0.1:8000/rpc');

    db.on$('open').subscribe((e) => console.log('SUBSCRIPTION: open', ...e));
    db.on$('opened').subscribe((e) =>
      console.log('SUBSCRIPTION: opened', ...e)
    );
    db.on$('close').subscribe((e) =>
      console.log('SUBSCRIPTION: close', ...e)
    );
    db.on$('closed').subscribe((e) =>
      console.log('SUBSCRIPTION: closed', ...e)
    );
    db.on$('notify').subscribe((e) =>
      console.log('SUBSCRIPTION: notify', ...e)
    );

    await db.signin({
      user: 'root',
      pass: 'root',
    });

    console.debug('Select a specific namespace / database');
    await db.use('test', 'test');

    console.debug('Create a new person with a random id');
    const _created = await db.create('person', {
      title: 'Founder & CEO',
      name: {
        first: 'Tobie',
        last: 'Morgan Hitchcock',
      },
      marketing: true,
      identifier: Math.random().toString(36).substr(2, 10),
    });

    console.debug('Update a person record with a specific id');
    const _updated = await db.change('person:jaime', {
      marketing: true,
    });

    console.debug('Select all people records');
    const _people = await db.select('person');

    console.debug('Perform a custom advanced query');
    const _groups = await db.query(
      'SELECT marketing, count() FROM type::table($tb) GROUP BY marketing',
      {
        tb: 'person',
      }
    );

    console.debug('closing');
    await db.close();
  });
});
