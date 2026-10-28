import { test } from '../../fixtures/fixtures';

test('testing fixture', async ({ courseName }) => {
    console.log(`Course Name: ${courseName}`);
})