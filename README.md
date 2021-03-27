# Test action

This action is a test for a basic apperceptive workflow.

## Inputs

### `who-to-greet`

**Required** The name of the person to greet. Default `"World"`.

## Outputs

### `time`

The time we greeted you.

## Example usage

uses: apperceptive/test-action@v1.0
with:
  who-to-greet: 'Mona the Octocat'
