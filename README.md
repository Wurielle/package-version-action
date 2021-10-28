# Package Version Action

This action sets the `version` field in all the provided `package.json` files. 
This can be used to set the version of your `package.json` files based on a release tag. 

This does not push the updated `package.json` files back to your development branch at the moment.

## Inputs

### `version`

The version you want to set. If the version is prefixed with `v` then it will be stripped (e.g.: `v1.2.3` will be set as `"version": "1.2.3"`).

### `targets`

The paths to the `package.json` files you want to update.

## Example usage

```yml
on:
  push:
    tags:
      - 'v*'

jobs:
  my-job:
    runs-on: ubuntu-latest
    name: A job that does things based on the current package.json version
    steps:
      - name: Checkout
        uses: actions/checkout@v2
        
      - name: Set vars
        id: vars
        run: echo ::set-output name=tag::${GITHUB_REF#refs/*/}
        
      - uses: wurielle/package-version-action@v1
        with:
          version: ${{ steps.vars.outputs.tag }}
          targets: |
            ./package.json 
```
