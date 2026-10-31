import { test } from '../../fixtures/fixtures';

test('testing fixture', async ({ courseName }) => {
    console.log(`Course Name: ${courseName}`);
    console.log('Start Fixture Test');
    console.log('Finish Fixture Test');
})